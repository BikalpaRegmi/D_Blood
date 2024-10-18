// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

contract BLOODBANK {

    string public name ;
    address public owner ;
    string public tokenName = "BKS";
    uint totalBKSSupply = 1000000 ;

    struct LoginDetails{
        string id ;
       string name ;
       string bloodType;
       string dateOfBirth;
       string gender;
       string medicalReport ;
       uint emergencyContact ;
    }

    struct Requests {
        string requestId;
        string details ;
        string image ; 
        string comments;
    }

    mapping(string=>LoginDetails) public profile ;

    mapping(string=>Requests) public allRequests ;
    mapping(address=>uint) public myRequestsCount ;
    mapping(address=>mapping(uint=>Requests)) public myRequests ;
    string[] public requestIds;

    mapping(address=>uint) public balances ;
    
    event CreateProfile (string name , string bloodType );
    event CreateRequestEvent (string timestamp , string details );


    modifier onlyOwner(){
        require(msg.sender ==owner , "This function can only be run if you are owner");
        _;
    }


    constructor(){
        name = "Blood Bank";
        owner = msg.sender;
        balances[msg.sender] = totalBKSSupply;
    }
    
    function LoginUser(string memory _id , string memory _name , string memory _bloodType , string memory _dob , string memory _gender , string memory _MR , uint  _EC) external{

     LoginDetails memory loginDetails = LoginDetails(_id , _name , _bloodType , _dob , _gender , _MR , _EC);

      profile[_id] = loginDetails;

      emit CreateProfile(_name , _bloodType);

    }

    function buyBks() external payable {
    require(msg.sender !=owner , "Owner Cant buy tokens");
    require(msg.value == 3 * 10**15, "plz pay 0.003 eth");
    balances[msg.sender]+=100 ;

    }

    function CreateRequest (string memory _requestID , string memory _details , string memory _image) external {
     require(balances[msg.sender] >= 100 , "not enough BKS token") ;
    Requests memory request = Requests(_requestID , _details , _image , ""); 
    allRequests[_requestID] = request ;
    requestIds.push(_requestID);
    myRequestsCount[msg.sender]++;
    myRequests[msg.sender][myRequestsCount[msg.sender]] = request;
    emit CreateRequestEvent(_requestID , _details);
    }
//  aaba aayexi getallrequests wala function bana ani get allRequests wala functin pani bana return gar ani baki paxi herlas
}