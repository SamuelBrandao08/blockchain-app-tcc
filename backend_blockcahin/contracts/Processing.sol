// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Authentication.sol";
import "./UpdateTr.sol";

struct Feedstock {
    string id;
    string distributorId;
    string dateTime;
}

struct FeedstockContainer {
    string id;
    string[] feedstockIds;
    string distributorId;
    string dateTime;
}

struct Honey {
    string id;
    string batch;
    string feedstockBatch;
    string honeyType;
    string variety;
    uint64 weight;
    string packaging;
    string validity;
    string composition;
}

struct Box {
    string id;
    string batch;
    string[] honeyId;
}

struct Pallet {
    string id;
    string[] boxId;
}

contract Processing {
    // Variaveis de estado
    mapping(string => Feedstock) feedstocks; // endereco => (codigo => carregamento). lista de materia prima recebida por cada processador de mel.
    mapping(string => string[]) feedstocksId;

    mapping(string => FeedstockContainer) feedstockContainers; // endereco => (codigo => carregamento). lista de materia prima recebida por cada processador de mel.
    mapping(string => string[]) feedstockContainersId;

    mapping(string => Honey) honeys; // honey id => Honey. Lista de produtos fabricados por cada processador de mel.
    mapping(string => string[]) honeysId; // user id => honey id []
    mapping(string => string[]) honeysBatch; // user id => batch[]
    mapping(string => uint32) count; // batch => counter

    mapping(string => Box) boxes; // endereco => (codigo => Container). Lista de conteiners(caixa ou palete) montados por cada processador de mel.
    mapping(string => string[]) boxesId;

    mapping(string => Pallet) pallets; // endereco => (codigo => Container). Lista de conteiners(caixa ou palete) montados por cada processador de mel.
    mapping(string => string[]) palletsId;
    //mapping(string => string[]) palletsBatch;

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

    // Funções relacionadas ao mel recebido pelos processadores
    function regiterFeedstock(
        string memory _id,
        string memory _distributorId,
        string memory _date,
        string memory _userId
    ) public onlyOWNER(_userId) {
        feedstocks[_id] = Feedstock(_id, _distributorId, _date);
        feedstocksId[_userId].push(_id);
    }

    // Funcoes GET
    function getFeedstock(
        string memory _id
    ) public view returns (Feedstock memory) {
        return feedstocks[_id];
    }

    function getFeedstockId(
        string memory _userId
    ) public view returns (string[] memory) {
        return feedstocksId[_userId];
    }

    function regiterFeedstockContainer(
        string memory _id,
        string[] memory _feedstockIds,
        string memory _distributorId,
        string memory _date,
        string memory _userId
    ) public onlyOWNER(_userId) {
        feedstockContainers[_id] = FeedstockContainer(
            _id,
            _feedstockIds,
            _distributorId,
            _date
        );
        feedstockContainersId[_userId].push(_id);
    }

    // Funcoes GET
    function getFeedstockContainer(
        string memory _id
    ) public view returns (FeedstockContainer memory) {
        return feedstockContainers[_id];
    }

    function getFeedstockContainerId(
        string memory _userId
    ) public view returns (string[] memory) {
        return feedstockContainersId[_userId];
    }

    // Funções relacionadas ao mel beneficiado produzido pelos processadores

    function generateBatch(
        string memory _userId,
        string memory _feedstockBatch,
        string memory _honeyType,
        string memory _variety,
        uint64 _weight,
        string memory _dateTime
    ) public returns (string memory) {
        bytes4 _hash = bytes4(
            keccak256(
                abi.encodePacked(
                    _userId,
                    _feedstockBatch,
                    _honeyType,
                    _variety,
                    _weight,
                    _dateTime
                )
            )
        );
        string memory _batch = string(abi.encodePacked(_userId, _hash));
        honeysBatch[_userId].push(_batch);
        return _batch;
    }

    function newHoney(
        Honey memory _honey,
        string memory _userId
    ) public onlyOWNER(_userId) returns (string memory) {
        uint32 _count = count[_honey.batch]++;
        string memory _id = string(abi.encodePacked(_honey.batch, _count));
        //string memory _id = string(abi.encodePacked(_batch, _dateTime));
        honeys[_id] = Honey(
            _id,
            _honey.batch,
            _honey.feedstockBatch,
            _honey.honeyType,
            _honey.variety,
            _honey.weight,
            _honey.packaging,
            _honey.validity,
            _honey.composition
        );
        honeysId[_userId].push(_id);
        return _id;
    }

    function newHoneys(
        Honey memory _honey,
        string memory _dateTime,
        uint _amount,
        string memory _userId
    ) public onlyOWNER(_userId) returns (string[] memory id) {
        string memory _batch = generateBatch(
            _userId,
            _honey.feedstockBatch,
            _honey.honeyType,
            _honey.variety,
            _honey.weight,
            _dateTime
        );

        for (uint256 index = 0; index < _amount; index++) {
            uint32 _count = count[_batch]++;
            string memory _id = string(abi.encodePacked(_batch, _count));
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
            honeysId[_userId].push(_id);
            id[index] = _id;
        }
        return id;
    }

    function getHoney(string memory _id) public view returns (Honey memory) {
        return honeys[_id];
    }

    function getHoneyId(
        string memory _userId
    ) public view returns (string[] memory) {
        return honeysId[_userId];
    }

    // Funções relacionadas aos containeres de mel produzidos pelos processadores
    function newBox(
        string[] memory _honeyId,
        string memory _userId,
        string memory _batch,
        string memory _dateTime
    ) public onlyOWNER(_userId) returns (string memory) {
        //bytes32 _id = bytes32(keccak256(abi.encodePacked(_honeyId)));

        string memory _id = string(abi.encodePacked(_batch, _dateTime));
        boxes[_id] = Box(_id, _batch, _honeyId);
        boxesId[_userId].push(_id);
        return _id;
    }

    function getBox(string memory _id) public view returns (Box memory) {
        return boxes[_id];
    }

    function getBoxId(
        string memory _userId
    ) public view returns (string[] memory) {
        return boxesId[_userId];
    }

    function newPallet(
        string[] memory _boxId,
        string memory _userId
    ) public onlyOWNER(_userId) returns (string memory) {
        //string memory _id = string(abi.encodePacked(keccak256(abi.encode(_boxId))));
        bytes16 _hash = bytes16(keccak256(abi.encode(_boxId)));
        string memory _id = string(abi.encodePacked(_userId, _hash));
        pallets[_id] = Pallet(_id, _boxId);
        palletsId[_userId].push(_id);
        return _id;
    }

    // Fonções GET
    function getPallet(string memory _id) public view returns (Pallet memory) {
        return pallets[_id];
    }

    function getPalletId(
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
