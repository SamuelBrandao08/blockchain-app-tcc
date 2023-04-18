// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract UpdateTr {
    mapping(bytes32 => address) transactions;

    event Transfer(
        address indexed sender,
        address indexed recipient,
        bytes32 indexed unitId,
        string date,
        string businessUnitType,
        bytes signature
    );

    function updateTr(
        address _sender,
        address _receiver,
        bytes32 _unitId,
        string memory _date,
        string memory _businessUnitType,
        bytes memory _signature
    ) public {
        transactions[_unitId] = _sender;
        emit Transfer(
            _sender,
            _receiver,
            _unitId,
            _date,
            _businessUnitType,
            _signature
        );
    }

    // function rastrearTr(bytes32 _lote) public view returns (address) {
    //     return transactions[_lote];
    // }
}
