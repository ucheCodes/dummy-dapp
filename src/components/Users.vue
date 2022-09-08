<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import {storeToRefs} from "pinia";
    import {useDummyStore} from "../stores/dummy";

    const dummyStore = useDummyStore();
    const {arrayOfMessages, arrayOfUserFunds, arrayOfUsers, arrayStrings, collection, user,
        privateKey, mnemonic, walletAddress
    } = storeToRefs(dummyStore);
</script>

<template>
        <div class="container">
            <h1>Connected Users</h1>
            <table>
                <thead>Users</thead>
                <tbody>
                    <tr class="flex" v-for="user in arrayOfUsers" :key="user._address">
                        <td>{{user.username}}</td>
                        <td>{{user._address}}</td>
                        <td><button>Send a message</button></td>
                    </tr>                 
                </tbody>
            </table>
        </div>
</template>