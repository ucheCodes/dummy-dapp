<script setup lang="ts">
import { ref } from "vue";
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

const strings = ref<string>("");
const key = ref<string>("");
const key2 = ref<string>("");
const val = ref<string>("");
</script>

<template>
    <div>
        <h1>Let's create our todo List</h1>
        <div>
            <h2>Add to the List Any thing of your choice</h2>
            <div>
                <textarea v-model="strings" placeholder="What's on your list, add here now"></textarea>
                <button v-if="strings" @click="arrayOfStrings(strings)">Add</button>

                <ul>
                    <li>The items added are : </li>
                    <li @click="getArrayOfStrings"><button>Get List</button></li>
                    <li v-for="s in arrayStrings" :key="s">{{s}}</li>
                </ul>
            </div>
        </div>
        <div>
            <h2>Todo List in an organized pattern, Explore ...</h2>
            <div>
                <input v-model="key" placeholder="give your list a unique key"/>
                <textarea v-model="val" placeholder="create your own categorized and ordered list"></textarea>
                <button v-if="key && val" @click="addToCollections(key,val)">Add</button>

                <ul>
                    <li><input v-model="key2" type="text" placeholder="enter the correct key to find the list"></li>
                    <li><button v-if="key2" @click="getCollections(key2)">Get List</button></li>
                    <li v-for="c in collection" :key="c">{{c}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>