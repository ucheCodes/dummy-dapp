import {ethers} from "ethers";
import {ref} from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
import contractAbi from "../artifacts/contracts/dummy.sol/dummy.json";

const contractAddress = "0x15D9d79417f7ab70c8b09B63BD7BE3414ba8F2B4";
//const deployingPrivateKey = "ddd7a86b5bb5bb8d0c987cd942ad49b0d63a32f76eb230b144d8b4fbfe37fb3e";//one of my metamask account
const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/mX1Ki53hXUDMijd26ZSxenbNW2wInBWP");
const deployingPrivateKey = "0x608f59c2540bb0f8fd80030ea36d2d7da1cb5f5338d76fc3484021ced278b4c1";//process.env.private_key;//I can set this to import from dotenv if am using the admins account to pay GAS fees
//const signer = provider.getSigner(wallet.address);
//declaring provider and signer with metamask
//const provider = new ethers.providers.Web3Provider(ethereum);
//const signer = provider.getSigner();

export const useDummyStore = defineStore('user',() => { 
    //defining the wallet parameters incase they need to go global
    const privateKey = ref<string>("");
    const mnemonic = ref<string>("");
    const walletAddress = ref<string>(""); 
    //defining the deploying params
    const wallet = new ethers.Wallet(deployingPrivateKey,provider);
    const {ethereum} = window as any;
     const signer = wallet.connect(provider);
     const dummyContract = new ethers.Contract(contractAddress,contractAbi.abi,signer);

    const arrayStrings = ref([] as any);
    const arrayOfUsers = ref([] as any);
    const arrayOfUserFunds = ref([] as any);
    const arrayOfMessages = ref([] as any);
    const collection = ref([]as any);
    const user = ref({} as any);
    const isConnected = ref<boolean>(false);
    
    //function getMessageSender() public view returns (address)
    const getMessageSender = async () => {
        try {
            const sender = await dummyContract.getMessageSender();
            return sender;
        } catch (error) {
            console.error(error);
        }
    };
    //arrayOfStrings(string memory content) public
    async function arrayOfStrings(content:string) {
        try {
            // if(privateKey.value){
            //     const userWallet = new ethers.Wallet(privateKey.value,provider);
            //      const signer = userWallet.connect(provider);
            //      const userContract = new ethers.Contract(contractAddress,contractAbi.abi,signer);
            //     const pushArrayStrings = await userContract.arrayOfStrings(content);
            //     console.log("Mining from array of strings ...", pushArrayStrings.hash);
            //     console.log("pushed array content to blockchain ...", pushArrayStrings.hash);
            // }
            // else{
            //     alert("Error! you can not perform transaction without a valid wallet identity");
            // }
            const txn = await dummyContract.arrayOfStrings(content);
            alert(`adding to the polygon mumbai test network with hash : ${txn.hash}`);
        } catch (error) {
            console.log("error from  array of strings caught ...");
            console.error(error);
        }
    };
    //getArrayOfStrings() public view returns (string[] memory)
    async function getArrayOfStrings(){
        try {
            const data = await dummyContract.getArrayOfStrings(); 
           console.log("fetching array data from block chain",data.hash);
           arrayStrings.value = data;
           console.log(data);
           //console.log(arrayStrings.value);
        } catch (error) {
            console.error(error);
        }
    };
    //function addToCollections(string memory key, string memory content) public
    async function addToCollections(key:string, content:string) {
        try {
            const txn = await dummyContract.addToCollections(key,content);
            console.log("Mining from collections add ... ", txn.hash);
        } catch (error) {
            console.error(error);
        }  
    };
    //function getCollections(string memory key) public view returns (string[] memory)
    const getCollections =async (key:string) => {
        const txn = await dummyContract.getCollections(key);
        console.log("Mining get collections ... ");
        collection.value = txn;
    }
    //function addNewUserToBlockChain(address _address, string memory username, string memory password, string memory privateKey, string memory mnemonic) public
    async function addNewUserToBlockChain(_address:any, username : string, password : string, privateKey : string, mnemonic : string) {
        const txn = await dummyContract.addNewUserToBlockChain(_address,username,password,privateKey,mnemonic);
        console.log(`transacting users to the blockchain ... ${txn.hash}`);
    }
    //getUserFromBlockChain(address _address) public view returns (users memory)
    const getUserFromBlockChain =async (_address :  any) => {
        const txn = await dummyContract.getUserFromBlockChain(_address);
        user.value = txn;
        console.log("mining users ...");
        privateKey.value = user.value.privateKey;
        walletAddress.value = user.value._address;
        mnemonic.value = user.value.mnemonic;
        console.log(user.value);
    }
    //getAllUsersFromBlockChain() public view returns (users[] memory)
    const getAllUsersFromBlockChain = async () => {
        const txn = await dummyContract.getAllUsersFromBlockChain();
        arrayOfUsers.value = txn;
        console.log(arrayOfUsers.value);
    }
    //sendMessage(address sender, address receiver, string memory _message) public
    async function sendMessage(sender : any, receiver : any, _message: string) {
        const txn = await dummyContract.sendMessage(sender,receiver,_message);
        console.log("sending message ...", txn.hash);
    }
    //function getAllMessages() public view returns (message[] memory)
    const getAllMessages =async () => {
        const txn = await dummyContract.getAllMessages();
        console.log("getting messages ...");
        arrayOfMessages.value = txn;
        //console.log(arrayOfMessages.value);
    }
    //getFunds(address _address) public returns (int256)
    const getFunds = async (_address:any) => {
        const txn = await dummyContract.getFunds(_address);
        console.log("getting funds .. ",txn.hash);
        console.log(txn);
        return txn;
    }
    //function tranferFund(address sender, address receiver, int256 amount) public modifyFunds(sender, amount)
    async function transferFund(sender : any, receiver: any, amount : number) {
        const txn = await dummyContract.tranferFund(sender,receiver,amount);
        await txn.wait();
    }
    //function getBalanceFromBlockChain(address _address) public view returns (int256)
    const getBalanceFromBlockChain = async (_address : any) => {
        const txn = await dummyContract.getBalanceFromBlockChain(_address);
        return txn;
    }
    //function getUsersWithFunds() public returns (userFunds[] memory)
    const getUsersWithFunds = async () => {
        const txn = dummyContract.getUsersWithFunds();
        await txn.wait();
        arrayOfUserFunds.value = txn;
    }
    //function testModifier(string memory _message) public modifyTest(_message) pure returns (string memory)
    const testModifier = async (_message:string) => {
        try{
            const txn = await dummyContract.testModifier(_message);
            console.log("mining modifier ", txn.hash);
            console.log(txn);
        }
        catch(error){
            console.error(error);
            alert("invalid modifying string, pass 'hello world");
        }
    }
    //function getSystemBalance() public view returns
    const getSystemBalance = async () => {
        const txn = dummyContract.getSystemBalance();
        return txn;
    }
    //function getAddressBalance(address _address) public view returns (uint256)
    const getAddressBalance =async (address : any) => {
        const txn = await dummyContract.getAddressBalance(address);
        console.log(txn);
        return txn;
    }
    const getBalanceUsingEther = async (address : any) => {
       const bal =  await provider.getBalance(address);
       return bal;
    }
    //emit events
    const emission = (() => {
        dummyContract.on('userAdded', (_address : string,username : string,password : string,_privateKey : any,_mnemonic : any) => {
            console.log(`new user added \n ${_address}, ${username},${password}, ${_privateKey}, ${_mnemonic}`);
            isConnected.value = true;
            privateKey.value = _privateKey;
            walletAddress.value = _address;
            mnemonic.value = _mnemonic;
            //append to the user array
            arrayOfUsers.value = [...arrayOfUsers.value, {
                _address : _address,
                username : username,
                password : password,
                privateKey : _privateKey,
                mnemonic : _mnemonic
            }];
            //console.log(arrayOfUsers.value);
            alert(`new user added : ${username}`);
        });
        dummyContract.on('newMessageAdded', (sender : any,receiver : any,time : any,_message : string) => {
            console.log(`new message added ${sender}  ${receiver} ${time} ${_message}`);
            arrayOfMessages.value = [...arrayOfMessages.value, {
                receiver : receiver,
                sender : sender,
                message : _message,
                timestamp : time
            }];
            //console.log(arrayOfMessages.value);
            alert(`new message ${_message}`);
        });
        dummyContract.on('fundTransferred', (sender : any,receiver : any, amount : number) => {
            console.log(` fund transferred ${sender} ${receiver} ${amount} `);
        })
    });
    const connect =async () => {
        console.log("connection started ...");
        getAllUsersFromBlockChain();
        getAllMessages();
         emission();
     }
    return{
        arrayOfMessages, arrayOfUserFunds, arrayOfUsers, arrayStrings, collection, user, 
        privateKey, walletAddress, mnemonic,isConnected,
        addNewUserToBlockChain, addToCollections, arrayOfStrings,
        getMessageSender, getAllMessages, getAllUsersFromBlockChain, getArrayOfStrings,
        getBalanceFromBlockChain, getCollections, getFunds, getSystemBalance, getAddressBalance,
        getUserFromBlockChain,getUsersWithFunds,
        connect, sendMessage, testModifier, transferFund, getBalanceUsingEther
    }
});


if(import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useDummyStore,import.meta.hot));