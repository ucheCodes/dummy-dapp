<script setup lang="ts">
    import wallet from '../assets/wallet';
    import {storeToRefs} from "pinia";
    import {useDummyStore} from "../stores/dummy"; 
    import {ref} from "vue";
    const dummyStore = useDummyStore();
    const {
         addNewUserToBlockChain, addToCollections, arrayOfStrings,
        getMessageSender, getAllMessages, getAllUsersFromBlockChain, getArrayOfStrings,
        getBalanceFromBlockChain, getCollections, getFunds, getSystemBalance, getAddressBalance,
        getUserFromBlockChain,getUsersWithFunds,
        connect, sendMessage, testModifier, transferFund,isConnected
    } = useDummyStore(); 
    const { privateKey, mnemonic, walletAddress, user} = storeToRefs(dummyStore);
    const username = ref<string>("");
    const password = ref<string>("");
    const addressInput = ref<string>("");
    

    const createWallet = () => {
         var wal = wallet.newWallet();
         console.log(`address : ${wal.address} private key: ${wal.privateKey}`);
         if (username && password) {
            addNewUserToBlockChain(wal.address,username.value,password.value,wal.privateKey,wal.mnemonic);
         } else {
            alert("pass username and password");
         }
    }
    const login = (addressInput : string) => {
        if(addressInput){
            getUserFromBlockChain(addressInput);
        }
    }

</script>

<template>
    <div class="wallet container">
        <h1>Create Wallet</h1>
        <input type="text" v-model="username" placeholder="enter username">
        <input type="text" v-model="password" placeholder="enter password">
        <button v-if="username && password" @click="createWallet">Create Wallet</button>
        <div>
            {{username}} and {{password}}
        </div>
        <div class="flex" v-if="!isConnected">
            <div>
                <h2>Login</h2>
                <input type="text" v-model="addressInput" placeholder="Enter your wallet address to log in">
                <button @click="login(addressInput)">Click to Log In</button>
            </div>
            <label for="">{{walletAddress}}</label>
            <label for="">{{privateKey}}</label>
            <label for="">{{mnemonic}}</label>
        </div>
        <div v-if="user">
            <h2>The Connected User is ...</h2>
            username : {{user.username}}
            privateKey : {{user.privateKey}}
            mnemonic : {{user.mnemonic}}
            address : {{user._address}}
        </div>
    </div>
</template>