const Test = artifacts.require("Test");   //Contract Name
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("Test Contract Testing", async (accounts) => {
    let myTest;
    beforeEach(async () => {
        myTest = await Test.new();
    })

		describe("Test Contract Test cases ::", () => {
        it('Should NOT accept fund if not lender', async () => {
        });
    })
})