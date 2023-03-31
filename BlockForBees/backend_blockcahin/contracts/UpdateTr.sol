// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract UpdateTr {
    mapping(bytes32 => address) transactions;
    uint256 countTr;

    event Transfer(
        address indexed _sender,
        address indexed _recipient,
        bytes32 produtionId,
        bytes32 indexed lote,
        bytes signature
    );

    function atualizarTr(
        address _sender,
        address _recipient,
        bytes32 _produtionId,
        bytes32 _lote,
        bytes memory _signature
    ) public {
        transactions[_lote] = tx.origin;
        emit Transfer(_sender, _recipient, _produtionId, _lote, _signature);
    }

    function rastrearTr(bytes32 _lote) public view returns (address) {
        return transactions[_lote];
    }
}
