// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

contract BLOODBANK {

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

     //Profiles
    mapping(address=>LoginDetails) public profile ;

    //Requests
    mapping(string=>Requests) public allRequests ;
    string[] public requestIds;
    mapping(address=>uint) public myRequestsCount ;
    mapping(address=>mapping(uint=>Requests)) public myRequests ;
   
   //BKS tokens
    mapping(address=>uint) public balances ;
    
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
    }
    if (bytes(_bloodType).length > 0) {
        loginDetails.bloodType = _bloodType;
    }
    if (bytes(_dob).length > 0) {
        loginDetails.dateOfBirth = _dob;
    }
    if (bytes(_gender).length > 0) {
        loginDetails.gender = _gender;
    }
    if (bytes(_MR).length > 0) {
        loginDetails.medicalReport = _MR;
    }
    if (_EC != 0) {
        loginDetails.emergencyContact = _EC;
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
}

function withdraw() external payable{
    require(balances[msg.sender] > 0 , "You dont have any BKS to withdraw");
    uint amountToWithdraw = balances[msg.sender] * 0.00002 ether ;
 payable(msg.sender).transfer(amountToWithdraw);
  balances[msg.sender] = 0;
}

function buyBks() external payable {
    require(msg.sender !=owner , "Owner Cant buy tokens");
    require(msg.value == 0.001 ether || msg.value == 0.002 ether, "You should pay 0.001 eth or 0.002 eth to buy BKS");

     if(msg.value == 0.002 ether) {
      balances[msg.sender] += 100;
     } 

     if(msg.value == 0.001 ether) {
      balances[msg.sender] += 50;
     }  
    }

}