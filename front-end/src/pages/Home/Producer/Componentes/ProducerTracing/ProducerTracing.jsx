import React from "react";
import { useState } from "react";
import { abi } from "../../../../../abi/UpdateTr.json";
import { UpdateTr } from "../../../../../abi/address.json";
import useContract from "../../../../../hooks/useContract";
import { useWeb3Context } from "web3-react";
import useConnect from "../../../../../hooks/useConnect";
import { DataGrid as MuiDataGrid, ptBR } from "@mui/x-data-grid";

// import { Container } from './styles';
import styles from "./style.module.scss";
import { styled } from "@mui/material";
import { format } from "date-fns";

const DataGrid = styled(MuiDataGrid)`
  .MuiDataGrid-columnHeaders{
    min-height: 35px !important;
    background-color: #E0E0E0;
  }
  .MuiDataGrid-columnSeparator--sideRight{
    display: none !important;
  }

  .MuiDataGrid-footerContainer{
    min-height: 32px;
    height: 32px;
    background-color: #F5F5F5;
  }
`;

const columns = [
  {
    field: 'previousTx',
    headerName: 'Transação anterior',
    sortable: false,
    flex: 1,
  },
  {
    field: 'currentTx',
    headerName: 'Transação atual',
    sortable: false,
    flex: 1,
  },
  {
    field: 'sender',
    headerName: 'Origem',
    sortable: false,
    width: 200,
  },
  {
    field: 'receiver',
    headerName: 'Destino',
    sortable: false,
    width: 200,
  },
  {
    field: 'unit',
    headerName: 'Unidade',
    sortable: false,
    width: 200,
  },
  {
    field: 'date',
    headerName: 'Data',
    sortable: false,
    width: 200,
    valueFormatter: ({ value }) => format(new Date(value), "dd/mm/yyyy 'às' HH:mm")
  },
]

function ProducerTracing() {
  const [unitId, setUnitId] = useState("");
  const [unit, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);

  const context = useWeb3Context();

  const tuc = useConnect(abi, UpdateTr);

  const trackBack = async (e) => {
    e.preventDefault();
    if (!tuc) return;
    const response = await tuc.contract.methods.search(unitId).call();

    //context.library.eth.getTransaction(response.currentTx).then(console.log);
    setUnit(response);
    setLoading(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Rastreio de Produtos</h3>
        <form onSubmit={trackBack}>
          <input
            placeholder="ID da unidade"
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
          />
          <button className="button" type="submit">Buscar</button>
        </form>
      </div>
      {loading && (
        <main style={{ width: '100%', maxHeight: '30%' }}>
          <DataGrid
            columns={columns}
            rows={unit}
            localeText={
              ptBR.components.MuiDataGrid.defaultProps.localeText
            }
            hideFooter
            columnHeaderHeight={40}
            rowHeight={50}
            hideFooterSelectedRowCount={false}
            disableColumnMenu={true}
            showColumnRightBorder={false}
            disableRowSelectionOnClick
            disableSelectionOnClick
            loading={false}
            getRowId={(row) => row.currentTx}
          />
        </main>
      )}
    </div>
  );
}

export default ProducerTracing;
