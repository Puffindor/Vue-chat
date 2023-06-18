<template>
 <div @click.self="selectContact" class="contact">
  <div @click="selectContact">
   <div class="avatar">{{ name[0].toUpperCase() }}</div>
   <p>{{ name }}</p>
  </div>
  <div
   v-if="inContacts"
   class="contact-badge"
   type="button"
   @click="addContact"
  >
   In Contacts
  </div>
  <button v-else type="button" @click="addContact">Add contact</button>
 </div>
</template>

<script>
export default {
 props: ["name", "id"],
 computed: {
  color() {
   if (this.$store.getters.getSelectedChat === this.id) {
    return "#2C7AE1";
   } else {
    return "transperent";
   }
  },
  inContacts() {
   let contacts = this.$store.getters.getContactsIds;
   return contacts.includes(this.id);
  },
  colorHover() {
   if (this.$store.getters.getSelectedChat === this.id) {
    return "#2C7AE1";
   } else {
    return "#c5c9d3";
   }
  },
 },
 methods: {
  addContact() {
   this.$store.dispatch("addContact", { id: this.id, name: this.name });
  },
  selectContact() {
   this.$store.dispatch("selectContact", { id: this.id, name: this.name });
  },
 },
};
</script>

<style lang="scss" scoped>
.contact-badge {
 font-family: "Poppins", sans-serif;
 font-weight: 800;
 color: white;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 40px;
 width: 110px;
 border-style: hidden;
 border-radius: 10px;
 background-color: #25b444;
}
button {
 font-family: "Poppins", sans-serif;
 font-weight: 800;
 color: white;
 display: flex;
 justify-content: center;
 align-items: center;
 height: 40px;
 width: 100px;
 border-style: hidden;
 border-radius: 10px;
 background-color: #2c7ae1;
}
button:hover {
 cursor: pointer;
 transition: 300ms;
 background-color: #2469c2;
}
.avatar {
 color: white;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 20px;
 margin-right: 10px;
 width: 40px;
 height: 40px;
 font-weight: 800;
 background-color: #1d9637;
 border-radius: 100%;
}
.contact {
 margin-top: 10px;
 border-radius: 10px;
 padding: 10px 10px 10px 10px;
 font-family: "Poppins", sans-serif;
 color: black;
 display: flex;
 width: 90%;
 height: 100%;
 background-color: v-bind(color);
 font-size: 16px;
 display: flex;
 align-items: center;
 justify-content: space-between;
 div {
  display: flex;
  justify-content: center;
  align-items: center;
 }
}
.contact:hover {
 cursor: pointer;
 transition: 300ms;
 background-color: v-bind(colorHover);
}
</style>
