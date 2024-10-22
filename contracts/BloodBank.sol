// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract BLOODBANK {
        using Strings for uint256;

    string public name ;
    address public owner ;
    string public tokenName = "BKS";
    uint totalBKSSupply = 1000000 ;

    struct LoginDetails{
        address id ;
       string name ;
       string bloodType;
       string dateOfBirth;
       string gender;
       string medicalReport ;
       uint emergencyContact ;
    }

    struct Comment {
        address commentator ;
        string text ;
    }

    struct Requests {
        address requestor;
        string requestId;
        string details ;
        string image ; 
        Comment[] comments;
    }

    struct Donation{
        string text;
        Requests request;
        address commentatorId;
    }

     //Profiles
    mapping(address=>LoginDetails) public profile ;

    //Requests
    mapping(string=>Requests) public allRequests ;
    string[] public requestIds;
    mapping(address=>uint) public myRequestsCount ;
    mapping(address=>mapping(uint=>Requests)) public myRequests ;
   
   //BKS tokens
    mapping(address=>uint) public balances ;

    //Notification
    mapping (address => mapping(uint=>string)) public notifications;
    mapping (address=>uint) public myNotificationCount ;

    //Activities
     mapping (address => mapping(uint=>string)) public activities;
    mapping (address=>uint) public activitiesCount ;

    //PendingDonations
    mapping(address =>mapping(uint=>Donation)) public myPending;
    mapping (address=>uint) public myPendingCount;
    
    //events
    event CreateProfile (string name , string bloodType );
    event CreateRequestEvent (string timestamp , string details );
    event AddComment(string requestId , string comment);

    


    modifier onlyOwner(){
        require(msg.sender ==owner , "This function can only be run if you are owner");
        _;
    }


    constructor(){
        name = "D Blood";
        owner = msg.sender;
        balances[msg.sender] = totalBKSSupply;
    }
    
    function LoginUser( string memory _name , string memory _bloodType , string memory _dob , string memory _gender , string memory _MR , uint  _EC) external{

     LoginDetails memory loginDetails = LoginDetails(msg.sender , _name , _bloodType , _dob , _gender , _MR , _EC);

      profile[msg.sender] = loginDetails;

      emit CreateProfile(_name , _bloodType);

    }

    function EditMyProfile( string memory _name , string memory _bloodType , string memory _dob , string memory _gender , string memory _MR , uint  _EC) external{
     LoginDetails storage loginDetails = profile[msg.sender];

     require(loginDetails.id == msg.sender , "You are not the profile owner");
     

    if (bytes(_name).length > 0) {
        loginDetails.name = _name;
        myNotificationCount[msg.sender]++;
        notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Changed name to " , _name , " Sucessfully"));
    }
    if (bytes(_bloodType).length > 0) {
        loginDetails.bloodType = _bloodType;
        myNotificationCount[msg.sender]++;
        notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Changed BloodType to " , _bloodType , " Sucessfully"));
    }
    if (bytes(_dob).length > 0) {
        loginDetails.dateOfBirth = _dob;
        myNotificationCount[msg.sender]++;
        notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Changed dob to " , _dob , " Sucessfully"));

    }
    if (bytes(_gender).length > 0) {
        loginDetails.gender = _gender;
        myNotificationCount[msg.sender]++;
          notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Changed gender to " , _gender , " Sucessfully"));

    }
    if (bytes(_MR).length > 0) {
        loginDetails.medicalReport = _MR;
                myNotificationCount[msg.sender]++;
                 notifications[msg.sender][myNotificationCount[msg.sender]] = "Updated medical report sucessfully";
   activitiesCount[msg.sender]++;
   activities[msg.sender][activitiesCount[msg.sender]] = string("Updated Medical Report");

    }
    if (_EC != 0) {
        loginDetails.emergencyContact = _EC;
        myNotificationCount[msg.sender]++;
        notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Changed Contact to " , _EC , " Sucessfully"));

    }
    }

    function CreateRequest (string memory _requestID , string memory _details , string memory _image) external {
     require(balances[msg.sender] >= 100 , "not enough BKS token") ;

    Requests storage request = allRequests[_requestID]; 
    request.requestor = msg.sender;
    request.requestId = _requestID ;
    request.details = _details ;
    request.image = _image ;
    allRequests[_requestID] = request ;
    requestIds.push(_requestID);
    myRequestsCount[msg.sender]++;
    myRequests[msg.sender][myRequestsCount[msg.sender]] = request;
    balances[msg.sender] -=100 ;

    myNotificationCount[msg.sender]++ ;
    notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Created a request Sucessfully"));
    emit CreateRequestEvent(_requestID , _details);
    }

   function getAllRequests() external view returns(Requests[] memory){
      Requests[] memory requests = new Requests[](requestIds.length);
      
      for(uint i =0 ; i<requestIds.length ; i++){
        requests[i] = allRequests[requestIds[i]];
      }

      return requests ;
   }

   function getAllMyRequests() external view returns (Requests[] memory){
     require(myRequestsCount[msg.sender] > 0 , "You have no Requests till now") ;
      
      uint count = myRequestsCount[msg.sender];

      Requests[] memory myAllRequests = new Requests[](count);

      for (uint i=0 ; i<count ; i++){
       myAllRequests[i] = myRequests[msg.sender][i+1];
      }

      return myAllRequests ;
   }
//2 be test
   function _deleteRequest(string memory _reqId) internal {
      delete allRequests[_reqId];

      for (uint i = 0 ; i<requestIds.length ; i++){
        if(keccak256(bytes(_reqId)) == keccak256(bytes(requestIds[i]))){
            requestIds[i] = requestIds[requestIds.length -1 ];
            requestIds.pop();
            break;
        }
      }
     
     for(uint i=0 ;i<myRequestsCount[msg.sender] ; i++){
        if(keccak256(bytes(myRequests[msg.sender][i].requestId)) == keccak256(bytes(_reqId))){
       myRequests[msg.sender][i] = myRequests[msg.sender][myRequestsCount[msg.sender]];
       delete myRequests[msg.sender][myRequestsCount[msg.sender]];
       myRequestsCount[msg.sender]--;
        }
     }
   }

     //2 b tstd
      function deleteRequest(string memory _reqId) external {
      require(allRequests[_reqId].requestor ==msg.sender , "Only Requestor can deleteRequest");
      _deleteRequest(_reqId);
      }

    function addComment(string memory _requestId, string memory _comment) external {
        require(bytes(allRequests[_requestId].requestId).length != 0 , "The Request Doesn't Exists");  //bytes is required to check the length of the string u cant directly access the length in solidity by directly using string.length the bytes will change the single letters of string into hexadecimal or ascii and if there are no string letter then it will return 0x000 and if there is "ab" then it will return 0x6162. 
        Requests storage request = allRequests[_requestId];   //we are using storage here cuz we are updating state inside a mapping to push somethin on array we could use memory but if we are playing with a state in a mapping or trying to change a state we need storage.
        
        Comment memory comment =  Comment({ //we are using memory here cuz we are pushing an obj
          commentator:msg.sender ,
          text:_comment
        });

        request.comments.push(comment);
    }

 function removeComment(string memory _requestId) external {
    require(bytes(allRequests[_requestId].requestId).length != 0, "Request doesn't exist");
    
    Requests storage request = allRequests[_requestId];
    uint indexToRemove = type(uint).max; 
    bool exists = false;

    // Find the index of the comment to remove
    for (uint i = 0; i < request.comments.length; i++) {
        if (request.comments[i].commentator == msg.sender) {
            exists = true;
            indexToRemove = i; // Store the index of the comment to remove
            break;
        }
    }
    
    require(exists == true, "Your comment doesn't exist");

    // Replace the comment to remove with the last comment and pop
    if (indexToRemove < request.comments.length) {
        request.comments[indexToRemove] = request.comments[request.comments.length - 1];
        request.comments.pop(); // Remove the last comment
    }
}

function getComments(string memory _id) external view returns(Comment[] memory){
  return allRequests[_id].comments ;
}

function transferBKS(address _id , uint _amount) external {
    require(balances[msg.sender] > 0 , "You dont have any tokens");
    require(balances[msg.sender] >= _amount , "You dont have enough tokens to send BKS");


    balances[_id] += _amount;
    balances[msg.sender] -= _amount;

    myNotificationCount[msg.sender]++;
    notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Transferred " , _amount.toString() , " BKS to " , profile[_id].name));

    myNotificationCount[_id]++;
    notifications[_id][myNotificationCount[_id]] = string (abi.encodePacked("Received " , _amount.toString() , " BKS From " , profile[msg.sender].name));
}

function withdraw() external payable{
    require(balances[msg.sender] > 0 , "You dont have any BKS to withdraw");
    uint amountToWithdraw = balances[msg.sender] * 0.00002 ether ;
 payable(msg.sender).transfer(amountToWithdraw);
  balances[msg.sender] = 0;
  myNotificationCount[msg.sender]++;
  notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("WithDrawed " , amountToWithdraw.toString() , " eth Sucessfully"));
}

function buyBks() external payable {
    require(msg.sender !=owner , "Owner Cant buy tokens");
    require(msg.value == 0.001 ether || msg.value == 0.002 ether, "You should pay 0.001 eth or 0.002 eth to buy BKS");

     if(msg.value == 0.002 ether) {
      balances[msg.sender] += 100;
      myNotificationCount[msg.sender]++;
      notifications[msg.sender][myNotificationCount[msg.sender]] = string("Bought 100BKS sucessfully");
      activitiesCount[msg.sender]++;
      activities[msg.sender][activitiesCount[msg.sender]] = "Bought 100Bks";
     } 

     if(msg.value == 0.001 ether) {
      balances[msg.sender] += 50;
       myNotificationCount[msg.sender]++;
      notifications[msg.sender][myNotificationCount[msg.sender]] = string("Bought 50BKS sucessfully");
     activitiesCount[msg.sender]++;
     activities[msg.sender][activitiesCount[msg.sender]]=string("Bought 50BKS");
     }  
    }

    function getAllNotification() external view returns(string[] memory){
    
     string[] memory notis = new string[](myNotificationCount[msg.sender]);

     for(uint i=0 ; i<myNotificationCount[msg.sender] ; i++){
      notis[i] = notifications[msg.sender][i];
     }

     return notis ;
    } 
  
//2 b tested
     function initiate(address _commentatorId , string memory _requestId) external {
       string memory name3 = profile[_commentatorId].name;

       Requests storage req = allRequests[_requestId];

       Donation memory donation ;

       donation.text = string(abi.encodePacked("Your Donation with " , name3 , " is pending" ));
       donation.request = req ;
       donation.commentatorId = _commentatorId;
      
       myPendingCount[msg.sender]++;
       myPending[msg.sender][myPendingCount[msg.sender]] = donation ;

       myPendingCount[_commentatorId]++;
       myPending[_commentatorId][myPendingCount[_commentatorId]] = donation;
     }

   function getAllPendingRequests() external view returns(Donation[] memory){
     Donation[] memory pendingReqs = new Donation[](myPendingCount[msg.sender]);

     for (uint i = 0 ; i<myPendingCount[msg.sender] ; i++ ){
        pendingReqs[i] = myPending[msg.sender][i+1];
     }

     return pendingReqs ;

   }

  function releaseBks(address _donor , string memory _reqId) external {
    Requests memory request = allRequests[_reqId];
    require(bytes(request.requestId).length != 0 , "req doesnt exists");
    require(request.requestor ==msg.sender , "only requestor can release");

    balances[owner] += 3;
    balances[_donor] += 97;

    myNotificationCount[msg.sender]++;
   notifications[msg.sender][myNotificationCount[msg.sender]] = string(abi.encodePacked("Got blood and released BKS to " , profile[_donor].name ));

   myNotificationCount[_donor]++;
   notifications[_donor][myNotificationCount[_donor]] = string(abi.encodePacked("Donated Blood and got BKS from " , profile[msg.sender].name));

   myNotificationCount[owner]++;
   notifications[owner][myNotificationCount[owner]] = string(abi.encodePacked("Gained 3BKS from transactions for " , _donor));

   activitiesCount[msg.sender]++;
   activities[msg.sender][activitiesCount[msg.sender]] = string(abi.encodePacked("Got blood by " , profile[_donor].name));

   activitiesCount[_donor]++;
   activities[_donor][activitiesCount[_donor]] = string(abi.encodePacked("Helped " , profile[msg.sender].name));
   
   _deleteRequest(_reqId);
}

}