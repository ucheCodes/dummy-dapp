<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import {storeToRefs} from "pinia";
    import {useDummyStore} from "../stores/dummy";
    import { any } from 'underscore';

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
    const receiver = ref("");
    const msg = ref("");
    const chats = ref([] as any);
    const viewChat = ref<boolean>(false);
    const _sendMessage = (sender : any, receiver : any, message : string) => {
        console.log("call the pinia function here ...", sender + ' '+ receiver + ' '+message);
    }
    const passToReceiver = (rec : string) => {
        if(rec != walletAddress.value)
        {
            receiver.value = rec;
        }
        else{
            alert("you can't initiate a chat with yourself");
        }
    }
    const getChats = (sender : string,receiver : string) => {
       if( sender != receiver){
        chats.value = arrayOfMessages.value
            .filter((chat : any) => (chat.sender == sender && chat.receiver == receiver) || (chat.sender == receiver && chat.receiver == sender));
            // console.log("get Chats ...")
            // console.log(chats.value);
            //console.log(arrayOfMessages.value);
       }
       else{
        alert("you can't get a chat with yourself!");
       }
    }
    onMounted(() => {
        //console.log(arrayOfUsers.value);
        //console.log(arrayOfMessages.value);
    });
    const viewChats = () => {
        //console.log(chats.value);
        // for (let index = 0; index < chats.value.length; index++) {
        //     var chat = chats.value[index];
        //     console.log(chat);
        // }
        // console.log(arrayOfMessages);
        // console.log(chats.value);
        viewChat.value = true
        console.log(arrayOfMessages.value);
    }
</script>
<template>
    <div class="container" v-if="walletAddress">
        <div>
            <h1>Online Users </h1>
            <ul v-if="arrayOfUsers">
                <li  v-for="user in arrayOfUsers" :key="user._address">Name  ~~ {{user.username}} ~~ {{user._address}} <button @click="passToReceiver(user._address)">Say hi</button></li>    
            </ul>   
        </div>
        <h1>Messages</h1>
        <p>View Your chats with ...</p>
        <ol>
            <li v-for="user in arrayOfUsers" :key="user._address">
                <small v-if="user.address != walletAddress">{{user.username}} --- {{user.address}} --- <button @click="getChats(walletAddress,user._address)">get chats</button> </small>
            </li>
        </ol>
        <div v-if="chats">
            <ol>
                <li v-for="chat in chats" :key="chat._address">{{chat.sender}} : {{chat.message}} : {{new Intl.DateTimeFormat('en-US').format(new Date(chat.timestamp * 1000))}}</li>
            </ol>
            <!-- <button @click="viewChats">Click to view chats in console</button> -->
            <!-- <div v-if="viewChat">
                <ul>
                    <li v-for="c in arrayOfMessages" :key="c.sender">{{c.sender}}  {{c.receiver}} \n {{c.message}}  {{c.timestamp * 1000}}</li>
                </ul>
            </div> -->
        </div>
        <h1>Send Messages</h1>
        <input type="text" v-model="receiver" placeholder="receivers address">
        <textarea name="" v-model="msg" id="" cols="30" rows="10" placeholder="send a message"></textarea>
        <button v-if="receiver" @click="sendMessage(walletAddress,receiver,msg)">Send Message</button>
    </div>
</template>