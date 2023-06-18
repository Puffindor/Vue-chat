<template>
 <div class="chat-dialog">
  <ul v-if="this.massages.length > 0" id="chat" class="massage-list">
   <li v-for="el in this.massages" :key="el.text">
    <massage-item :id="el.from" :text="el.text" />
   </li>
  </ul>
  <p v-else>No massages found</p>
  <div class="massage-input">
   <textarea
    placeholder="Enter massage"
    id="textArea"
    @input="textAreaResize($event)"
    v-model="userInput"
   ></textarea>
   <button @click="sendMassage">Send</button>
  </div>
 </div>
</template>

<script>
import { ref, onValue } from "firebase/database";
import db from "@/firebase";
import MassageItem from "./MassageItem.vue";
export default {
 components: { MassageItem },
 data() {
  return {
   userInput: "",
   massages: [],
  };
 },

 methods: {
  textAreaResize(e) {
   e.target.style.height = "70%";
   if (e.target.scrollHeight < 70) {
    e.target.style.height = `${e.target.scrollHeight}px`;
   } else {
    e.target.style.height = "70px";
   }
  },
  sendMassage() {
   if (this.userInput) {
    document.querySelector("textArea").style.height = "70%";
    this.$store.dispatch("sendMassage", {
     text: this.userInput,
     from: this.$store.getters.getUserId,
    });
    this.userInput = "";
   }
   const chat = document.getElementById("chat");
   chat.scroll(0, chat.scrollHeight);
  },
  async getMassages(chat) {
   const starCountRef = await ref(
    db,
    "/Chats/" + this.$store.getters.getUserId + "/" + chat
   );
   await onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
     this.massages = Object.values(data);
    } else this.massages = [];
   });
  },
 },
 computed: {
  chat() {
   return this.$store.getters.getSelectedChat;
  },
 },

 watch: {
  chat(newChat) {
   this.getMassages(newChat);
   const chatList = document.getElementById("chat");
  },
 },
};
</script>

<style scoped lang="scss">
p {
 color: #4e4c4c;
 font-family: "Poppins", sans-serif;
 font-size: 20px;
 margin-bottom: 30%;
}
.chat-dialog {
 grid-area: chat;
 display: flex;
 width: 100%;
 max-height: 100%;
 align-items: center;
 flex-direction: column;
 overflow-y: scroll;
 justify-content: flex-end;
}
.massage-list {
 align-self: flex-start;
 flex-direction: column;
 display: flex;
 overflow-y: scroll;

 width: 100%;
 max-height: 90%;
}

li {
 list-style: none;
 display: inline-flex;
 width: 100%;
}
.massage-input {
 transition: 200ms;
 display: flex;
 padding: 15px 23px 15px 23px;
 width: 100%;
 height: 10%;
 background-color: #e8eaed;
 align-items: center;
 justify-content: space-between;
}
button {
 transition: 200ms;
 height: 70%;
 width: 8%;
 border-radius: 10px;
 background-color: #2c7ae1;
 font-family: "Poppins", sans-serif;
 font-size: 18px;
 color: white;
 border-style: hidden;
}
button:hover {
 cursor: pointer;
 transition: 300ms;
 background-color: #266dcb;
}
textarea {
 padding: 0.5%;
 transition: 200ms;
 font-family: "Poppins", sans-serif;
 font-size: 18px;
 color: white;
 width: 90%;
 height: 70%;
 border-radius: 10px;
 background-color: #c5c9d3;
 border-style: hidden;
 outline: none;
 resize: none;
}
textarea:hover {
 transition: 300ms;
 background: #a6a9b1;
}
@media screen and (min-width: 2559px) {
 .massage-input {
  height: 7%;
 }
 textarea {
  padding: 0.5%;
 }
}
@media screen and (min-width: 3439px) {
 .massage-input {
  height: 5%;
 }
}
@media screen and (max-width: 1281px) {
 .massage-input {
  height: 15%;
 }
 textarea {
  padding: 1.2%;
 }
}
</style>
