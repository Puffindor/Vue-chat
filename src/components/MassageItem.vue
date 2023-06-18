<template>
 <div class="cont">
  <div class="massage">{{ text }}</div>
 </div>
</template>

<script>
export default {
 props: ["text", "id"],

 computed: {
  color() {
   if (this.$store.getters.getUserId === this.id) {
    return "#2C7AE1";
   } else {
    return "#C5C9D3";
   }
  },
  position() {
   if (this.$store.getters.getUserId === this.id) {
    return "flex-end";
   } else {
    return "flex-start";
   }
  },
 },
};
</script>
<style lang="scss" scoped>
.cont {
 width: 100%;
 height: 100%;
 display: inline-flex;
 justify-content: v-bind(position);
}
.massage {
 font-family: "Poppins", sans-serif;
 color: white;
 font-size: 16px;
 display: inline-flex;
 max-width: 80%;
 hyphens: auto;
 background-color: v-bind(color);
 border-radius: 10px;
 padding: 10px;
 margin: 10px;
}
</style>
