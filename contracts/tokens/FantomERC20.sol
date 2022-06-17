// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FantomERC20 is ERC20 {
    // keeping it for checking, whether deposit being called by valid address or not
    address deployer;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        deployer = msg.sender;

        _mint(msg.sender, 10**27);
    }

    // being proxified smart contract, most probably childChainManagerProxy contract's address
    // is not going to change ever, but still, lets keep it
    //    function updateChildChainManager(address newChildChainManagerProxy)
    //        external
    //    {
    //        require(
    //            newChildChainManagerProxy != address(0),
    //            'Bad ChildChainManagerProxy address'
    //        );
    //        require(msg.sender == deployer, "You're not allowed");
    //
    //        childChainManagerProxy = newChildChainManagerProxy;
    //    }

    //    function deposit(address user, bytes calldata depositData) external {
    //        require(
    //            msg.sender == childChainManagerProxy,
    //            "You're not allowed to deposit"
    //        );
    //
    //        uint256 amount = abi.decode(depositData, (uint256));
    //
    //        // `amount` token getting minted here & equal amount got locked in RootChainManager
    //        totalSupply = totalSupply.add(amount);
    //        _balances[user] = _balances[user].add(amount);
    //
    //        emit Transfer(address(0), user, amount);
    //    }
    //
    //    function withdraw(uint256 amount) external {
    //        _balances[msg.sender] = _balances[msg.sender].sub(
    //            amount,
    //            'ERC20: burn amount exceeds balance'
    //        );
    //        totalSupply = totalSupply.sub(amount);
    //
    //        emit Transfer(msg.sender, address(0), amount);
    //    }
}
