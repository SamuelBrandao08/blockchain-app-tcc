// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract UpdateTr {
    mapping(string => string) transactions;

    event Transfer(
        string indexed sender,
        string indexed receiver,
        string indexed unitId,
        string date,
        string businessUnitType,
        bytes signature
    );

    function updateTr(
        string memory _sender,
        string memory _receiver,
        string memory _unitId,
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
