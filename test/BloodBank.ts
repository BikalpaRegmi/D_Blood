import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { BLOODBANK } from "../typechain-types";

describe("BloodBank", () => {
  let owner: Signer, addr1: Signer, addr2: Signer, contract: BLOODBANK;
  let transaction: any;

  const Id: string = Date.now().toString();
  const name: string = "Bikalpa";
  const bloodType: string = "B (+ve)";
  const dateOfBirth: string = "04-07-2006";
  const gender: string = "male";
  const medicalReport: string =
    "https://images.drlogy.com/assets/uploads/lab/image/cbc-test-report-format-example-sample-template-drlogy-lab-report.webp";

const emergencyContact: number = 9899999999;

  beforeEach(async () => {
    const contractFactory: any = await ethers.getContractFactory("BLOODBANK");
    [owner, addr1, addr2] = await ethers.getSigners();
    contract = await contractFactory.deploy();
    transaction = await contract.connect(addr1).LoginUser(Id, name, bloodType, dateOfBirth, gender, medicalReport , emergencyContact);
  });

   

 
  
  describe("Deployment",  () => {
    it("Should assign the right owner", async () => {
      expect(await contract.owner()).to.eq(owner);
    });

    it("Should assign right name", async () => {
      expect(await contract.name()).to.eq("Blood Bank")
    })
  });

  describe("Profile", () => {
    it("Should Emit CreateProfile", async () => {
      expect(transaction).to.emit(contract, "CreateProfile")
    });

    it("Should provide correct profile", async () => {
      const profile = await contract.profile(Id);

      expect(profile.id).to.eq(Id);
      expect(profile.name).to.eq(name);
      expect(profile.dateOfBirth).to.eq(dateOfBirth);
      expect(profile.bloodType).to.eq(bloodType);
      expect(profile.gender).to.eq(gender);
      expect(profile.medicalReport).to.eq(medicalReport);
      expect(profile.emergencyContact).to.eq(emergencyContact);
    })
  });

  describe("BuyBKS", () => {
    it("Should not let owner buy BKS", async () => {
      await (
        expect(
          contract.buyBks({ value: ethers.parseEther("0.003") })
        ).to.be.revertedWith("Owner Cant buy tokens")
      );
    });

    it("Should the transaction be exact 0.003eth", async () => {
      await (
        expect(contract.connect(addr1).buyBks({ value: ethers.parseEther("0.004") }))
      ).to.be.revertedWith("plz pay 0.003 eth");
    });

    it("Should increase the balance of buyer", async () => {
      const initialBalance = await contract.balances(addr2);

      await contract.connect(addr2).buyBks({ value: ethers.parseEther("0.003") });

      expect(await contract.balances(addr2)).to.eq(Number(initialBalance) + 100);
    })
  })

  describe("Requests", () => {
    const Id: string = Date.now.toString();
    const detail: string = "Hii i am suffering from deficiency of B +ve blood plz help me.";
    const image: string = "image.jpeg";
    
    beforeEach(async () => {
      await contract.connect(addr2).buyBks({ value: ethers.parseEther('0.003') });
      transaction = await contract.connect(addr2).CreateRequest(Id, detail, image);
      await transaction.wait();
    });
 
    it("Should the victim have more than 100 BKS", async () => {
      await expect(contract.connect(addr1).CreateRequest(Id, detail, image)).to.be.revertedWith("not enough BKS token");
    });

    it("Should emit if sucessfull", async () => {
      expect(transaction).to.emit(contract, "CreateRequestEvent");
    });

    it("Should add the request to allRequests", async () => {
      const request = await contract.allRequests(Id);
      expect(request.requestId).to.eq(Id);
      expect(request.details).to.eq(detail);
      expect(request.image).to.eq(image);
    });

    it("Should the store id to requestIds array", async () => {
      const requestId = await contract.requestIds(0);
      expect(requestId).to.eq(Id);
    });

    it("Should increase the requestCount of victim", async () => {
      expect(await contract.connect(addr2).myRequestsCount(addr2)).to.eq(1);
    });

    it("Should map all of my requests", async () => {
      const myRequest = await contract.connect(addr2).myRequests(addr2, 1);
      expect(myRequest.requestId).to.eq(Id);
      expect(myRequest.details).to.eq(detail);
      expect(myRequest.image).to.eq(image);

    });

  })
})