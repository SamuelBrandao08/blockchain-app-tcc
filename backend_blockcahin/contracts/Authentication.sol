// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

struct Company {
    string name;
    string street;
    string city;
    string country;
}

struct User {
    address addr;
    string id;
    string name;
    string certification;
    Company company;
    string role;
}

contract Authentication {
    uint count;
    mapping(string => User) users; // id => User
    mapping(bytes32 => string) login; // password => id user
    mapping(string => bool) status; // id => boolean. Usuarios ativos com permissao de modificaçao

    modifier onlyOWNER(string memory _id) {
        require(status[_id], "Permissao negada!");
        _;
    }

    function register(
        User memory _user,
        string memory _login,
        string memory _password
    ) public returns (bool) {
        // Registrar o produtor
        //string memory _id = generateId(_addr, _name, password, _date);
        bytes32 password = keccak256(abi.encodePacked(_login, _password));
        users[_user.id] = User(
            _user.addr,
            _user.id,
            _user.name,
            _user.certification,
            Company(
                _user.company.name,
                _user.company.street,
                _user.company.city,
                _user.company.country
            ),
            _user.role
        );
        login[password] = _user.id;
        status[_user.id] = true;
        return true;
    }

    function getUser(string memory _id) public view returns (User memory) {
        return users[_id];
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

// function uintToString(uint v) internal pure returns (string memory str) {
//     uint maxlength = 100;
//     bytes memory reversed = new bytes(maxlength);
//     uint i = 0;
//     while (v != 0) {
//         uint remainder = v % 10;
//         v = v / 10;
//         reversed[i++] = bytes1(uint8(48 + remainder));
//     }
//     bytes memory s = new bytes(i);
//     for (uint j = 0; j < i; j++) {
//         s[j] = reversed[i - 1 - j];
//     }
//     return str = string(s);
// }
