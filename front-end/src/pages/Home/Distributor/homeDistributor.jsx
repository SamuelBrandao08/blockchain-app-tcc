import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import DBC from "../../../abi/Distributor.json";
import TUC from "../../../abi/UpdateTr.json";
import { Distributor, UpdateTr } from "../../../abi/address.json";
import { useWeb3Context } from "web3-react";
import useUpdateTr from "../../../hooks/useUpdateTr";
import useConnect from "../../../hooks/useConnect";
import { DataGrid as MuiDataGrid, ptBR } from "@mui/x-data-grid";
import { styled } from "@mui/material";

import styles from "./style.module.scss";

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
    field: "id",
    headerName: "Unidade",
    sortable: false,
  },
  {
    field: "receivedId",
    headerName: "Destino",
    sortable: false,
  },
  {
    field: "date",
    headerName: "Data de envio",
    sortable: false,
    flex: 1,
    valueFormatter: ({ value }) =>
      format(new Date(value), "dd/mm/yyyy 'às' HH:mm"),
  },
  {
    field: "local",
    headerName: "Local da entrega",
    sortable: false,
    flex: 1,
  },
];

const HomeDistributor = ({ user }) => {
  console.log(user.name, user.id);

  const [supplier, setSupplier] = useState("Seu Jose");
  const [unit, setUnit] = useState("6e6f9ddb20/05/2023-16:47:44");
  const [startDate, setStartDate] = useState(new Date());
  const [local, setLocal] = useState("Comercial Seu Joao");
  const [unitType, setUnitType] = useState(0);

  const [receiver, setReceiver] = useState("Seu Joao");


  const [receiveds, setReceiveds] = useState([]);

  const [dispatcheds, setDispatcheds] = useState([]);

  const context = useWeb3Context();
  // const prc = useContract(DBC.abi, Distributor);
  // const tuc = useContract(TUC.abi, UpdateTr);
  const dbc = useConnect(DBC.abi, Distributor);
  const tuc = useConnect(TUC.abi, UpdateTr);

  const updateTr = useUpdateTr(tuc);

  useEffect(() => {
    listReceived();
    listDispatched();
  }, []);

  async function listReceived(e) {
    if (!dbc) return;
    const response = await dbc.contract.methods
      .listReceivedUnits(user.id)
      .call();
    if (response == 0) return;
    setReceiveds(response);
  }

  async function listDispatched() {
    if (!dbc) return;
    const response = await dbc.contract.methods
      .listDispatchedUnits(user.id)
      .call();
    if (response == 0) return;
    setDispatcheds(response);
  }

  return (
    <div className={styles.container}>
      <div className={styles.boxDataGrid}>
        <h3>Produtos recebidos</h3>
        <DataGrid
          columns={columns}
          rows={receiveds}
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

      <div className={styles.boxDataGrid}>
        <h3>Produtos despachados</h3>
        <DataGrid
          columns={columns}
          rows={dispatcheds}
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
    </div >
  );
};
export default HomeDistributor;
