<template>
 <div class="contacts-container">
  <div class="search">
   <input placeholder="Search" v-model="searchRequest" @input="getAllUsers" />
   <div>
    <button @click="selectChat" class="btn" :class="{ active: chatsSelected }">
     Chats
    </button>
    <button
     @click="selectContacts"
     class="btn"
     :class="{ active: contactsSelected }"
    >
     Contacts
    </button>
   </div>
  </div>

  <ul>
   <p
    v-if="
     this.listMode === 'chats' && this.$store.getters.getChats.length === 0
    "
   >
    No Chats
   </p>
   <p
    v-if="
     this.listMode === 'contacts' &&
     this.$store.getters.getContacts.length === 0
    "
   >
    No Contacts
   </p>
   <p v-if="this.listMode === 'search' && this.search.length === 0">
    Nothing Found
   </p>
   <li v-for="el in search" :key="el.id">
    <contact-item :name="el.name" :id="el.id" @selectContact="selectContact" />
   </li>
  </ul>
 </div>
</template>
<script>
import db from "@/firebase";
import { ref, set, onValue } from "firebase/database";
import ContactItem from "./ContactItem.vue";
export default {
 components: { ContactItem },
 data() {
  return {
   listMode: "contacts",
   chatsSelected: false,
   contactsSelected: true,
   allChats: [],
   allUsers: [],
   searchResult: [],
   searchRequest: "",
  };
 },

 computed: {
  search() {
   if (this.searchRequest) {
    this.listMode = "search";
    return this.allUsers.filter((el) =>
     el.name
      .toLocaleLowerCase()
      .includes(this.searchRequest.toLocaleLowerCase())
    );
   } else {
    if (this.chatsSelected) {
     this.listMode = "chats";
     return this.$store.getters.getChats;
    } else {
     this.listMode = "contacts";
     return this.$store.getters.getContacts;
    }
   }
  },
 },

 methods: {
  selectChat() {
   if (this.chatsSelected) {
    return;
   } else {
    this.chatsSelected = true;
    this.contactsSelected = false;
   }
  },
  selectContacts() {
   if (this.contactsSelected) {
    return;
   } else {
    this.chatsSelected = false;
    this.contactsSelected = true;
   }
  },

  getAllUsers() {
   if (this.allUsers.length === 0) {
    const starCountRef = ref(db, "Users/");
    onValue(starCountRef, (snapshot) => {
     const data = snapshot.val();

     Object.values(data);
     this.allUsers = Object.values(data).filter(
      (el) => el.id !== this.$store.getters.getUserId
     );
    });
   }
  },
 },
};
</script>
<style scoped lang="scss">
p {
 margin-top: 20%;
 color: #4e4c4c;
 font-family: "Poppins", sans-serif;
 font-size: 20px;
}

ul {
 display: flex;
 flex-direction: column;
 align-items: center;
 li {
  width: 100%;
 }
}
.btn {
 cursor: pointer;

 font-size: 20px;
 border-radius: 10px;
 border-style: hidden;
 width: 48%;
 height: 100%;
 background-color: #c5c9d3;
 font-family: "Poppins", sans-serif;
 color: white;
}
.btn:hover {
 transition: 300ms;
 background-color: #a7aab4;
}
.btn.active {
 background-color: #2c7ae1;
}
.btn.active:hover {
 transition: 300ms;
 background-color: #2668be;
}
.contacts-container {
 overflow-y: scroll;
 background-color: #e8eaed;
 height: 100%;
 width: 100%;
 grid-area: contacts;
}
li {
 display: flex;
 justify-content: center;
}
.search {
 display: flex;
 flex-direction: column;
 width: 100%;
 height: 15%;
 display: flex;
 justify-content: center;
 align-items: center;
 padding-top: 20px;
 div {
  margin-top: 20px;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5% 0px 5%;
 }
}
input {
 padding-left: 8px;
 font-size: 20px;
 height: 100%;
 width: 90%;
 background: #c5c9d3;
 border-radius: 10px;
 outline: none;
 border-style: hidden;
}
@media screen and (min-width: 2559px) {
 .search {
  height: 10%;
 }
}
@media screen and (min-width: 3439px) {
 .search {
  height: 7%;
 }
}
@media screen and (max-width: 1281px) {
 .search {
  height: 20%;
 }
}
</style>
