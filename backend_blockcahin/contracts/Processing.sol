// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Authentication.sol";
import "./UpdateTr.sol";

struct Feedstock {
    bytes30 id;
    bytes32 supplier;
    string dateTime;
}

struct FeedstockContainer {
    bytes32 id;
    bytes30[] feedstockIds;
    bytes32 supplier;
    string dateTime;
}

struct Honey {
    bytes30 id;
    bytes20 batch;
    bytes20 feedstockBatch;
    string honeyType;
    string variety;
    uint64 weight;
    string packaging;
    string validity;
    string composition;
}

struct Box {
    bytes32 id;
    bytes20 batch;
    bytes30[] honeyId;
}

struct Pallet {
    bytes32 id;
    bytes32[] boxId;
}

contract Processing {
    // Variaveis de estado
    mapping(bytes32 => Feedstock) feedstocks; // endereco => (codigo => carregamento). lista de materia prima recebida por cada processador de mel.
    mapping(address => bytes32[]) feedstocksId;

    mapping(bytes30 => FeedstockContainer) feedstockContainers; // endereco => (codigo => carregamento). lista de materia prima recebida por cada processador de mel.
    mapping(address => bytes30[]) feedstockContainersId;

    mapping(bytes32 => Honey) honeys; // endereco => (codigo => Honey). Lista de produtos fabricados por cada processador de mel.
    mapping(address => bytes30[]) honeysId;
    mapping(address => bytes20[]) honeysBatch;

    mapping(bytes32 => Box) boxes; // endereco => (codigo => Container). Lista de conteiners(caixa ou palete) montados por cada processador de mel.
    mapping(address => bytes32[]) boxesId;

    mapping(bytes32 => Pallet) pallets; // endereco => (codigo => Container). Lista de conteiners(caixa ou palete) montados por cada processador de mel.
    mapping(address => bytes32[]) palletsId;
    mapping(address => bytes20[]) palletsBatch;

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

    // Funções relacionadas ao mel recebido pelos processadores
    function regiterFeedstock(
        bytes30 _id,
        bytes32 _supplier,
        string memory _date,
        address _addr
    ) public onlyOWNER(_addr) {
        feedstocks[_id] = Feedstock(_id, _supplier, _date);
        feedstocksId[_addr].push(_id);
    }

    // Funcoes GET
    function getFeedstock(bytes32 _id) public view returns (Feedstock memory) {
        return feedstocks[_id];
    }

    function getFeedstockId(
        address _addr
    ) public view returns (bytes32[] memory) {
        return feedstocksId[_addr];
    }

    function regiterFeedstockContainer(
        bytes30 _id,
        bytes30[] memory _feedstockIds,
        bytes32 _supplier,
        string memory _date,
        address _addr
    ) public onlyOWNER(_addr) {
        feedstockContainers[_id] = FeedstockContainer(
            _id,
            _feedstockIds,
            _supplier,
            _date
        );
        feedstockContainersId[_addr].push(_id);
    }

    // Funcoes GET
    function getFeedstockContainer(
        bytes30 _id
    ) public view returns (FeedstockContainer memory) {
        return feedstockContainers[_id];
    }

    function getFeedstockContainerId(
        address _addr
    ) public view returns (bytes30[] memory) {
        return feedstockContainersId[_addr];
    }

    // Funções relacionadas ao mel beneficiado produzido pelos processadores

    function generateBatch(
        address _addr,
        bytes20 _feedstockBatch,
        string memory _honeyType,
        string memory _variety,
        uint64 _weight,
        string memory _date
    ) public returns (bytes20) {
        bytes20 _batch = ripemd160(
            abi.encodePacked(
                _addr,
                _feedstockBatch,
                _honeyType,
                _variety,
                _weight,
                _date
            )
        );

        honeysBatch[_addr].push(_batch);
        return _batch;
    }

    function newHoney(
        bytes20 _batch,
        bytes20 _feedstockBatch,
        string memory _honeyType,
        string memory _variety,
        uint64 _weight,
        string memory _pacaging,
        string memory _validity,
        string memory _composition,
        string memory _dateTime,
        address _addr
    ) public onlyOWNER(_addr) returns (bytes30) {
        bytes30 _id = bytes30(abi.encodePacked(_batch, _dateTime));
        honeys[_id] = Honey(
            _id,
            _batch,
            _feedstockBatch,
            _honeyType,
            _variety,
            _weight,
            _pacaging,
            _validity,
            _composition
        );
        honeysId[_addr].push(_id);
        return _id;
    }

    // bytes20 _feedstockBatch,
    // string memory _honeyType,
    // string memory _variety,
    // uint64 _weight,
    // string memory _packaging,
    // string memory _validity,
    // string memory _composition,
    // string memory _date,
    // string memory _time,
    function newHoneys(
        Honey memory _honey,
        string memory _date,
        string memory _time,
        uint _amount,
        address _addr
    ) public onlyOWNER(_addr) returns (bytes30[] memory id) {
        bytes20 _batch = generateBatch(
            _addr,
            _honey.feedstockBatch,
            _honey.honeyType,
            _honey.variety,
            _honey.weight,
            _date
        );

        for (uint256 index = 0; index < _amount; index++) {
            bytes30 _id = bytes30(abi.encodePacked(_batch, _date, _time));
            honeys[_id] = Honey(
                _id,
                _batch,
                _honey.feedstockBatch,
                _honey.honeyType,
                _honey.variety,
                _honey.weight,
                _honey.packaging,
                _honey.validity,
                _honey.composition
            );
            honeysId[_addr].push(_id);
            id[index] = bytes30(_id);
        }
        return id;
    }

    function getHoney(bytes30 _id) public view returns (Honey memory) {
        return honeys[_id];
    }

    function getHoneyId(address _addr) public view returns (bytes30[] memory) {
        return honeysId[_addr];
    }

    // Funções relacionadas aos containeres de mel produzidos pelos processadores
    function newBox(
        bytes30[] memory _honeyId,
        address _addr,
        bytes20 _batch
    ) public onlyOWNER(_addr) returns (bytes32) {
        bytes32 _id = bytes32(keccak256(abi.encodePacked(_honeyId)));
        boxes[_id] = Box(_id, _batch, _honeyId);
        boxesId[_addr].push(_id);
        return _id;
    }

    function getBox(bytes30 _id) public view returns (Box memory) {
        return boxes[_id];
    }

    function getBoxId(address _addr) public view returns (bytes32[] memory) {
        return boxesId[_addr];
    }

    function newPallet(
        bytes32[] memory _honeyId,
        address _addr
    ) public onlyOWNER(_addr) returns (bytes32) {
        bytes32 _id = keccak256(abi.encodePacked(_honeyId));
        pallets[_id] = Pallet(_id, _honeyId);
        palletsId[_addr].push(_id);
        return _id;
    }

    // Fonções GET
    function getPallet(bytes32 _id) public view returns (Box memory) {
        return boxes[_id];
    }

    function getPalletId(address _addr) public view returns (bytes32[] memory) {
        return boxesId[_addr];
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
