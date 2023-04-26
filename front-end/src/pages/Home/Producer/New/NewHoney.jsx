import React from "react";

// import { Container } from './styles';

//     struct Tun {
//     bytes30 id;
//     bytes20 batch;
//     address productorId;
//     string apiary;
//     uint64 weight;
//     string packing;
//     string flowering;
//     string date;
//     uint256[] hivesId;
// }
function NewHoney() {
  const history = useHistory();

  const [batch, setBatch] = useState("");
  const [apiary, setApiary] = useState();
  const [weight, setWeight] = useState(0);
  const [packing, setPacking] = useState("");
  const [flowering, setflowering] = useState("");
  const [date, setDate] = useState(0);
  const [colmeiasId, setColmeiasId] = useState([0]);
  const [hivesId, sethivesId] = useState([]);

  const context = useWeb3Context();
  const contract = useContract(abi, Production);

  const hendleNewHoney = async () => ({});
  return <div />;
}

export default NewHoney;
