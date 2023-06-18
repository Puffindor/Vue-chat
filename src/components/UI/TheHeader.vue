<template>
 <header>
  <div class="username">
   <div class="avatar">
    {{ this.$store.getters.userEmail[0].toUpperCase() }}
   </div>
   <p>
    {{ this.$store.getters.userEmail }}
   </p>
  </div>
  <h1>TELEGRAF</h1>
  <button @click="logout">Logout</button>
 </header>
</template>

<script>
export default {
 methods: {
  logout() {
   this.$store.dispatch("logout");
  },
 },
};
</script>

<style lang="scss" scoped>
h1 {
 letter-spacing: 5px;
 color: white;
 font-size: 30px;
 font-family: "Poppins", sans-serif;
}
.username {
 color: white;
 font-size: 18px;
 font-family: "Poppins", sans-serif;
 height: 100%;
 display: flex;
 align-items: center;
}
.avatar {
 color: white;
 margin: 10px;
 font-family: "Poppins", sans-serif;
 font-weight: 800;
 width: 50px;
 height: 50px;
 border-radius: 100%;
 background-color: #1d9637;
 display: flex;
 font-size: 25px;

 justify-content: center;
 align-items: center;
}
button {
 height: 50%;
 padding: 5px;
 border-radius: 10px;
 cursor: pointer;
 color: white;
 font-family: "Poppins", sans-serif;
 font-size: 18px;
 margin: 10px;
 background-color: transparent;
 border-style: hidden;
}
button:hover {
 transition: 300ms;
 background-color: #d9d9d98f;
}
header {
 display: flex;
 width: 100%;
 height: 10vh;
 background: #2c7ae1;
 box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
 justify-content: space-between;
 align-items: center;
}

@media screen and (min-width: 2559px) {
 header {
  height: 8vh;
 }
}

@media screen and (min-width: 3439px) {
 header {
  height: 6vh;
 }
}

@media screen and (max-width: 1279px) {
 header {
  height: 15vh;
 }
}
/* 2048×1080 2K */
/* 2560x1440 3K */
/* 3840 Х 2160 */
</style>
