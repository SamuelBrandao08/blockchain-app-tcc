// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Authentication.sol";
import "./UpdateTr.sol";

struct ReceivedUnit {
    string id;
    string distributorId;
    string supplierId;
    string dateTime;
    string local;
}

struct ReceivedContainer {
    string id;
    string[] units;
    string supplierId;
    string dateTime;
    string local;
} // Logistc Unit Received

struct DispatchedUnit {
    string id;
    string distributorId;
    string receiverId;
    string date;
    string local;
}

struct DispachedContainer {
    string id;
    string[] units;
    string distributorId;
    string receiverId;
    string date;
    string local;
}

contract Distributor {
    //Variaveis de estado
    mapping(string => ReceivedUnit) receivedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) receivedUnitsId;

    mapping(string => ReceivedContainer) receivedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) receivedContainersId;

    mapping(string => DispatchedUnit) dispatchedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) dispatchedUnitsId;

    mapping(string => DispachedContainer) dispatchedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) dispatchedContainersId;

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
    modifier onlyOWNER(string memory _userId) {
        require(
            instanceAuthentication.activeUser(_userId) == true,
            "Permissao negada!"
        );
        _;
    }

    function registerReceivedUnit(
        string memory _id,
        string memory _distributorId,
        string memory _supplierId,
        string memory _dateTime,
        string memory _local,
        string memory _userId
    ) public onlyOWNER(_userId) {
        receivedUnits[_id] = ReceivedUnit(
            _id,
            _distributorId,
            _supplierId,
            _dateTime,
            _local
        );
        receivedUnitsId[_userId].push(_id);
    }

    function registerReceivedContainer(
        string memory _id,
        string[] memory _units,
        string memory _supplierId,
        string memory _dateTime,
        string memory _local,
        string memory _userId
    ) public onlyOWNER(_userId) {
        receivedContainers[_id] = ReceivedContainer(
            _id,
            _units,
            _supplierId,
            _dateTime,
            _local
        );
        receivedContainersId[_userId].push(_id);
    }

    function getReceivedContainer(
        string memory _id
    ) public view returns (ReceivedContainer memory) {
        return receivedContainers[_id];
    }

    function getReceivedContainerId(
        string memory _userId
    ) public view returns (string[] memory) {
        return receivedContainersId[_userId];
    }

    function registerDispachedUnit(
        string memory _id,
        string memory _distributorId,
        string memory _receiverId,
        string memory _dateTime,
        string memory _local,
        string memory _userId
    ) public onlyOWNER(_userId) {
        dispatchedUnits[_id] = DispatchedUnit(
            _id,
            _distributorId,
            _receiverId,
            _dateTime,
            _local
        );
        dispatchedUnitsId[_userId].push(_id);
    }

    function registerDispatchedContainer(
        string memory _id,
        string[] memory _units,
        string memory _distributorId,
        string memory _receiverId,
        string memory _date,
        string memory _local,
        string memory _userId
    ) public onlyOWNER(_userId) {
        dispatchedContainers[_id] = DispachedContainer(
            _id,
            _units,
            _distributorId,
            _receiverId,
            _date,
            _local
        );
        dispatchedContainersId[_userId].push(_id);
    }

    function getDispatchedContainer(
        string memory _id
    ) public view returns (DispachedContainer memory) {
        return dispatchedContainers[_id];
    }

    function getDispatchedContainerId(
        string memory _userId
    ) public view returns (string[] memory) {
        return dispatchedContainersId[_userId];
    }

    //Função para registrar a tranzação de um produto
    function forwarding(
        string memory _sender,
        string memory _receiver,
        string memory _unitId,
        string memory _date,
        string memory _businessUnitType,
        bytes memory _signature
    ) public onlyOWNER(_receiver) {
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
