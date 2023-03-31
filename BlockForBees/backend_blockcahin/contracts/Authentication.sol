// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Authentication {
    struct Productor {
        address addr;
        string name;
        bytes32 password;
        string town;
        string apiary;
        string email;
    }

    struct Processor {
        address addr;
        string name;
        bytes32 password;
        string establishment;
        string certification;
    }

    struct Distributor {
        address addr;
        string name;
        bytes32 password;
    }

    struct Merchant {
        address addr;
        string name;
        bytes32 password;
        string stablishment;
    }

    mapping(address => Productor) productors; // id => User
    mapping(address => Processor) processors; // id => User
    mapping(address => Distributor) distributors; // id => User
    mapping(address => Merchant) merchants; // id => User

    mapping(address => bool) public users; // usuarios ativos com permissao de modificaçao
    mapping(address => string) typeUsers; // id => tipo de usuario

    //mapping(address => string) accounts; // account => id User
    //mapping(address => string) usersType; // account => tipo de usuario

    modifier onlyOWNER(address _addr) {
        require(users[_addr] == true, "Permissao negada!");
        _;
    }

    function register(
        string memory _type,
        address _addr,
        string memory _name,
        string memory _password,
        string memory _town,
        string memory _apiary,
        string memory _email,
        string memory _stablishment,
        string memory _certification
    ) public returns (string memory) {
        // Registrar o produtor
        if (
            keccak256(abi.encodePacked(_type)) ==
            keccak256(abi.encodePacked("productor"))
        ) {
            require(
                productors[_addr].addr ==
                    0x0000000000000000000000000000000000000000,
                "Produtor ja cadastrado"
            );
            bytes32 passwd = keccak256(abi.encodePacked(_addr, _password));
            productors[_addr] = Productor(
                _addr,
                _name,
                passwd,
                _town,
                _apiary,
                _email
            );
            users[_addr] = true;
            typeUsers[_addr] = _type;
            return string(abi.encodePacked(productors[_addr].addr));

            // Registrar o processador
        } else if (
            keccak256(abi.encodePacked(_type)) ==
            keccak256(abi.encodePacked("processor"))
        ) {
            require(
                processors[_addr].addr ==
                    0x0000000000000000000000000000000000000000,
                "Processador ja cadastrado"
            );
            bytes32 passwd = keccak256(abi.encodePacked(_addr, _password));
            processors[_addr] = Processor(
                _addr,
                _name,
                passwd,
                _stablishment,
                _certification
            );
            users[_addr] = true;
            typeUsers[_addr] = _type;
            return string(abi.encodePacked(processors[_addr].addr));

            // Registrar o distribuidor
        } else if (
            keccak256(abi.encodePacked(_type)) ==
            keccak256(abi.encodePacked("distributor"))
        ) {
            require(
                distributors[_addr].addr ==
                    0x0000000000000000000000000000000000000000,
                "Distribuidor ja cadastrado"
            );
            bytes32 passwd = keccak256(abi.encodePacked(_addr, _password));
            distributors[_addr] = Distributor(_addr, _name, passwd);
            users[_addr] = true;
            typeUsers[_addr] = _type;
            return string(abi.encodePacked(processors[_addr].addr));
        } else if (
            keccak256(abi.encodePacked(_type)) ==
            keccak256(abi.encodePacked("merchant"))
        ) {
            require(
                merchants[_addr].addr ==
                    0x0000000000000000000000000000000000000000,
                "Comerciante ja cadastrado"
            );
            bytes32 passwd = keccak256(abi.encodePacked(_addr, _password));
            merchants[_addr] = Merchant(_addr, _name, passwd, _stablishment);
            users[_addr] = true;
            typeUsers[_addr] = _type;
            return string(abi.encodePacked(merchants[_addr].addr));
        } else {
            return "Erro no cadastro!";
        }
    }

    function listProductor() public view returns (Productor memory) {
        return productors[msg.sender];
    }

    function listTypeUsers() public view returns (string memory) {
        return typeUsers[msg.sender];
    }

    function activeUser(address _addr) public view returns (bool) {
        return users[_addr];
    }

    // function getUser(
    //     string memory _id,
    //     string memory _type
    // ) public view returns (Productor memory, Processor memory) {
    //     require(
    //         keccak256(abi.encodePacked(users[_account].account)) ==
    //             keccak256(abi.encodePacked(_account))
    //     );
    //     return users[_account];
    // }

    // function login(
    //     string memory _name,
    //     string memory _password
    // ) public view returns () {
    //     require(
    //         keccak256(abi.encodePacked(_name, _password)) ==
    //             productors[_name].password,
    //         "Usuario ou senha incorretos"
    //     );
    //     return productors[_name];
    // }

    function getTypeUser(address _addr) public view returns (string memory) {
        return typeUsers[_addr];
    }

    function loginProductor(
        address _addr,
        string memory _password
    ) public view returns (Productor memory) {
        require(
            keccak256(abi.encodePacked(_addr, _password)) ==
                productors[_addr].password,
            "Usuario ou senha incorreto."
        );

        return productors[_addr];
    }

    function loginProcessor(
        address _account,
        string memory _password
    ) public view returns (Processor memory) {
        require(
            keccak256(abi.encodePacked(_account, _password)) ==
                processors[_account].password,
            "Usuario ou senha incorreto."
        );

        return processors[_account];
    }

    function loginDistributor(
        address _account,
        string memory _password
    ) public view returns (Distributor memory) {
        require(
            keccak256(abi.encodePacked(_account, _password)) ==
                distributors[_account].password,
            "Usuario ou senha incorreto."
        );

        return distributors[_account];
    }

    function loginMerchant(
        address _account,
        string memory _password
    ) public view returns (Merchant memory) {
        require(
            keccak256(abi.encodePacked(_account, _password)) ==
                merchants[_account].password,
            "Usuario ou senha incorreto."
        );

        return merchants[_account];
    }
}
