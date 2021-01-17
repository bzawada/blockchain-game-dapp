const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
    let token

    before(async () => {
      token = await MemoryToken.deployed()
    })

    describe('deployement', async () => {
      it('deploys successfully',  async () => {
          const address = token.address
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
      })

      it('it has a name',  async () => {
          const name = await token.name()
          assert.equal(name, "Memory token");
      })

      it('it has a symbol',  async () => {
          const symbol = await token.symbol()
          assert.equal(symbol, "MEMORY");
      })
    })

    describe('token distribution', async () => {
        let result

        it('mints token',  async () => {
            await token.mint(accounts[0], 'http://example.com')
            result = await token.totalSupply()
            assert.equal(result, '1', "total supply is correct");

            result = await token.balanceOf(accounts[0])
            assert.equal(result.toString(), '1', "account balance is correct");

            result = await token.ownerOf('1')
            assert.equal(result.toString(), accounts[0].toString(), 'ownerOf is correct');
            result = await token.tokenOfOwnerByIndex(accounts[0], 0);

            let balanceOf = await token.balanceOf(accounts[0])
            let tokenIds = []

            for(let i = 0; i < balanceOf; i++) {
                let id = await token.tokenOfOwnerByIndex(accounts[0], 0)
                tokenIds.push(id.toString())
            }

            let expected = ['1']
            assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds are correct');

            let tokenURI = await token.tokenURI('1')
            assert.equal(tokenURI, 'http://example.com')
        })

        it('burn token',  async () => {
            await token.mint(accounts[0], 'http://example.com')

            await token.burnAll(accounts[0])
            result = await token.totalSupply()
            assert.equal(result.toString(), '0', "total supply is correct");

            result = await token.balanceOf(accounts[0])
            assert.equal(result.toString(), '0', "account balance is correct");
        })
    })
})
