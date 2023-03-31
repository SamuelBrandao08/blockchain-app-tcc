// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Authentication.sol";
import "./UpdateTr.sol";

struct Feedstock {
    bytes32 id;
    string idFeedstock;
    string fornecedor;
    string data;
}

struct Honey {
    bytes32 codigo;
    string lote;
    string especializacao;
    uint64 peso;
    string data;
    //uint256 producaoId;
}

struct Container {
    bytes32 codigo;
    bytes32[] codigoHoney;
}

contract Processing {
    // Variaveis de estado
    mapping(address => mapping(bytes32 => Feedstock)) public feedstocks; // codigo => carregamento. lista de materia prima recebida.
    mapping(address => mapping(bytes32 => Honey)) public honeys; // codigo => Honey. Lista de produtos fabricados.
    mapping(address => mapping(bytes32 => Container)) public container;

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

    function regiterFeedstock(
        string memory _idFeedstock,
        string memory _fornecedor,
        string memory _data,
        address _addr
    ) public onlyOWNER(_addr) {
        bytes32 _id = keccak256(
            abi.encodePacked(_idFeedstock, _fornecedor, _data)
        );
        feedstocks[_addr][_id] = Feedstock(
            _id,
            _idFeedstock,
            _fornecedor,
            _data
        );
    }

    function newHoney(
        string memory _lote,
        string memory _especializacao,
        uint64 _peso,
        string memory _data,
        address _addr
    ) public onlyOWNER(_addr) {
        bytes32 _codigo = keccak256(
            abi.encodePacked(_lote, _especializacao, _peso, _data)
        );
        honeys[_addr][_codigo] = Honey(
            _codigo,
            _lote,
            _especializacao,
            _peso,
            _data
        );
    }

    function newContainer(
        bytes32[] memory _codigoHoney,
        address _addr
    ) public onlyOWNER(_addr) {
        bytes32 _codigo = keccak256(abi.encodePacked(_codigoHoney));
        container[_addr][_codigo] = Container(_codigo, _codigoHoney);
    }

    function forwarding(
        address _sender,
        address _recipient,
        bytes32 _product,
        bytes32 _lote,
        bytes memory _signature
    ) public onlyOWNER(msg.sender) {
        //chamar funcao atualizarTr no contrato AtualizarTr
        instanceUpdateTr.atualizarTr(
            _sender,
            _recipient,
            _product,
            _lote,
            _signature
        );
    }
}
