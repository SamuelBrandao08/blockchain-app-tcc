import useContract from "../../../../hooks/useContract";
import { abi } from "../../../../abi/Production.json";
import { Production } from "../../../../abi/address.json";
import { useEffect } from "react";
import Select from "react-select";

export default function ListBatchs({
  batchs,
  setBatchs,
  selectedBatch,
  setSelectedBatch,
}) {
  const userId = localStorage.getItem("userId");
  // const [batchs, setBatchs] = useState([]);
  // const [selectedBatch, setSelectedBatch] = useState("");
  const contract = useContract(abi, Production);
  console.log(contract);
  useEffect(() => {
    getBatchs();
  }, [contract]);

  const getBatchs = async () => {
    if (contract !== null) {
      const response = await contract.methods.getDrumBatchs(userId).call();
      const options = response.map((i) => ({
        label: i,
        value: i,
      }));
      setBatchs(options);
    }
  };

  return (
    <div>
      <Select
        defaultValue={selectedBatch}
        onChange={(e) => setSelectedBatch(e.value)}
        options={batchs}
        placeholder={selectedBatch ?? "loading..."}
      />
    </div>
  );
}
