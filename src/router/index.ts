import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Users from "../components/Users.vue";
import Funds from "../components/Funds.vue";
import Messages from "../components/Messages.vue";
import Wallet from "../components/Wallet.vue";
import Todo from "../components/Todo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/funds",
      name: "funds",
      component: Funds,
    },
    {
      path: "/messages",
      name: "messages",
      component: Messages,
    },
    {
      path: "/wallet",
      name: "wallet",
      component: Wallet,
    },
    {
      path: "/todo",
      name: "todo",
      component: Todo,
    },

  ],
});

export default router;
