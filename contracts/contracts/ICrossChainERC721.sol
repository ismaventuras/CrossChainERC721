// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface ICrossChainERC721 is IERC721 {
    function mintRemote(
        string calldata destinationChain,
        address destinationAddress,
        string calldata uri
    ) external payable;
    
    function transferRemote(
        string calldata destinationChain,
        address destinationAddress,
        uint256 tokenId
    ) external payable;
}
