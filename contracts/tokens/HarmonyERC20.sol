// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import '@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol';

contract HarmonyERC20 is ERC20PresetMinterPauser {
    /**
     * @dev Sets the values for {name} and {symbol}, {decimals} have
     * a default value of 18.
     * @notice token name: DSLA , token symbol: DSLA
     */
    constructor(string memory name, string memory symbol)
        public
        ERC20PresetMinterPauser(name, symbol)
    {
        mint(msg.sender, 10**27);
    }
}
