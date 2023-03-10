// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Authentication {
    struct User {
        address account;
        string name;
        bytes32 password;
        string cpf;
        string user;
        string town;
        string email;
    }

    mapping(address => User) users; // id => User

    //mapping(address => string) accounts; // account => id User
    //mapping(address => string) usersType; // account => tipo de usuario

    modifier onlyOWNER(address _account) {
        require(
            keccak256(abi.encodePacked(users[_account].account)) ==
                keccak256(abi.encodePacked(_account)),
            "Permissao negada! Verifique o seu endereco Ethereum"
        );
        _;
    }

    function registerUser(
        address _account,
        string memory _name,
        string memory _password,
        string memory _cpf,
        string memory _user,
        string memory _town,
        string memory _email
    ) public returns (string memory) {
        require(
            keccak256(abi.encodePacked(users[_account].account)) ==
                keccak256(
                    abi.encodePacked(0x0000000000000000000000000000000000000000)
                ),
            "Produtor ja cadastrado"
        );

        bytes32 passwd = keccak256(abi.encodePacked(_name, _password));

        users[_account] = User(
            _account,
            _name,
            passwd,
            _cpf,
            _user,
            _town,
            _email
        );
        //accounts[tx.origin] = _id;
        return string(abi.encodePacked(users[_account].account));
    }

    function getId(address _account) public view returns (address) {
        return users[_account].account;
    }

    function getUser(address _account) public view returns (User memory) {
        require(
            keccak256(abi.encodePacked(users[_account].account)) ==
                keccak256(abi.encodePacked(_account))
        );
        return users[_account];
    }

    function login(
        string memory _name,
        string memory _password,
        address _account
    ) public view returns (User memory _user) {
        require(
            keccak256(abi.encodePacked(_name, _password)) ==
                users[_account].password,
            "Usuario ou senha incorretos"
        );
        return _user = users[_account];
    }
}
