// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Authentication.sol";

struct Colmeia {
    uint256 colmeiaId;
    uint16 melProduzido;
    uint256 dateColeta;
}
struct Production {
    uint256 id;
    uint64 WeightTotal;
    uint256 date;
    string localization;
    string apicultorId;
    uint256[] colmeiasId;
}

struct Honey {
    uint256 codigo;
    uint256 lote;
    string especializacao;
    uint64 peso;
    uint256 data;
    string localizacao;
    uint256 producaoId;
}

contract RegistrarProducao {
    mapping(address => bool) OWNER;

    mapping(address => mapping(uint256 => Colmeia)) colmeias;
    uint256[] colmeiaId;

    mapping(address => mapping(uint256 => Production)) productionList;
    uint256[] productionListId;

    //LoteProduction[] public productionList;
    mapping(address => mapping(uint256 => Honey)) product;
    uint256[] productCode;

    // Eventos do contrato
    event Coleta(
        address indexed OWNER,
        Colmeia[] colmeias,
        uint256 indexed date
    );
    event Enxame(address OWNER, Colmeia colmeia, uint256 date);

    event Transfer(
        address indexed _sender,
        address indexed _recipient,
        uint256 produtionId,
        uint256 indexed lote,
        bytes signature
    );

    address contractAuthentication;
    Authentication instance;

    constructor(address _contract) {
        contractAuthentication = _contract;
        instance = Authentication(contractAuthentication);
    }

    // Verifica se o endereço que esta chamando o contrato possui permisao para modificar o estado da rede
    modifier onlyOWNER(string memory _id) {
        require(
            keccak256(abi.encodePacked(instance.getId(tx.origin))) ==
                keccak256(abi.encodePacked(_id)),
            "Permissao negada!"
        );
        _;
    }

    function updateColmeia(
        uint256 _colmeiaId,
        uint16 _melProduzido,
        string memory _userId
    ) public onlyOWNER(_userId) {
        require(
            colmeias[tx.origin][_colmeiaId].colmeiaId == 0,
            "Colmeia ja cadastrada"
        );

        colmeias[tx.origin][_colmeiaId] = Colmeia(
            _colmeiaId,
            _melProduzido,
            block.timestamp
        );

        colmeiaId.push(_colmeiaId);
    }

    function listColmeias() public view returns (Colmeia[] memory) {
        Colmeia[] memory colmeia = new Colmeia[](colmeiaId.length);
        for (uint256 i = 0; i < colmeiaId.length; i++) {
            colmeia[i] = colmeias[tx.origin][colmeiaId[i]];
        }
        return colmeia;
    }

    function getColmeiaById(uint256 _colmeiaId)
        public
        view
        returns (Colmeia memory)
    {
        return colmeias[tx.origin][_colmeiaId];
    }

    function registerProduction(
        uint256 _id,
        uint64 _peso,
        string memory _localizacao,
        string memory _apicultorId,
        uint256[] memory _colmeiasId
    ) public onlyOWNER(_apicultorId) {
        require(
            productionList[tx.origin][_id].id == 0,
            "Codigo do produto ja cadastrado"
        );
        Colmeia[] memory colmeia = new Colmeia[](_colmeiasId.length);
        for (uint256 i = 0; i < _colmeiasId.length; i++) {
            colmeia[i] = getColmeiaById(_colmeiasId[i]);
        }

        emit Coleta(tx.origin, colmeia, block.timestamp);

        productionList[tx.origin][_id] = Production(
            _id,
            _peso,
            block.timestamp,
            _localizacao,
            _apicultorId,
            _colmeiasId
        );
        productionListId.push(_id);
    }

    function listProduction() public view returns (Production[] memory) {
        Production[] memory production = new Production[](
            productionListId.length
        );
        for (uint256 i = 0; i < productionListId.length; i++) {
            production[i] = productionList[tx.origin][productionListId[i]];
        }
        return production;
    }

    // Retorna os dados de uma produção passando o ID.
    function getProductionById(uint256 _id)
        public
        view
        returns (Production memory)
    {
        return productionList[tx.origin][_id];
    }

    // Registrar uma unidade de prouto beneficiado
    function registerProduct(string memory _user, Honey memory _honey)
        public
        onlyOWNER(_user)
        returns (string calldata)
    {
        require(
            product[tx.origin][_honey.codigo].codigo == 0,
            "Codigo do produto ja cadastrado"
        );

        product[tx.origin][_honey.codigo] = Honey(
            _honey.codigo,
            _honey.codigo,
            _honey.especializacao,
            _honey.peso,
            block.timestamp,
            _honey.localizacao,
            _honey.producaoId
        );
        productCode.push(_honey.codigo);
        return string(msg.data);
    }

    function registerProduct2(Honey memory _honey, string memory _user)
        public
        onlyOWNER(_user)
    {
        require(
            product[tx.origin][_honey.codigo].codigo == 0,
            "Codigo do produto ja cadastrado"
        );

        product[tx.origin][_honey.codigo] = Honey(
            _honey.codigo,
            _honey.lote,
            _honey.especializacao,
            _honey.peso,
            block.timestamp,
            _honey.localizacao,
            _honey.producaoId
        );
        productCode.push(_honey.codigo);
    }

    // Registrar uma lista de produtos beneficiados e adicionar o lote do produto
    function registerProductList(Honey[] memory _honey, string memory _user)
        public
        returns (string memory)
    {
        for (uint256 i = 0; i < _honey.length; i++) {
            registerProduct2(_honey[i], _user);
        }

        return "Produtos registrados!";
    }

    // Lista toda a produção do produtor
    function listProduct() public view returns (Honey[] memory) {
        Honey[] memory honey = new Honey[](productCode.length);
        for (uint256 i = 0; i < productCode.length; i++) {
            honey[i] = product[tx.origin][productCode[i]];
        }
        return honey;
    }

    function listProductBatch(uint256 _batch)
        public
        view
        returns (Honey[] memory)
    {
        Honey[] memory honey = new Honey[](productCode.length);
        for (uint256 i = 0; i < productCode.length; i++) {
            if (product[tx.origin][productCode[i]].lote == _batch)
                honey[i] = product[tx.origin][productCode[i]];
        }
        return honey;
    }

    // Retorna um produto da lista passando o codigo do produto
    function getProductById(uint256 _codigo)
        public
        view
        returns (Honey memory)
    {
        return product[tx.origin][_codigo];
    }

    function addLote() public {}

    function transfer(
        address _recipient,
        uint256 _productionId,
        uint256 _lote,
        bytes memory _signature
    ) public {
        emit Transfer(tx.origin, _recipient, _productionId, _lote, _signature);
    }

    // Adiciona um address na lista de enderecos do produtor
    function addOWNER(address[] memory _address, string memory _user)
        public
        onlyOWNER(_user)
    {
        for (uint256 i = 0; i < _address.length; i++) {
            OWNER[_address[i]] = true;
        }
    }

    // Remove um address da lista de enderecos do produtor
    function remOWNER(address[] memory _address, string memory _user)
        public
        onlyOWNER(_user)
    {
        for (uint256 i = 0; i < _address.length; i++) {
            OWNER[_address[i]] = false;
        }
    }
}
