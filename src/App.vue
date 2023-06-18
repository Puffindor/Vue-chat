<template>
 <div class="container">
  <the-header v-if="this.$store.getters.userEmail" />
  <user-auth v-if="!this.$store.getters.userEmail" />
  <chat-page v-else />
  <base-alert v-if="hasError" />
 </div>
</template>

<script>
import TheHeader from "@/components/UI/TheHeader.vue";
import UserAuth from "@/components/UserAuth";
import ChatPage from "./components/ChatPage.vue";
import BaseAlert from "./components/UI/BaseAlert.vue";
export default {
 components: { UserAuth, ChatPage, TheHeader, BaseAlert },
 data() {
  return {
   hasError: false,
   isLoggedIn: false,
  };
 },
 mounted() {
  this.$store.dispatch("autoLogin");
 },
 computed: {
  error() {
   return this.$store.getters.getErrorMassage;
  },
 },
 watch: {
  error() {
   if (this.error) {
    this.hasError = true;
   } else {
    this.hasError = false;
   }
  },
 },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

::-webkit-scrollbar {
 width: 5px;
}
::-webkit-scrollbar-track {
 width: 5px;
 margin-right: 5px;
}

::-webkit-scrollbar-thumb {
 background-color: #464646;
 border-radius: 10px;
}

.container {
 display: flex;
 align-items: center;
 width: 100vw;
 height: 100vh;
 overflow-x: hidden;
 background-color: #f6f7f9;
 flex-direction: column;
 justify-content: center;
}
* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}
</style>
