// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Authentication.sol";
import "./UpdateTr.sol";

struct Hive {
    uint256 hiveId;
    uint16 weightHoney;
    string dateCollect;
}

struct Tun {
    bytes30 id;
    bytes20 batch;
    address productorId;
    string apiary;
    uint64 weight;
    string packing;
    string flowering;
    string date;
    uint256[] hivesId;
}

struct Container {
    bytes32 id;
    bytes20 batch;
    bytes30[] tunId;
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
    mapping(uint256 => Hive) hives;
    mapping(address => uint256[]) hiveId;

    mapping(bytes30 => Tun) tunList;
    mapping(address => bytes30[]) tunListId;
    mapping(address => bytes20[]) tunBatch;

    mapping(bytes32 => Container) containerList;
    mapping(address => bytes32[]) containerListId;

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
    modifier onlyOWNER(address _addr) {
        require(
            instanceAuthentication.activeUser(_addr) == true,
            "Permissao negada!"
        );
        _;
    }

    event UpdateHive(address indexed addr, Hive[] indexed hives);
    event Collect(
        address indexed addr,
        uint256 hiveId,
        uint256 dateCollect,
        int256 peso
    );

    function updateHive(
        address _addr,
        Hive[] memory _hives
    ) public onlyOWNER(_addr) {
        emit UpdateHive(_addr, _hives);
    }

    function generateBatch(
        address _addr,
        string memory _apiary,
        string memory _flowering,
        string memory _date
    ) public onlyOWNER(_addr) returns (bytes20) {
        bytes20 _batch = ripemd160(
            abi.encodePacked(_addr, _apiary, _flowering, _date)
        );
        tunBatch[_addr].push(_batch);
        return _batch;
    }

    function newTun(
        address _addr,
        bytes20 _batch,
        string memory _apiary,
        uint64 _weight,
        string memory _packing,
        string memory _flowering,
        string memory _dateTime,
        uint256[] memory _hivesId
    ) public onlyOWNER(_addr) returns (bytes30) {
        bytes30 _id = bytes30(abi.encodePacked(_batch, _dateTime));

        tunList[_id] = Tun(
            _id,
            _batch,
            _addr,
            _apiary,
            _weight,
            _packing,
            _flowering,
            _dateTime,
            _hivesId
        );
        tunListId[_addr].push(_id);
        return tunList[_id].id;
    }

    function getTun(bytes30 _id) public view returns (Tun memory) {
        return tunList[_id];
    }

    function getTunId(address _addr) public view returns (bytes30[] memory) {
        return tunListId[_addr];
    }

    function newContainer(
        address _addr,
        bytes20 _batch,
        bytes30[] memory _tunId
    ) public onlyOWNER(_addr) returns (bytes32) {
        bytes12 _hash = bytes12(keccak256(abi.encodePacked(_tunId)));
        bytes32 _id = bytes32(abi.encodePacked(_addr, _hash));
        containerList[_id] = Container(_id, _batch, _tunId);
        containerListId[_addr].push(_id);
        return _id;
    }

    function getContainer(bytes32 _id) public view returns (Container memory) {
        return containerList[_id];
    }

    function getContainersId(
        address _addr
    ) public view returns (bytes32[] memory) {
        return containerListId[_addr];
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
