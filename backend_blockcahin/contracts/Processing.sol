// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Authentication.sol";
import "./UpdateTr.sol";

struct Feedstock {
    string id;
    string[] feedstockIds;
    string distributorId;
    string dateTime;
    UnitType unitType;
}

// struct FeedstockContainer {
//     string id;
//     string[] feedstockIds;
//     string distributorId;
//     string dateTime;
// }

struct Honey {
    string id;
    string batch;
    string code;
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
    string code;
    string[] honeyId;
}

struct Pallet {
    string id;
    string code;
    string[] boxId;
}

struct Dispatched {
    string transporter;
    string unit;
    string date;
}

contract Processing {
    // Variaveis de estado
    uint serialNumber;
    mapping(string => Feedstock) feedstocks; // endereco => (codigo => carregamento). lista de materia prima recebida por cada processador de mel.
    mapping(string => string[]) feedstocksId;

    mapping(string => Honey) honeys; // honey id => Honey. Lista de produtos fabricados por cada processador de mel.
    mapping(string => string[]) honeysId; // user id => honey id []
    mapping(string => string[]) honeyBatchs; // user id => batch[]
    mapping(string => uint32) count; // batch => counter

    mapping(string => Box) boxes; // endereco => (codigo => Container). Lista de conteiners(caixa ou palete) montados por cada processador de mel.
    mapping(string => string[]) boxesId;

    mapping(string => Pallet) pallets; // id pallet => pallet. Lista de conteiners(caixa ou palete) montados por cada processador de mel.
    mapping(string => string[]) palletsId;
    //mapping(string => string[]) palletsBatch;

    mapping(string => Dispatched) dispatcheds; // item id => Dispatche
    mapping(string => string[]) dispatchedsId; // user id => item id

    event NewUnit(string user, string unit);
    event NewUnits(string user, string[] units);

    address contractAuthentication;
    Authentication instanceAuthentication;
    address contractUpdateTr;
    UpdateTr instanceUpdateTr;

    constructor(address _contractAuthentication, address _contractUpdateTr) {
        contractAuthentication = _contractAuthentication;
        instanceAuthentication = Authentication(contractAuthentication);
        contractUpdateTr = _contractUpdateTr;
        instanceUpdateTr = UpdateTr(contractUpdateTr);
        serialNumber = 1;
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
    function receiver(
        string memory _id,
        string[] memory _feedstockIds,
        string memory _distributorId,
        string memory _date,
        UnitType _unitType,
        string memory _userId
    ) public onlyOWNER(_userId) {
        feedstocks[_id] = Feedstock(
            _id,
            _feedstockIds,
            _distributorId,
            _date,
            _unitType
        );
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

    function listFeedstock(
        string memory _userId
    ) public view returns (Feedstock[] memory) {
        Feedstock[] memory feedstock = new Feedstock[](
            feedstocksId[_userId].length
        );
        for (uint256 i = 0; i < feedstock.length; i++) {
            feedstock[i] = feedstocks[feedstocksId[_userId][i]];
        }
        return feedstock;
    }

    // Funções relacionadas ao mel beneficiado produzido pelos processadores

    function generateBatch(
        string memory _userId,
        string memory _feedstockBatch,
        string memory _variety
    ) public returns (string memory) {
        uint hashDigits = 8;
        uint hashModulus = 10 ** hashDigits;
        uint _hash = uint(
            keccak256(
                abi.encodePacked(
                    _userId,
                    _feedstockBatch,
                    _variety,
                    block.timestamp
                )
            )
        );
        string memory _batch = uintToString(_hash % hashModulus);
        honeyBatchs[_userId].push(_batch);
        return _batch;
    }

    function newHoney(
        Honey memory _honey,
        string memory _userId
    ) public onlyOWNER(_userId) {
        string memory _id = string(
            abi.encodePacked(_honey.batch, uintToString(serialNumber))
        );
        require(bytes(honeys[_id].id).length == 0);
        honeys[_id] = Honey(
            _id,
            _honey.batch,
            _honey.code,
            _honey.feedstockBatch,
            _honey.honeyType,
            _honey.variety,
            _honey.weight,
            _honey.packaging,
            _honey.validity,
            _honey.composition
        );
        honeysId[_userId].push(_id);
        serialNumber++;
        emit NewUnit(_userId, _id);
    }

    function getHoney(string memory _id) public view returns (Honey memory) {
        return honeys[_id];
    }

    function getHoneyId(
        string memory _userId
    ) public view returns (string[] memory) {
        return honeysId[_userId];
    }

    function getHoneyBatchs(
        string memory _userId
    ) public view returns (string[] memory) {
        return honeyBatchs[_userId];
    }

    function listHoneys(
        string memory _userId
    ) public view returns (Honey[] memory) {
        Honey[] memory honey = new Honey[](honeysId[_userId].length);
        for (uint256 i = 0; i < honey.length; i++) {
            honey[i] = honeys[honeysId[_userId][i]];
        }
        return honey;
    }

    // Funções relacionadas aos containeres de mel produzidos pelos processadores
    function newBox(
        string[] memory _honeyId,
        string memory _userId,
        string memory _code
    ) public onlyOWNER(_userId) {
        string memory _id = string(
            abi.encodePacked(_code, uintToString(serialNumber))
        );
        require(bytes(boxes[_id].id).length == 0);
        boxes[_id] = Box(_id, _code, _honeyId);
        boxesId[_userId].push(_id);
        emit NewUnit(_userId, _id);
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
        string memory _code,
        string memory _userId
    ) public onlyOWNER(_userId) {
        string memory _id = string(
            abi.encodePacked(_code, uintToString(serialNumber))
        );
        require(bytes(boxes[_id].id).length == 0);
        pallets[_id] = Pallet(_id, _code, _boxId);
        palletsId[_userId].push(_id);
        emit NewUnit(_userId, _id);
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

    function getDispatched(
        string memory _id
    ) public view returns (Dispatched memory) {
        return dispatcheds[_id];
    }

    function listDispatched(
        string memory _userId
    ) public view returns (Dispatched[] memory) {
        Dispatched[] memory dispatched = new Dispatched[](
            dispatchedsId[_userId].length
        );
        for (uint256 i = 0; i < dispatched.length; i++) {
            dispatched[i] = dispatcheds[dispatchedsId[_userId][i]];
        }
        return dispatched;
    }

    function dispatcher(
        string memory _sender,
        string memory _receiver,
        string memory _unit,
        string memory _date
    ) public onlyOWNER(_sender) returns (bool) {
        dispatcheds[_unit] = Dispatched(_receiver, _unit, _date);
        dispatchedsId[_sender].push(_unit);

        return true;
    }

    function uintToString(uint v) internal pure returns (string memory str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        return str = string(s);
    }
}
