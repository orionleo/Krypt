//https://eth-goerli.g.alchemy.com/v2/vUTRmxiV9OUfjONrB62-gysiYTT3BEcx

require ('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/vUTRmxiV9OUfjONrB62-gysiYTT3BEcx',
      accounts:['ce66f8054b7e3b6af9f47451d42319d72481f52128a2712bac53f2431a390ce6']
    }
  }
}