import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";
import useContract from "../../../hooks/useContract";
import PRC from "../../../abi/Production.json";
import { Production } from "../../../abi/address.json";

import styles from "./style.module.scss";
import api from "../../../services/api";
import { useWeb3Context } from "web3-react";
import { FiArrowLeft } from "react-icons/fi";
import HoneyProduction from "./Componentes/Production/HoneyProduction";
import DispatchedProducts from "./Componentes/Dispatched/DispatchedProducts";
import ProducerTracing from "./Componentes/ProducerTracing/ProducerTracing";
import useWallet from "../../../hooks/useConnect";
import useConnect from "../../../hooks/useConnect";
import { DataGrid as MuiDataGrid, ptBR } from "@mui/x-data-grid";
import { styled } from "@mui/material";
import Select from "react-select";
import { format } from "date-fns";

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

function HomeProducer({ user }) {
  console.log(user);
  const [item, setItem] = useState("");

  const [drumId, setDrumId] = useState("");
  const [drum, setDrum] = useState({});
  const [drums, setDrums] = useState([]);

  const [palletId, setPalletId] = useState([]);
  const [pallet, setPallet] = useState({});

  const [dispatched, setDispatched] = useState([]);
  const [product, setProduct] = useState([]);

  const [batchs, setBatchs] = useState([]);
  // const [selectedBatch, setSelectedBatch] = useState("");

  const context = useWeb3Context();
  //const contract = useContract(PRC.abi, Production);
  const { contract } = useConnect(PRC.abi, Production);

  useEffect(() => {
    getBatchs();
    listDispatched();
  }, []);

  const getBatchs = async () => {
    if (contract !== null) {
      const response = await contract.methods.getDrumBatchs(user.id).call();
      if (response == 0) return;
      const options = response.map((i) => ({
        label: i,
        value: i,
      }));
      setBatchs(options.reverse());
      // setSelectedBatch(options[0].value);
    }
  };

  const listDrums = async (batch) => {
    if (contract !== null) {
      const response = await contract.methods.listDrums(batch).call();
      setDrums(response);
    }
  };

  const listDispatched = async () => {
    if (contract !== null) {
      const response = await contract.methods.listDispatched(user.id).call();
      setDispatched(response);
    }
  };

  const handleGetDrum = async (drumId) => {
    try {
      if (contract === null) return;
      return await contract.methods.getDrum(drumId).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  const handleGetPallet = async (palletId) => {
    try {
      if (contract === null);
      return await contract.methods.getPallet(palletId).call();
    } catch (error) {
      alert("Erro na operação.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Select
          className={styles.select}
          // defaultValue={selectedBatch}
          onChange={(e) => listDrums(e.value)}
          options={batchs ?? [{ label: "carregando..." }]}
          placeholder="Selecione o lote"
        />
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
        {/* <HoneyProduction
          drums={drums}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          batchs={batchs}
          setBatchs={setBatchs}
          contract={contract}
        // listProduct={listProduct}
        /> */}

        {/* {product.length && (
            <Product product={product} handleBack={() => setProduct([])} />
          )} */}

        {/* <div>
          <form onSubmit={handleGetDrum}>
            <input
              type="text"
              placeholder="ID do produto"
              value={drumId}
              onChange={(e) => setDrumId(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div> */}
      </div>
      <div>
        <DispatchedProducts
          dispatched={dispatched}
          setDispatched={setDispatched}
        />
      </div>
      <div>
        <ProducerTracing />
      </div>
    </div>
  );
}

export default HomeProducer;
