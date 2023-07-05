import React from "react";
import Select from "react-select";
import DispatchedTableRow from "./DispatchedTableRow";
import { ListBatchs } from "../ListBatchs";
import { DataGrid as MuiDataGrid, ptBR } from "@mui/x-data-grid";
import { format } from "date-fns";
import { styled } from "@mui/material";

// import { Container } from './styles';
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
    field: 'receiver',
    headerName: 'Destino',
    sortable: false,
    width: 200
  },
  {
    field: 'unit',
    headerName: 'Unidade',
    sortable: false,
    width: 200,
  },
  {
    field: 'date',
    headerName: 'Data de envio',
    sortable: false,
    width: 200,
    valueFormatter: ({ value }) => format(new Date(value), "dd/mm/yyyy 'às' HH:mm")
  },
]

function DispatchedProducts({ dispatched }) {
  console.log("items despachados", dispatched);
  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>Produção</h3>
      <div style={{ width: '100%', height: '30%' }}>
        <DataGrid
          columns={columns}
          rows={dispatched}
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
          getRowId={(row) => row.unit}
        />
      </div>
    </div>
  );
}

export default DispatchedProducts;
