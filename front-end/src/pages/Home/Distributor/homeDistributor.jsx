import React, { useEffect, useState } from "react";
import useContract from "../../../hooks/useContract";
import Select from "react-select";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import DBC from "../../../abi/Distributor.json";
import TUC from "../../../abi/UpdateTr.json";
import { Distributor, UpdateTr } from "../../../abi/address.json";
import { useWeb3Context } from "web3-react";
import useUpdateTr from "../../../hooks/useUpdateTr";
import useConnect from "../../../hooks/useConnect";

const options = [
  { label: "unidade", value: 0 },
  { label: "caixa", value: 1 },
  { label: "palete", value: 2 },
];

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

const HomeDistributor = ({ user }) => {
  console.log(user.name, user.id);

  const [supplier, setSupplier] = useState("Seu Jose");
  const [unit, setUnit] = useState("6e6f9ddb20/05/2023-16:47:44");
  const [startDate, setStartDate] = useState(new Date());
  const [local, setLocal] = useState("Comercial Seu Joao");
  const [unitType, setUnitType] = useState(0);

  const [receiver, setReceiver] = useState("Seu Joao");

  const [receivedId, setReceiverId] = useState("");
  const [unitReceived, setUnitReceived] = useState([]);
  const [receiveds, setReceiveds] = useState([]);
  const [dispatchedId, setDispatchedId] = useState("");
  const [unitDispatched, setUnitDispatched] = useState([]);
  const [dispatcheds, setDispatcheds] = useState([]);

  const context = useWeb3Context();
  // const prc = useContract(DBC.abi, Distributor);
  // const tuc = useContract(TUC.abi, UpdateTr);
  const dbc = useConnect(DBC.abi, Distributor);
  const tuc = useConnect(TUC.abi, UpdateTr);

  const updateTr = useUpdateTr(tuc);

  useEffect(() => {
    listReceved();
    listDispatched();
  }, []);

  async function handleReceiver(e) {
    e.preventDefault();
    try {
      if (!dbc | !tuc) return;
      const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
      dbc.contract.methods
        .receiver(user.id, supplier, unit, date, local, unitType)
        .send({ from: dbc.address, gas: "800000" })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, supplier, user.id, unit, date);
        });
      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("Error na operação");
    }
  }

  async function listReceved(e) {
    e.preventDefault();
    if (!dbc) return;
    const response = await dbc.contract.methods
      .listReceivedUnits(user.id)
      .call();
    if (response == 0) return;
    setReceiveds(response);
  }

  async function handleDispatcher(e) {
    e.preventDefault();
    try {
      if (!dbc | !tuc) return;
      const date = format(new Date(startDate), "dd/MM/yyyy-HH:mm:ss");
      dbc.contract.methods
        .dispatcher(user.id, receiver, unit, date, local, unitType)
        .send({ from: dbc.address, gas: "800000" })
        .then(({ transactionHash }) => {
          updateTr(transactionHash, user.id, receiver, unit, date);
        });
    } catch (error) {
      console.log(error);
      alert("Error na operação");
    }
  }

  async function listDispatched(e) {
    e.preventDefault();
    if (!dbc) return;
    const response = await dbc.contract.methods
      .listDispatchedUnits(user.id)
      .call();
    if (response == 0) return;
    setDispatcheds(response);
  }

  return (
    <div>
      <div>
        <header>
          <h2>Registrar Recebimento de Produtos</h2>
        </header>
        <main>
          <form onSubmit={handleReceiver}>
            <label htmlFor="">Fornecedor</label>
            <input
              type="text"
              placeholder=""
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
            <label htmlFor="">ID da nidade</label>
            <input
              type="text"
              placeholder=""
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            <label htmlFor="">Data da coleta</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelected
              dateFromat="dd/MM/yyyy"
            />
            <label htmlFor="">Local da coleta</label>
            <input
              type="text"
              placeholder=""
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
            <label htmlFor="">Tipo da Unidade</label>
            <Select
              valueDefault={unitType}
              onChange={(e) => setUnitType(e.value)}
              options={options}
              placeholder=""
            />
            <button type="submit">Registrar</button>
          </form>
        </main>
      </div>

      <div style={{ width: "100%", height: "30%" }}>
        <DataGrid
          columns={columns}
          rows={drums}
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
          // components={{
          //   Pagination,
          //   Cell: isFetching ? CustomSkeleton : GridCell,
          // }}
        />
      </div>

      <div>
        <div>
          <header>
            <h2>Despachar Produção</h2>
          </header>
          <main>
            <form onSubmit={handleDispatcher}>
              <label htmlFor="">Destino</label>
              <input
                type="text"
                placeholder=""
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
              <label htmlFor="">ID da unidade</label>
              <input
                type="text"
                placeholder=""
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="">Data de envio</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelected
                dateFromat="dd/MM/yyyy"
              />
              <label htmlFor="">Local da entrega</label>
              <input
                type="text"
                placeholder=""
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
              <label htmlFor="">Tipo da Unidade</label>
              <Select
                valueDefault={unitType}
                onChange={(e) => setUnitType(e.value)}
                options={options}
                placeholder=""
              />
              <button type="submit">Registrar</button>
            </form>
          </main>
        </div>
        <div style={{ width: "100%", height: "30%" }}>
          <DataGrid
            columns={columns}
            rows={drums}
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
            // components={{
            //   Pagination,
            //   Cell: isFetching ? CustomSkeleton : GridCell,
            // }}
          />
        </div>
      </div>
    </div>
  );
};
export default HomeDistributor;
