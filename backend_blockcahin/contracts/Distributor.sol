// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Authentication.sol";
import "./UpdateTr.sol";

struct ReceivedUnit {
    string id;
    string supplierId;
    string dateTime;
    string local;
    UnitType unitType;
}

// struct ReceivedContainer {
//     string id;
//     string[] units;
//     string supplierId;
//     string dateTime;
//     string local;
//     string unitType;
// } // Logistc Unit Received

struct DispatchedUnit {
    string id;
    string receiverId;
    string date;
    string local;
    UnitType unitType;
}

// struct DispachedContainer {
//     string id;
//     string[] units;
//     string distributorId;
//     string receiverId;
//     string date;
//     string local;
//     string unitType;
// }

// enum UnitType {
//     unidade,
//     caixa,
//     palete
// }

contract Distributor {
    //Variaveis de estado
    mapping(string => ReceivedUnit) receivedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    // mapping(string => ReceivedContainer) receivedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) receivedUnitsId;

    mapping(string => DispatchedUnit) dispatchedUnits; // Lista de containers recebidos para entrega por cada distribuidor.
    //mapping(string => DispachedContainer) dispatchedContainers; // Lista de containers recebidos para entrega por cada distribuidor.
    mapping(string => string[]) dispatchedUnitsId;

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

    function receiver(
        string memory _id,
        string memory _supplierId,
        string memory _dateTime,
        string memory _local,
        UnitType _unitType,
        string memory _userId
    ) private {
        receivedUnits[_id] = ReceivedUnit(
            _id,
            _supplierId,
            _dateTime,
            _local,
            _unitType
        );
        receivedUnitsId[_userId].push(_id);
    }

    function getReceivedUnits(
        string memory _id
    ) public view returns (ReceivedUnit memory) {
        return receivedUnits[_id];
    }

    function getReceivedUnitsId(
        string memory _userId
    ) public view returns (string[] memory) {
        return receivedUnitsId[_userId];
    }

    function listReceivedUnits(
        string memory _userId
    ) public view returns (ReceivedUnit[] memory) {
        ReceivedUnit[] memory units = new ReceivedUnit[](
            receivedUnitsId[_userId].length
        );
        for (uint256 i = 0; i < units.length; i++) {
            units[i] = receivedUnits[receivedUnitsId[_userId][i]];
        }
        return units;
    }

    function dispatcher(
        string memory _id,
        string memory _distributor,
        string memory _receiver,
        string memory _dateTime,
        string memory _local,
        UnitType _unitType
    ) private {
        dispatchedUnits[_id] = DispatchedUnit(
            _id,
            _receiver,
            _dateTime,
            _local,
            _unitType
        );
        dispatchedUnitsId[_distributor].push(_id);
    }

    function getDispatchedUnits(
        string memory _id
    ) public view returns (DispatchedUnit memory) {
        return dispatchedUnits[_id];
    }

    function getDispatchedUnitsId(
        string memory _userId
    ) public view returns (string[] memory) {
        return dispatchedUnitsId[_userId];
    }

    function listDispatchedUnits(
        string memory _userId
    ) public view returns (DispatchedUnit[] memory) {
        DispatchedUnit[] memory units = new DispatchedUnit[](
            dispatchedUnitsId[_userId].length
        );
        for (uint256 i = 0; i < units.length; i++) {
            units[i] = dispatchedUnits[dispatchedUnitsId[_userId][i]];
        }
        return units;
    }
}
