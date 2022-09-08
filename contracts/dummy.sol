//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract dummy{

    string[] public arrayStrings;
    mapping(string => string[]) public collections;
    mapping(address => users) public mapOfUsers;
    mapping(address => int256) private balance;
    users[] public arrayOfUsers;
    userFunds[] public arrayOfUserFunds;
    message[] public arrayOfMessages;

    struct users{
        address _address;
        string username;
        string password;
        string privateKey;
        string mnemonic;
    }
    struct message{
        address sender;
        address receiver;
        uint256 timestamp;
        string message;
    }
    struct userFunds{
        address _address;
        int256 amount;
    }
    event userAdded(
        address _address,
        string username,
        string password,
        string privateKey,
        string mnemonic
    );
    event newMessageAdded(
        address sender,
        address receiver,
        uint256 timestamp,
        string message
    );
    event fundTransferred(
        address sender,
        address receiver,
        int256 amount
    );
    modifier modifyFunds(address sender, int256 amount){
        require(balance[sender] >= amount,"Insufficient funds !!!");
        _;
    }
    modifier modifyTest(string memory _message){
        require(keccak256(abi.encodePacked(_message)) == keccak256(abi.encodePacked("hello world")),"the input message cannot modify this function. Try 'hello world'");
        _;
    }

    function getMessageSender() public view returns (address){//passes
        return msg.sender;
    }
    function arrayOfStrings(string memory content) public {//passes
        arrayStrings.push(content);
    }
    function getArrayOfStrings() public view returns (string[] memory){//passes
        return arrayStrings;
    }
    function addToCollections(string memory key, string memory content) public{//passes
        collections[key].push(content);
    }
    function getCollections(string memory key) public view returns (string[] memory){//passes
        return collections[key];
    }
    function addNewUserToBlockChain(address _address, string memory username, string memory password, string memory privateKey, string memory mnemonic) public{//passed
        arrayOfUsers.push(users(_address,username,password,privateKey,mnemonic));
        mapOfUsers[_address] = users(_address,username,password,privateKey,mnemonic);
        emit userAdded(_address,username,password,privateKey,mnemonic);
    }
    function getUserFromBlockChain(address _address) public view returns (users memory){//passed
        return mapOfUsers[_address];
    }
    function getAllUsersFromBlockChain() public view returns (users[] memory){//passed
        return arrayOfUsers;
    }
    function sendMessage(address sender, address receiver, string memory _message) public {//passed
        arrayOfMessages.push(message(sender,receiver,block.timestamp,_message));
        emit newMessageAdded(sender,receiver,block.timestamp,_message);
    }
    function getAllMessages() public view returns (message[] memory){//passed
        return arrayOfMessages;
    }
    function getFunds(address _address) public returns (int256) {//passed
        int256 fund = int256(((0.5))*10**18);//I will reconvert in js by dividing by 10**18
        balance[_address] = fund;
        return fund;
    }
    function tranferFund(address sender, address receiver, int256 amount) public modifyFunds(sender, amount) {//passed
        balance[sender] -= amount;
        balance[receiver] += amount;
        emit fundTransferred(sender,receiver,amount);
    }
    function getBalanceFromBlockChain(address _address) public view returns (int256){//passed
        return balance[_address];
    }
    function getUsersWithFunds() public returns (userFunds[] memory){
        for(uint i = 0; i < arrayOfUsers.length; i++){
            if(balance[arrayOfUsers[i]._address] > 0){
                arrayOfUserFunds.push(userFunds(arrayOfUsers[i]._address, balance[arrayOfUsers[i]._address]));
            }
        }
        return arrayOfUserFunds;
    }
    function getSystemBalance() public view returns (uint256){
        return address(this).balance;
    }
    function getAddressBalance(address _address) public view returns (uint256){
        return address(_address).balance;
    }
    function testModifier(string memory _message) public modifyTest(_message) pure returns (string memory){//passed
        return "Hello World, this is a modifier test from blockchain";
    }
    //account 1 = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    //account 2 = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    //account 3 = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
}