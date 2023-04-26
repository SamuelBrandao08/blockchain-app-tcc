// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Authentication.sol";
import "./UpdateTr.sol";

struct ReceivedUnit {
    string id;
    string distributorId;
    string date;
    string local;
}

struct ReceivedContainer {
    string id;
    string[] units;
    string distributorId;
    string date;
    string local;
} // Logistc Unit Received

contract Merchant {
    mapping(string => ReceivedUnit) receivedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) receivedUnitsId;

    mapping(string => ReceivedContainer) receivedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) receivedContainersId;

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
        string memory _dateTime,
        string memory _local,
        string memory _userId
    ) public onlyOWNER(_userId) {
        receivedUnits[_id] = ReceivedUnit(
            _id,
            _distributorId,
            _dateTime,
            _local
        );
        receivedUnitsId[_userId].push(_id);
    }

    function getReceivedUnit(
        string memory _id
    ) public view returns (ReceivedUnit memory) {
        return receivedUnits[_id];
    }

    function getReceivedUnitId(
        string memory _userId
    ) public view returns (string[] memory) {
        return receivedUnitsId[_userId];
    }

    function registerReceivedContainer(
        string memory _id,
        string[] memory _units,
        string memory _distributorId,
        string memory _date,
        string memory _local,
        string memory _userId
    ) public onlyOWNER(_userId) {
        receivedContainers[_id] = ReceivedContainer(
            _id,
            _units,
            _distributorId,
            _date,
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
