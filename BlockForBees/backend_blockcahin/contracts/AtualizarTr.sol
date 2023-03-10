// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract AtualizarTr {
    mapping(uint256 => address) transactions;
    uint256 countTr;

    event Transfer(
        address indexed _sender,
        address indexed _recipient,
        uint256 produtionId,
        uint256 indexed lote,
        bytes signature
    );

    function atualizarTr(
        address _recipient,
        uint256 _produtionId,
        uint256 _lote,
        bytes memory _signature
    ) public {
        transactions[_lote] = tx.origin;
        emit Transfer(tx.origin, _recipient, _produtionId, _lote, _signature);
    }

    function rastrearTr(uint256 _lote) public view returns (address) {
        return transactions[_lote];
    }
}
