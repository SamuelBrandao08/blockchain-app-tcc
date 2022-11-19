// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Authentication {
    struct User {
        string id;
        string name;
        string cpf;
        string user;
        string town;
        string email;
    }

    mapping(string => User) users; // id => User
    mapping(address => string) accounts; // account => id User

    modifier onlyOWNER(string memory _id) {
        require(
            keccak256(abi.encodePacked(accounts[tx.origin])) ==
                keccak256(abi.encodePacked(_id)),
            "Permissao negada! Verifique o seu endereco Ethereum"
        );
        _;
    }

    function registerUser(
        string memory _id,
        string memory _name,
        string memory _cpf,
        string memory _user,
        string memory _town,
        string memory _email
    ) public returns (string calldata) {
        require(
            keccak256(abi.encodePacked(accounts[tx.origin])) == keccak256(""),
            "Produtor ja cadastrado"
        );

        users[_id] = User(_id, _name, _cpf, _user, _town, _email);

        accounts[tx.origin] = _id;
        return string(msg.data);
    }

    function getId(address _account) public view returns (string memory) {
        return accounts[_account];
    }

    function getUser(string memory _id) public view returns (User memory) {
        require(
            keccak256(abi.encodePacked(accounts[tx.origin])) ==
                keccak256(abi.encodePacked(_id))
        );
        return users[_id];
    }

    function addAccount(address _address, string memory _id)
        public
        onlyOWNER(_id)
    {
        accounts[_address] = _id;
    }

    // Remove um address da lista de enderecos do produtor
    function remAccount(address _address, string memory _id)
        public
        onlyOWNER(_id)
    {
        delete (accounts[_address]);
    }
}
