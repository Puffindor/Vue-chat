<template>
 <div class="chat-page-container">
  <chat-contacts />
  <chat-dialog ref="dialog" />
 </div>
</template>

<script>
import ChatContacts from "@/components/ChatContacts";
import ChatDialog from "./ChatDialog.vue";
export default {
 components: { ChatContacts, ChatDialog },
 mounted() {
  this.$store.dispatch("getContacts");
  this.$store.dispatch("getChats");
 },
};
</script>

<style lang="scss" scoped>
.chat-page-container {
 width: 100vw;
 height: 90vh;
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-template-areas: "contacts chat chat";
}
@media screen and (min-width: 2559px) {
 .chat-page-container {
  height: 92vh;
 }
}
@media screen and (min-width: 3439px) {
 .chat-page-container {
  height: 94vh;
 }
}
</style>
