// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Authentication.sol";
import "./UpdateTr.sol";

struct ReceivedUnit {
    string id;
    string[] units;
    string distributorId;
    string date;
    UnitType unitType;
}

struct ReceivedContainer {
    string id;
    string[] units;
    string distributorId;
    string date;
} // Logistc Unit Received

contract Merchant {
    mapping(string => ReceivedUnit) receivedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => ReceivedContainer) receivedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) receivedUnitsId; // user id => unit id[] Lista dos ids das unidades recebidas por comerciante

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
        string[] memory _units,
        string memory _distributorId,
        string memory _dateTime,
        UnitType _unitType,
        string memory _userId
    ) private {
        receivedUnits[_id] = ReceivedUnit(
            _id,
            _units,
            _distributorId,
            _dateTime,
            _unitType
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
        string memory _userId
    ) private {
        receivedContainers[_id] = ReceivedContainer(
            _id,
            _units,
            _distributorId,
            _date
        );
        receivedUnitsId[_userId].push(_id);
    }

    function getReceivedContainer(
        string memory _id
    ) public view returns (ReceivedContainer memory) {
        return receivedContainers[_id];
    }

    function listReceivedUnits(
        string memory _user
    ) public view returns (ReceivedUnit[] memory) {
        ReceivedUnit[] memory unitsArray = new ReceivedUnit[](
            receivedUnitsId[_user].length
        );
        for (uint256 i = 0; i < unitsArray.length; i++) {
            unitsArray[i] = receivedUnits[receivedUnitsId[_user][i]];
        }
        return unitsArray;
    }

    function receiver(
        string memory _sender,
        string memory _receiver,
        string memory _unit,
        string[] memory _units,
        string memory _date,
        UnitType _unitType
    ) public onlyOWNER(_receiver) returns (bool) {
        registerReceivedUnit(
            _unit,
            _units,
            _sender,
            _date,
            _unitType,
            _receiver
        );
        return true;
    }
}
