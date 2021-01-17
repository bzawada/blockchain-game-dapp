pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract MemoryToken is ERC721Full {
  constructor() ERC721Full("Memory token", "MEMORY") public {
  }

  function mint(address _to, string memory _tokenURI) public returns(bool) {
    uint tokenId = totalSupply().add(1);
    _mint(_to, tokenId);
    _setTokenURI(tokenId, _tokenURI);

    return true;
  }

  function burnAll(address owner) public returns(bool) {
    uint tokenQuantity = totalSupply();
    uint tokenId;
    for (tokenId = 1; tokenId <= tokenQuantity; tokenId++) {
      _burn(owner, tokenId);
    }

    return true;
  }
}
