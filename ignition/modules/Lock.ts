import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";

const BLOODBANK = buildModule("BloodbBankModule", (m) => {
  const toDeploy = m.contract("BLOODBANK");

  return { toDeploy };
});

export default BLOODBANK;