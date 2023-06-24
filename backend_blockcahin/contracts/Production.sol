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
    string code;
    string productorId;
    uint64 weight;
    string packing;
    string flowering;
    string date;
    string[] hivesId;
}

struct Pallet {
    string id;
    string code;
    string[] tunId;
}

struct Dispatched {
    string receiver;
    string unit;
    string date;
}

contract Production {
    uint serialNumber;

    mapping(string => mapping(string => Hive)) producerHives; // id producer => id hive => Hive
    mapping(string => string[]) hiveId;

    mapping(string => Drum) drums; // drum id => Drum
    mapping(string => string[]) drumsId; // batch id => drum id[]
    mapping(string => string[]) drumsBatch; // user id => batch id

    mapping(string => Pallet) pallets;
    mapping(string => string[]) palletsId;

    mapping(string => Dispatched) dispatcheds; // item id => Dispatche
    mapping(string => string[]) dispatchedsId; // user id => item id[]

    event NewUnit(string user, string unit);
    event NewUnits(string user, string[] unit);

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
    modifier onlyOWNER(string memory _id) {
        require(
            instanceAuthentication.activeUser(_id) == true,
            "Permissao negada!"
        );
        _;
    }

    event Collect(
        address indexed addr,
        uint256 hiveId,
        uint256 dateCollect,
        int256 peso
    );

    function updateHives(
        string memory _userId,
        Hive[] memory _hives
    ) public onlyOWNER(_userId) {
        for (uint256 i = 0; i < _hives.length; i++) {
            producerHives[_userId][_hives[i].hiveId] = Hive(
                _hives[i].hiveId,
                _hives[i].weightHoney,
                _hives[i].dateCollect
            );
        }
    }

    event NewBatch(string batch);

    function generateBatch(
        string memory _userId,
        string memory _flowering
    ) public {
        uint hashDigits = 8;
        uint hashModulus = 10 ** hashDigits;
        uint _hash = uint(
            keccak256(abi.encodePacked(_userId, _flowering, block.timestamp))
        );
        string memory _batch = uintToString(_hash % hashModulus);
        drumsBatch[_userId].push(_batch);
        emit NewBatch(_batch);
    }

    function newDrum(
        string memory _userId,
        string memory _batch,
        string memory _code,
        uint64 _weight,
        string memory _packing,
        string memory _flowering,
        string memory _dateTime,
        string[] memory _hivesId
    ) public onlyOWNER(_userId) {
        string memory _id = string(
            abi.encodePacked(_batch, uintToString(serialNumber))
        );
        require(bytes(drums[_id].id).length == 0);

        drums[_id] = Drum(
            _id,
            _batch,
            _code,
            _userId,
            _weight,
            _packing,
            _flowering,
            _dateTime,
            _hivesId
        );
        drumsId[_batch].push(_id);
        serialNumber++;
        emit NewUnit(_userId, _id);
    }

    function getDrum(string memory _id) public view returns (Drum memory) {
        return drums[_id];
    }

    function getDrumBatchs(
        string memory _userId
    ) public view returns (string[] memory) {
        return drumsBatch[_userId];
    }

    function listDrums(
        string memory _batch
    ) public view returns (Drum[] memory) {
        Drum[] memory drum = new Drum[](drumsId[_batch].length);
        for (uint256 i = 0; i < drum.length; i++) {
            drum[i] = drums[drumsId[_batch][i]];
        }
        return drum;
    }

    function newPallet(
        string memory _userId,
        string memory _code,
        string[] memory _drumId
    ) public onlyOWNER(_userId) {
        string memory _id = string(
            abi.encodePacked(_code, uintToString(serialNumber))
        );
        require(bytes(pallets[_id].id).length == 0);
        pallets[_id] = Pallet(_id, _code, _drumId);
        palletsId[_userId].push(_id);
        serialNumber++;
        emit NewUnit(_userId, _id);
    }

    function getPallet(string memory _id) public view returns (Pallet memory) {
        return pallets[_id];
    }

    function getPalletsId(
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
