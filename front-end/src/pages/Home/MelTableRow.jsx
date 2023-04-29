import { Link, useHistory } from "react-router-dom";

function MelTableRow(props) {
  const { codigo, lote, especializacao, peso, data, localizacao, producaoId } =
    props.product;

  const history = useHistory();
  const TrVerify = () => {};

  return (
    <tr>
      <td>{codigo}</td>
      <td>{lote}</td>
      <td>{especializacao}</td>
      <td>{peso}</td>
      <td>{data}</td>
      <td>{localizacao}</td>
      <td>{producaoId}</td>

      <td>
        <button onClick={() => TrVerify} className="btn btn-danger">
          Verificar Transação
        </button>
      </td>
    </tr>
  );
}
export default MelTableRow;
