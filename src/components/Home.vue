<script setup lang="ts">
    import { onMounted } from 'vue';
    import wallet from '../assets/wallet';
    import {storeToRefs} from "pinia";
    import {useDummyStore} from "../stores/dummy";

    const dummyStore = useDummyStore();
    const {
         addNewUserToBlockChain, addToCollections, arrayOfStrings,
        getMessageSender, getAllMessages, getAllUsersFromBlockChain, getArrayOfStrings,
        getBalanceFromBlockChain, getCollections, getFunds, getSystemBalance, getAddressBalance,
        getUserFromBlockChain,getUsersWithFunds,getBalanceUsingEther,
        connect, sendMessage, testModifier, transferFund,
    } = useDummyStore();
    const {arrayOfMessages, arrayOfUserFunds, arrayOfUsers, arrayStrings, collection, user,
        privateKey, mnemonic, walletAddress
    } = storeToRefs(dummyStore);
    
    const setDeploymentPrivateKey = (key : string) => {
        //arrayOfStrings("The answer is no, I cant but however I can retrieve old data from any account even without a gas fee. The bottom line is that gas is needed to sign / send new transactions");
        arrayOfStrings(`If this works then it was sent to the block chain using users random account : ${key}`);
        console.log(key);
    }
    function createWallet() {
        var wal = wallet.newWallet();
        console.log(`address : ${wal.address} private key: ${wal.privateKey}`);
    }
    onMounted(()=> {
        //createWallet();
        connect();
        //testModifier("hello world");
        //console.log(testModifier("hello world"));
        //console.log(getMessageSender());//passed
         //arrayOfStrings("Can I push data to blockchain on an account without gas fees?");//passed
         //getArrayOfStrings();//passed
        //addToCollections("cars","volkswagen");//passed
        //getCollections("cars");//passed
        //getFunds("0x2431C1cDe9abBfDC0E7e68A40CFE8269cbb98AC8");//passed
        //console.log(getBalanceFromBlockChain("0x06Ad80fEEd4E631aDf6e87485f00A405a2dF5EB9"));
        //transferFund("0x2431C1cDe9abBfDC0E7e68A40CFE8269cbb98AC8","0x06Ad80fEEd4E631aDf6e87485f00A405a2dF5EB9",100000);
        //getAddressBalance("0x2431C1cDe9abBfDC0E7e68A40CFE8269cbb98AC8");//passed
        //getArrayOfStrings();//passed
        //console.log(testModifier("hello world"));//passed
       //getFunds("0x06Ad80fEEd4E631aDf6e87485f00A405a2dF5EB9");
         //console.log(getSystemBalance());//passed
       //getAddressBalance("0x06Ad80fEEd4E631aDf6e87485f00A405a2dF5EB9");
       // getUserFromBlockChain("0x4Dfc9DC8aB292789558ab7AF909876D866f1aF4D");
    //    getUserFromBlockChain("0xFa8072dCe4e37DdA4849e99dEe30E51a08BB38d5");
    //    getUserFromBlockChain("0xd5403651c76AB051719a106E2ECf9d25852506B1");
    //getAllUsersFromBlockChain();
        //To success, cheers!!!
    });
</script>

<template>
    <div class="container">
        <h1>Welcome to my Dapp</h1>
        <div class="home">
            <h1>Home Page</h1>
            <p>The aim of this dummy application includes ... {{mnemonic}}</p>
            <ul>
                <li>Building a fully decentralized and functioning dapp</li>
                <li>Connect the dapp to a blockchain network precisely the mumbai network</li>
                <li>Build and connect the dapp to the blockchain independent of a metamask</li>
                <li>Create and manage users wallets, accounts and account recovery</li>
                <li>Send receive and transfer ethereum funds through the accounts</li>
                <li>Check account balance</li>
                <li>Create a form of chat application where users can interact using their wallet address</li>
            </ul>
            <ul v-if="collection">
                <li>List of fruits stored in collection</li>
                <li v-for="c in collection" :key="c">{{c}}</li>
            </ul>
            <ul v-if="arrayStrings">
                <li>List of data strings stored in array of strings</li>
                <li v-for="c in arrayStrings" :key="c">{{c}}</li>
            </ul>
        </div>
        <div>
            <h2>Login with users correct private key to set deployment api gas fee</h2>
            <input v-model="privateKey" placeholder="enter the users private key"/>
            <button @click="setDeploymentPrivateKey(privateKey)">Set User Wallet</button>
        </div>
    </div>
</template>