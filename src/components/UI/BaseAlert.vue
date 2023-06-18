<template>
 <div class="alert-out">
  <div class="alert-in">
   <p>
    {{ this.$store.getters.getErrorMassage }}
   </p>
   <button @click="clearError">Dismis</button>
  </div>
 </div>
</template>

<script>
export default {
 methods: {
  clearError() {
   this.$store.dispatch("clearError");
  },
 },
};
</script>

<style lang="scss" scoped>
.alert-in {
 display: flex;
 font-family: "Poppins", sans-serif;
 font-size: 18px;
 color: #c62828;
 padding: 24px;
 width: 30%;
 height: 30%;
 background: #e8eaed;
 border-radius: 10px;
 flex-direction: column;
 justify-content: space-between;
 align-items: flex-end;
 p {
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100%;
  color: #c62828;
  background-color: #fbe9e7;
  border-radius: 5px;
 }
 button {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  width: 20%;
  height: 15%;
  border-style: hidden;
  background: #d32f2f;
  border-radius: 10px;
 }
 button:hover {
  transition: 200ms;
  background: #c80404;
 }
}
.alert-out {
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100vw;
 height: 100vh;
 position: fixed;
 background-color: rgba(0, 0, 0, 0.528);
}
</style>
