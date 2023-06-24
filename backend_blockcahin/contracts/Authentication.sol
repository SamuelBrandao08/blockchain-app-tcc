// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
enum UnitType {
    unidade,
    caixa,
    palete
}
struct User {
    address addr;
    string id;
    string name;
    string email;
    string certification;
    string company;
    string role;
}

contract Authentication {
    mapping(string => User) users; // id => User
    string[] usersId;
    mapping(bytes32 => string) login; // password => id user
    mapping(string => bool) status; // id => boolean. Usuarios ativos com permissao de modificaçao

    modifier onlyOWNER(string memory _id) {
        require(status[_id], "Permissao negada!");
        _;
    }

    function register(
        User memory _user,
        string memory _password
    ) public returns (bool) {
        // Registrar o produtor
        //string memory _id = generateId(_addr, _name, password, _date);
        bytes32 password = keccak256(abi.encodePacked(_user.email, _password));
        uint hashDigits = 8;
        uint hashModulus = 10 ** hashDigits;
        uint _hash = uint(
            keccak256(
                abi.encodePacked(
                    _user.addr,
                    _user.name,
                    _user.email,
                    block.timestamp
                )
            )
        );

        string memory _id = uintToString(_hash % hashModulus);

        users[_id] = User(
            _user.addr,
            _id,
            _user.name,
            _user.email,
            _user.certification,
            _user.company,
            _user.role
        );
        login[password] = _id;
        status[_id] = true;
        return true;
    }

    function getUser(string memory _id) public view returns (User memory) {
        return users[_id];
    }

    function getProducers() public view returns (User[] memory) {
        User[] memory userArray = new User[](usersId.length);
        for (uint256 i = 0; i < userArray.length; i++) {
            if (
                keccak256(abi.encodePacked(users[usersId[i]].role)) ==
                keccak256(abi.encodePacked("produtor"))
            ) {
                userArray[i] = users[usersId[i]];
            }
        }
        return userArray;
    }

    function activeUser(string memory _id) public view returns (bool) {
        return status[_id];
    }

    function removeUser(
        string memory _id
    ) public onlyOWNER(_id) returns (string memory) {
        status[_id] = false;
        return "Usuario removido";
    }

    function logon(
        string memory _user,
        string memory _password
    ) public view returns (User memory, bool) {
        bytes32 password = keccak256(abi.encodePacked(_user, _password));
        string memory id = login[password];
        require(status[id], "Falha no login!");
        return (users[id], true);
    }

    function verifyPassword(
        string memory _user,
        string memory _password
    ) public view returns (bool) {
        bytes32 password = keccak256(abi.encodePacked(_user, _password));
        if (
            keccak256(abi.encodePacked(login[password])) ==
            keccak256(abi.encodePacked(""))
        ) {
            return true;
        } else {
            return false;
        }
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
    // function generateId(
    //     address _addr,
    //     string memory _name,
    //     bytes32 _password,
    //     string memory _date
    // ) internal view returns (string memory) {
    //     uint hashDigits = 6;
    //     uint hashModulus = 10 ** hashDigits;
    //     uint random = uint(
    //         keccak256(
    //             abi.encodePacked(_addr, _name, _password, block.timestamp)
    //         )
    //     );
    //     uint result = random % hashModulus;
    //     string memory resultString = uintToString(result);

    //     return string(abi.encodePacked(resultString, _date));
    // }
}
