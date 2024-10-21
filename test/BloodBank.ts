import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { BLOODBANK } from "../typechain-types";

describe("BloodBank", () => {
  let owner: Signer, addr1: Signer, addr2: Signer, contract: BLOODBANK;
  let transaction: any;
  
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
    transaction = await contract.connect(addr1).LoginUser( name, bloodType, dateOfBirth, gender, medicalReport , emergencyContact);
  });
  
 
  
  describe("Deployment",  () => {
    it("Should assign the right owner", async () => {
      expect(await contract.owner()).to.eq(owner);
    });

    it("Should assign right name", async () => {
      expect(await contract.name()).to.eq("D Blood")
    })
  });

  describe("Profile", () => {
    it("Should Emit CreateProfile", async () => {
      expect(transaction).to.emit(contract, "CreateProfile")
    });

    it("Should provide correct profile", async () => {
      const profile: any = await contract.profile(addr1);

      expect(profile.id).to.eq(addr1);
      expect(profile.name).to.eq(name);
      expect(profile.dateOfBirth).to.eq(dateOfBirth);
      expect(profile.bloodType).to.eq(bloodType);
      expect(profile.gender).to.eq(gender);
      expect(profile.medicalReport).to.eq(medicalReport);
      expect(profile.emergencyContact).to.eq(emergencyContact);
    });

    it("Should edit the profiles", async () => {
      const changedGender = "Female"
      await contract.connect(addr1).EditMyProfile("", "", "",changedGender , "", 0);
      const profile = await contract.profile(addr1);
      expect(profile.name).to.eq(name);
      expect(profile.gender).to.eq(changedGender);
    })
  });

  describe("BKS", () => {
    it("Should not let owner buy BKS", async () => {
      await (
        expect(
          contract.buyBks({ value: ethers.parseEther("0.003") })
        ).to.be.revertedWith("Owner Cant buy tokens")
      );
    });

    it("Should the transaction be exact 0.001eth or 0.002eth", async () => {
      await(
        expect(
          contract.connect(addr1).buyBks({ value: ethers.parseEther("0.004") })
        )
      ).to.be.revertedWith("You should pay 0.001 eth or 0.002 eth to buy BKS");
    });

    it("Should increase the balance of buyer", async () => {
      const initialBalance = await contract.balances(addr2);

      await contract.connect(addr2).buyBks({ value: ethers.parseEther("0.002") });
      await contract.connect(addr1).buyBks({ value: ethers.parseEther("0.001") });

      expect(await contract.balances(addr2)).to.eq(Number(initialBalance) + 100);
      expect(await contract.balances(addr1)).to.eq(Number(initialBalance) + 50);
    });

    it("Should withdraw", async () => {
            await contract
              .connect(addr2)
              .buyBks({ value: ethers.parseEther("0.002") });
      const balanceBefore = await ethers.provider.getBalance(addr2);
      await contract.connect(addr2).withdraw();
            const balanceAfter = await ethers.provider.getBalance(addr2);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    })
  });

  describe("Requests", () => {
    const Id: string = Date.now.toString();
    const detail: string = "Hii i am suffering from deficiency of B +ve blood plz help me.";
    const image: string = "image.jpeg";
    
    beforeEach(async () => {
      await contract.connect(addr2).buyBks({ value: ethers.parseEther('0.002') });
      transaction = await contract.connect(addr2).CreateRequest(Id, detail, image);
      await transaction.wait();
    });

    it("Should know who send the request", async () => {
      const request = await contract.allRequests(Id);
      expect(request.requestor).to.eq(addr2);
    })
 
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

    it("Should show my requests", async () => {
      const myRequest = await contract.connect(addr2).myRequests(addr2, 1);
      expect(myRequest.requestId).to.eq(Id);
      expect(myRequest.details).to.eq(detail);
      expect(myRequest.image).to.eq(image);
    });

    it("Should map all the requests created", async () => {
      const res = await contract.getAllRequests();
      expect(res[0].requestId).to.eq(Id);
      expect(res[0].details).to.eq(detail);
      expect(res[0].image).to.eq(image);
    });

    it("Should map all of my requests", async () => {
      const res = await contract.connect(addr2).getAllMyRequests();
      expect(res[0].requestId).to.eq(Id);
      expect(res[0].details).to.eq(detail);
      expect(res[0].image).to.eq(image);
    });

    it("Should revert if there is no request by an account", async () => {
      const res = contract.connect(addr1).getAllMyRequests();
      await expect(res).to.be.revertedWith("You have no Requests till now");
    });

    describe("comments",  () => {
      it("Should revert if there is no request existing", async () => {
        const length = contract.addComment("999", "hi");
        expect(length).to.be.revertedWith("The Request Doesn't Exists");
      });

     it("Should push the address and comment", async () => {
       await contract.connect(addr1).addComment(Id, "i will help");

       const comment:any = await contract.getComments(Id);

       expect(comment[0].commentator).to.eq(await addr1.getAddress());
       expect(comment[0].text).to.eq("i will help");
     });
      
      it("Should remove the comment", async () => {
        await contract.connect(addr1).addComment(Id, "i am addr1 i will help");
        await contract.connect(addr2).addComment(Id, "i am addr2 i will help");
        await contract.connect(owner).addComment(Id, "i am owner i will help");
        
        await contract.connect(owner).removeComment(Id);

        const comment:any = await contract.getComments(Id);

        expect(comment.length).to.eq(2);
        expect(comment[0].text).to.eq("i am addr1 i will help");
        expect(comment[1].text).to.eq("i am addr2 i will help");
      });

      it("Should revert if not commented", async () => {
        await expect(contract.removeComment(Id)).to.be.revertedWith(
          "Your comment doesn't exist"
        );
      })
      it("Should get all the comments", async () => {
                await contract
                  .connect(addr1)
                  .addComment(Id, "i am addr1 i will help");
                await contract
                  .connect(addr2)
                  .addComment(Id, "i am addr2 i will help");

        const comments = await contract.getComments(Id);
        expect(comments[0].text).to.eq("i am addr1 i will help");
        expect(comments[1].commentator).to.eq(addr2);
      })

  })

  });

  describe("Notifications", () => {
    beforeEach(async () => {
      await contract.connect(addr1).EditMyProfile("", "B -ve", '', '', '', 0);
      await contract.CreateRequest(Date.now().toString(), "Hi i need blood", "img");
      await contract
        .connect(addr2)
        .buyBks({ value: ethers.parseEther("0.002") });
      await contract.connect(addr2).transferBKS(addr1, 50);
      await contract.connect(addr1).withdraw();
    });

    it("Should notify if created request", async () => {
      expect(await contract.notifications(addr1, 1)).to.eq(
        "Changed BloodType to B -ve Sucessfully"
      );
    });

    it("Should notify if bought BKS", async () => {
      expect(await contract.notifications(owner, 1)).to.eq(
        "Created a request Sucessfully"
      );
    });

    it("Should notify if bought BKS", async () => {
      expect(await contract.notifications(addr2, 1)).to.eq("Bought 100BKS sucessfully");
    })

    it("Should notify if transferred BKS", async () => {
      expect(await contract.notifications(addr2, 2)).to.eq(
        `Transferred ${50} BKS to Bikalpa`
      );
    });

    it("Should notify if received BKS", async () => {
      expect(await contract.notifications(addr1, 2)).to.eq(
        `Received ${50} BKS From `
      );
    });

    it("Should notify if wthdrawen", async () => {
      expect(await contract.notifications(addr1, 3)).to.eq(
        `WithDrawed 1000000000000000 eth Sucessfully`
      );
    })
    it("Should get all notifications when called", async () => {
      const allNotify = await contract.connect(addr1).getAllNotification();
      expect(allNotify.length).to.eq(3);
      expect(allNotify[2]).to.eq(`Received ${50} BKS From `);
   })

  });

  
})