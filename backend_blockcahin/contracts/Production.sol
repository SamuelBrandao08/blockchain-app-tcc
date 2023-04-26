// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Authentication.sol";
import "./UpdateTr.sol";

struct Hive {
    string hiveId;
    uint16 weightHoney;
    string dateCollect;
}

struct Drum {
    string id;
    string batch;
    string productorId;
    string apiary;
    uint64 weight;
    string packing;
    string flowering;
    string date;
    string[] hivesId;
}

struct Pallet {
    string id;
    string batch;
    string[] tunId;
}

// struct Honey {
//     uint256 codigo;
//     uint256 lote;
//     string especializacao;
//     uint64 peso;
//     uint256 date;
//     string localizacao;
//     uint256 producaoId;
// }

contract Production {
    mapping(string => Hive) hives;
    mapping(string => string[]) hiveId;

    mapping(string => Drum) drums;
    mapping(string => string[]) drumsId;
    mapping(string => string[]) drumsBatch;

    mapping(string => Pallet) pallets;
    mapping(string => string[]) palletsId;

    // mapping(address => mapping(uint256 => Honey)) product;
    // uint256[] productCode;

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
    modifier onlyOWNER(string memory _id) {
        require(
            instanceAuthentication.activeUser(_id) == true,
            "Permissao negada!"
        );
        _;
    }

    event UpdateHive(string indexed _id, Hive[] indexed hives);
    event Collect(
        address indexed addr,
        uint256 hiveId,
        uint256 dateCollect,
        int256 peso
    );

    function updateHive(
        string memory _id,
        Hive[] memory _hives
    ) public onlyOWNER(_id) {
        emit UpdateHive(_id, _hives);
    }

    function generateBatch(
        string memory _userId,
        string memory _flowering,
        string memory _date
    ) public onlyOWNER(_userId) returns (string memory) {
        bytes4 _hash = bytes4(
            keccak256(abi.encodePacked(_userId, _flowering, _date))
        );
        string memory _batch = string(abi.encodePacked(_userId, _hash));

        drumsBatch[_userId].push(_batch);
        return _batch;
    }

    function newTun(
        string memory _userId,
        string memory _batch,
        string memory _apiary,
        uint64 _weight,
        string memory _packing,
        string memory _flowering,
        string memory _dateTime,
        string[] memory _hivesId
    ) public onlyOWNER(_userId) returns (string memory) {
        string memory _id = string(abi.encodePacked(_batch, _dateTime));

        drums[_id] = Drum(
            _id,
            _batch,
            _userId,
            _apiary,
            _weight,
            _packing,
            _flowering,
            _dateTime,
            _hivesId
        );
        drumsId[_userId].push(_id);
        return drums[_id].id;
    }

    function getDrum(string memory _id) public view returns (Drum memory) {
        return drums[_id];
    }

    function getDrumId(
        string memory _userId
    ) public view returns (string[] memory) {
        return drumsId[_userId];
    }

    function newPallet(
        string memory _userId,
        string memory _batch,
        string[] memory _drumId
    ) public onlyOWNER(_userId) returns (string memory) {
        bytes16 _hash = bytes16(keccak256(abi.encode(_drumId)));
        string memory _id = string(abi.encodePacked(_userId, _hash));
        pallets[_id] = Pallet(_id, _batch, _drumId);
        palletsId[_userId].push(_id);
        return _id;
    }

    function getPallet(string memory _id) public view returns (Pallet memory) {
        return pallets[_id];
    }

    function getPalletsId(
        string memory _userId
    ) public view returns (string[] memory) {
        return palletsId[_userId];
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
