// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Authentication.sol";
import "./UpdateTr.sol";

struct ReceivedUnit {
    bytes32 id;
    address distributorId;
    address supplierId;
    string dateTime;
    string local;
}

struct ReceivedContainer {
    bytes32 id;
    bytes32[] units;
    address supplierId;
    string dateTime;
    string local;
} // Logistc Unit Received

struct DispatchedUnit {
    bytes32 id;
    address distributorId;
    address receiverId;
    string date;
    string local;
}

struct DispachedContainer {
    bytes32 id;
    bytes32[] units;
    address distributorId;
    address receiverId;
    string date;
    string local;
}

contract Distributor {
    //Variaveis de estado
    mapping(bytes32 => ReceivedUnit) receivedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(address => bytes32[]) receivedUnitsId;

    mapping(bytes32 => ReceivedContainer) receivedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(address => bytes32[]) receivedContainersId;

    mapping(bytes32 => DispatchedUnit) dispatchedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(address => bytes32[]) dispatchedUnitsId;

    mapping(bytes30 => DispachedContainer) dispatchedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(address => bytes30[]) dispatchedContainersId;

    address contractAuthentication;
    Authentication instanceAuthentication;
    address contractUpdateTr;
    UpdateTr instanceUpdateTr;

    constructor(address _contractAuthentication, address _contractUpdateTr) {
        contractAuthentication = _contractAuthentication;
        instanceAuthentication = Authentication(contractAuthentication);
        contractUpdateTr = _contractUpdateTr;
        instanceUpdateTr = UpdateTr(contractUpdateTr);
    }

    //Verifica se o endereço que esta chamando o contrato possui permisao para modificar o estado da rede
    modifier onlyOWNER(address _addr) {
        require(
            instanceAuthentication.activeUser(_addr) == true,
            "Permissao negada!"
        );
        _;
    }

    function registerReceivedUnit(
        bytes32 _id,
        address _distributorId,
        address _supplierId,
        string memory _dateTime,
        string memory _local,
        address _addr
    ) public onlyOWNER(_addr) {
        receivedUnits[_id] = ReceivedUnit(
            _id,
            _distributorId,
            _supplierId,
            _dateTime,
            _local
        );
        receivedUnitsId[_addr].push(_id);
    }

    function registerReceivedContainer(
        bytes32 _id,
        bytes32[] memory _units,
        address _supplierId,
        string memory _dateTime,
        string memory _local,
        address _addr
    ) public onlyOWNER(_addr) {
        receivedContainers[_id] = ReceivedContainer(
            _id,
            _units,
            _supplierId,
            _dateTime,
            _local
        );
        receivedContainersId[_addr].push(_id);
    }

    function getReceivedContainer(
        bytes30 _id
    ) public view returns (ReceivedContainer memory) {
        return receivedContainers[_id];
    }

    function getReceivedContainerId(
        address _addr
    ) public view returns (bytes32[] memory) {
        return receivedContainersId[_addr];
    }

    function registerDispachedUnit(
        bytes32 _id,
        address _distributorId,
        address _receiverId,
        string memory _dateTime,
        string memory _local,
        address _addr
    ) public onlyOWNER(_addr) {
        dispatchedUnits[_id] = DispatchedUnit(
            _id,
            _distributorId,
            _receiverId,
            _dateTime,
            _local
        );
        dispatchedUnitsId[_addr].push(_id);
    }

    function registerDispachedContainer(
        bytes30 _id,
        bytes32[] memory _units,
        address _distributorId,
        address _receiverId,
        string memory _date,
        string memory _local,
        address _addr
    ) public onlyOWNER(_addr) {
        dispatchedContainers[_id] = DispachedContainer(
            _id,
            _units,
            _distributorId,
            _receiverId,
            _date,
            _local
        );
        dispatchedContainersId[_addr].push(_id);
    }

    function getDispachedContainer(
        bytes30 _id
    ) public view returns (DispachedContainer memory) {
        return dispatchedContainers[_id];
    }

    function getDispachedContainerId(
        address _addr
    ) public view returns (bytes30[] memory) {
        return dispatchedContainersId[_addr];
    }

    //Função para registrar a tranzação de um produto
    function forwarding(
        address _sender,
        address _receiver,
        bytes32 _unitId,
        string memory _date,
        string memory _businessUnitType,
        bytes memory _signature
    ) public onlyOWNER(msg.sender) {
        //chamar funcao updateTr no contrato UpdateTr
        instanceUpdateTr.updateTr(
            _sender,
            _receiver,
            _unitId,
            _date,
            _businessUnitType,
            _signature
        );
    }
}
