
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1000,
    },
    mumbai : {
      url : "https://polygon-mumbai.g.alchemy.com/v2/mX1Ki53hXUDMijd26ZSxenbNW2wInBWP",
      accounts: [`${process.env.private_key}`],
    }
  },
};


/*
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1000,
    },
    mumbai : {
      url : "https://polygon-mumbai.g.alchemy.com/v2/mX1Ki53hXUDMijd26ZSxenbNW2wInBWP",
      accounts: [`${process.env.private_key}`],
    }
  }
};
*/

//export default config;
