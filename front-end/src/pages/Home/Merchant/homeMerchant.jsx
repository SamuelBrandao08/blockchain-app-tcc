import React from "react";
import { useState } from "react";
import MRC from "../../../abi/Merchant.json";
import TUC from "../../../abi/Merchant.json";
import { Merchant, UpdateTr } from "../../../abi/address.json";
import { useWeb3Context } from "web3-react";
import { format } from "date-fns";
import { useEffect } from "react";
import HoneySupply from "./Components/HoneySuppy";
import Tracer from "./Components/Tracer";
import useUpdateTr from "../../../hooks/useUpdateTr";
import useConnect from "../../../hooks/useConnect";
import { DataGrid as MuiDataGrid, ptBR } from "@mui/x-data-grid";

// import { Container } from './styles';

import { styled } from "@mui/material";

const DataGrid = styled(MuiDataGrid)`
  .MuiDataGrid-columnHeaders {
    min-height: 35px !important;
    background-color: #e0e0e0;
  }
  .MuiDataGrid-columnSeparator--sideRight {
    display: none !important;
  }

  .MuiDataGrid-footerContainer {
    min-height: 32px;
    height: 32px;
    background-color: #f5f5f5;
  }
`;

const columns = [
  {
    field: "code",
    headerName: "Código",
    sortable: false,
  },
  {
    field: "batch",
    headerName: "Lote",
    sortable: false,
  },
  {
    field: "packing",
    headerName: "Recipiente",
    sortable: false,
    flex: 1,
  },
  {
    field: "flowering",
    headerName: "Florada",
    sortable: false,
    flex: 1,
  },
  {
    field: "date",
    headerName: "Fabricação",
    sortable: false,
    flex: 1,
    valueFormatter: ({ value }) =>
      format(new Date(value), "dd/mm/yyyy 'às' HH:mm"),
  },
  {
    field: "productorId",
    headerName: "Produtor",
    sortable: false,
  },
  {
    field: "weight",
    headerName: "Peso",
    sortable: false,
    valueFormatter: ({ value }) => `${value} kg`,
  },
  // {
  //   field: 'hivesId',
  //   headerName: 'Colmeias',
  //   sortable: false,
  //   align: 'right',
  //   width: 80
  // },
];

const options = [
  { label: "unidade", value: 0 },
  { label: "caixa", value: 1 },
  { label: "palete", value: 2 },
];

function HomeMerchant({ user }) {
  console.log(user.name, user.id);


  const [supply, setSupply] = useState([]);

  const context = useWeb3Context();
  // const mrc = useContract(MRC.abi, Merchant);
  // const tuc = useContract(TUC.abi, UpdateTr);
  const mrc = useConnect(MRC.abi, Merchant);
  const tuc = useConnect(TUC.abi, UpdateTr);

  const updateTr = useUpdateTr(tuc);

  useEffect(() => {
    listSupply();
  }, [supply.length]);

  async function listSupply() {
    if (!mrc) return;
    const response = await mrc.contract.methods
      .listReceivedUnits(user.id)
      .call();
    setSupply(response);
  }

  return (
    <div>
      {/* <HoneySupply supply={supply} /> */}

      <div>
        <div style={{ width: "100%", height: "30%" }}>
          <DataGrid
            columns={columns}
            rows={supply}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            hideFooter
            columnHeaderHeight={40}
            rowHeight={50}
            hideFooterSelectedRowCount={false}
            disableColumnMenu={true}
            showColumnRightBorder={false}
            disableRowSelectionOnClick
            disableSelectionOnClick
            loading={false}
          />
        </div>
      </div>
      <div>
        <Tracer />
      </div>
    </div>
  );
}

export default HomeMerchant;
