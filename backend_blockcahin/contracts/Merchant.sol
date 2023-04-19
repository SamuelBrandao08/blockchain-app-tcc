// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Authentication.sol";
import "./UpdateTr.sol";

struct ReceivedUnit {
    bytes32 id;
    address distributorId;
    address supplierId;
    string date;
    string local;
}

struct ReceivedContainer {
    bytes32 id;
    bytes32[] units;
    address supplierId;
    string date;
    string local;
} // Logistc Unit Received

contract Merchant {
    mapping(bytes32 => ReceivedUnit) receivedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(address => bytes32[]) receivedUnitsId;

    mapping(bytes32 => ReceivedContainer) receivedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(address => bytes32[]) receivedContainersId;

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

    function getReceivedUnit(
        bytes32 _id
    ) public view returns (ReceivedUnit memory) {
        return receivedUnits[_id];
    }

    function getReceivedUnitId(
        address _addr
    ) public view returns (bytes32[] memory) {
        return receivedUnitsId[_addr];
    }

    function registerReceivedContainer(
        bytes32 _id,
        bytes32[] memory _units,
        address _supplierId,
        string memory _date,
        string memory _local,
        address _addr
    ) public onlyOWNER(_addr) {
        receivedContainers[_id] = ReceivedContainer(
            _id,
            _units,
            _supplierId,
            _date,
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
