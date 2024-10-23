import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BLOODBANK = buildModule("BloodBankmodule" , (m) => {
  const bloodbank = m.contract("BLOODBANK");
  return {bloodbank};
})

export default BLOODBANK;