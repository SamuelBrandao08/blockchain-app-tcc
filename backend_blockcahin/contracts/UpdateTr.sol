// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./Authentication.sol";

struct Transaction {
    string previousTx;
    string currentTx;
    string sender;
    string receiver;
    string unit;
    string date;
}

enum Status {
    despachado,
    transporte,
    recebido
}

contract UpdateTr {
    mapping(string => Transaction[]) transactions; // item id => list transaction
    mapping(string => string[]) userTransactions; // sender => item id []

    address contractAuthentication;
    Authentication instanceAuthentication;

    constructor(address _contractAuthentication) {
        contractAuthentication = _contractAuthentication;
        instanceAuthentication = Authentication(contractAuthentication);
    }

    modifier onlyOWNER(string memory _id) {
        require(
            instanceAuthentication.activeUser(_id) == true,
            "Permissao negada!"
        );
        _;
    }

    // event Transfer(
    //     string previousTx,
    //     string currentTx,
    //     string sender,
    //     string receiver,
    //     string unit,
    //     string date
    // );

    function updateTr(
        string memory _currentTx,
        string memory _sender,
        string memory _receiver,
        string memory _unit,
        string memory _date
    ) public onlyOWNER(_sender) {
        string memory previousTx;
        if (transactions[_unit].length == 0) {
            previousTx = _unit;
        } else {
            Transaction memory tr = transactions[_unit][
                transactions[_unit].length - 1
            ];
            require(
                keccak256(abi.encodePacked(_receiver)) ==
                    keccak256(abi.encodePacked(tr.receiver)) ||
                    keccak256(abi.encodePacked(_sender)) ==
                    keccak256(abi.encodePacked(tr.receiver)),
                "Transacao Inconcistente!"
            );
            previousTx = tr.currentTx;
        }
        transactions[_unit].push(
            Transaction(
                previousTx,
                _currentTx,
                _sender,
                _receiver,
                _unit,
                _date
            )
        );
        userTransactions[_sender].push(_unit);
        //emit Transfer(previousTx, _currentTx, _sender, _receiver, _unit, _date);
    }

    function search(
        string memory _unit
    ) public view returns (Transaction[] memory) {
        return transactions[_unit];
    }

    function searchByUser(
        string memory _user
    ) public view returns (string[] memory) {
        return userTransactions[_user];
    }
}
