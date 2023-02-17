// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { IAxelarGasService } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import { AxelarExecutable } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import { StringToAddress, AddressToString } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/utils/AddressString.sol";
import { ICrossChainERC721 } from "./ICrossChainERC721.sol";

/// @title A Cross Chain implementation of ERC721 using Axelar Network
/// @author Ismael Bautista
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract CrossChainERC721 is ICrossChainERC721,AxelarExecutable, ERC721, ERC721Enumerable, ERC721URIStorage{    
    using StringToAddress for string;
    using AddressToString for address;
    string public chainName; //check if we are the source chain.
    string public minterChain = "moonbeam"; // Enable mints only from one chain to prevent duplicates
    IAxelarGasService public immutable gasReceiver;
    uint256 tokenIdCounter;

    event FalseSender(string sourceChain, string sourceAddress);    
    event CrossChainTransferReceived(address indexed receiver, uint256 indexed tokenId, string sourceChain);
    event CrossChainTransferSent(address indexed sender, uint256 indexed tokenId, string destinationChain, address indexed receiver);

    constructor(
        address gateway_,
        address gasReceiver_,
        string memory name_, 
        string memory symbol_,
        string memory chainName_
    ) AxelarExecutable(gateway_) ERC721(name_, symbol_) {
        gasReceiver = IAxelarGasService(gasReceiver_);
        chainName = chainName_;
    }    

    /// @notice Mints a token locally    
    /// @param to The token's receiver
    /// @param uri The ipfs uri where metadata is stored
    function mintNFT(address to, string memory uri) external {
        // only mint from minterChain
        require(keccak256(bytes(chainName)) == keccak256(bytes(minterChain)), "Can't mint from outside minter chain");
        // mint a new token
        uint tokenId = tokenIdCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId,uri);
        // increment the counter for the next token id
        tokenIdCounter++;
    }    


    /// @notice Mints a token on a remote chain    
    /// @dev Axelar transaction may get stuck if not enough msg.value has been paid to Axelar Gas Service
    /// @param destinationChain The destination chain where _execute will run.
    /// @param destinationAddress The token's receiver
    /// @param uri The ipfs uri where metadata is stored
    function mintRemote(
        string calldata destinationChain,
        address destinationAddress,
        string calldata uri
        //uint256 tokenId
    ) public payable override {
        // only remote mint from minterChain
        require(keccak256(bytes(chainName)) == keccak256(bytes(minterChain)), "Can't mint from outside minter chain");        
        // encode the address where the nft will be sent along its data
        uint tokenId = tokenIdCounter;
        bytes memory payload = abi.encode(destinationAddress, tokenId, uri);
        string memory stringAddress = address(this).toString();
        // pay gas to Axelar Gas Service before sending a message to the Axelar Relayer
        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{ value: msg.value }(
                address(this),
                destinationChain,
                stringAddress,
                payload,
                msg.sender
            );
        }
        // send a crosschain message usinG Axelar
        gateway.callContract(destinationChain, stringAddress, payload);
        tokenIdCounter++;
        emit CrossChainTransferSent(msg.sender, tokenId, destinationChain, destinationAddress);
    }

    /// @notice Transfers a token to a remote chain    
    /// @dev Axelar transaction may get stuck if not enough msg.value has been paid to Axelar Gas Service
    /// @param destinationChain The destination chain where _execute will run.
    /// @param destinationAddress The token's receiver
    /// @param tokenId The tokenId to be sent
    function transferRemote(
        string calldata destinationChain,
        address destinationAddress,
        uint256 tokenId
    ) public payable override {
        // get the tokenUri before burn the token        
        string memory uri = tokenURI(tokenId);
        _burn(tokenId);
        // encode the address where the nft will be sent along its data
        bytes memory payload = abi.encode(destinationAddress, tokenId, uri);
        string memory stringAddress = address(this).toString();
                // pay gas to Axelar Gas Service before sending a message to the Axelar Relayer
        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{ value: msg.value }(
                address(this),
                destinationChain,
                stringAddress,
                payload,
                msg.sender
            );
        }
        // send a crosschain message usinG Axelar
        gateway.callContract(destinationChain, stringAddress, payload);
        emit CrossChainTransferSent(msg.sender, tokenId, destinationChain, destinationAddress);
    }

    /// @notice executes a message sent from a remote chain    
    /// @dev Axelar transaction may get stuck if not enough msg.value has been paid to Axelar Gas Service
    /// @param sourceChain The chain where the message came from
    /// @param sourceAddress The contract address on the source chain that sent the message
    /// @param payload the data of the message
    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) internal override {
        if (sourceAddress.toAddress() != address(this)) {
            emit FalseSender(sourceAddress, sourceAddress);
            return;
        }
        (address to, uint256 tokenId, string memory uri) = abi.decode(payload, (address, uint256, string));
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit CrossChainTransferReceived(to, tokenId, sourceChain);
    }

    // The following functions are overrides required by OppenZeppelin ERC721 implementation.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

       function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, IERC165)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
