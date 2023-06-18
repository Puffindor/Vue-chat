<template>
 <div class="auth-container">
  <form>
   <div class="form-el">
    <label for="name" :class="{ invalid: userEmailValidity === 'invalid' }"
     >Email</label
    >
    <input
     v-model.trim="userName"
     id="name"
     :class="{ invalid: userEmailValidity === 'invalid' }"
     @blur="emailValidation"
    />
   </div>
   <div class="form-el">
    <label :class="{ invalid: userPasswordValidity === 'invalid' }" for="name"
     >Password</label
    >
    <input
     v-model.trim="userPassword"
     id="name"
     :class="{ invalid: userPasswordValidity === 'invalid' }"
     @blur="passwordValidation"
    />
   </div>
  </form>
  <div class="btn-container">
   <button @click="register" class="btn-reg">Register</button>
   <button @click="singIn" class="btn-sign">Sign In</button>
  </div>
 </div>
</template>

<script>
import db from "@/firebase";
import { ref, set, onValue } from "firebase/database";
export default {
 data() {
  return {
   userName: "",
   userPassword: "",
   userPasswordValidity: "pending",
   userEmailValidity: "pending",
  };
 },
 methods: {
  test() {
   const names = [];
   const starCountRef = ref(db, "users/");
   onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    Object.values(data).forEach((el) => names.push(el.username));
    console.log(names);
   });
  },
  passwordValidation() {
   if (this.userPassword === "" || this.userPassword.length < 6) {
    this.userPasswordValidity = "invalid";
   } else {
    this.userPasswordValidity = "valid";
   }
  },
  emailValidation() {
   if (this.userName.includes("@")) {
    this.userEmailValidity = "valid";
   } else {
    this.userEmailValidity = "invalid";
   }
  },
  register() {
   if (
    this.userPasswordValidity === "valid" &&
    this.userEmailValidity === "valid"
   ) {
    this.$store.dispatch("register", {
     userName: this.userName,
     userPassword: this.userPassword,
    });
    this.userName = "";
    this.userPassword = "";
   }
  },
  singIn() {
   if (
    this.userPasswordValidity === "valid" &&
    this.userEmailValidity === "valid"
   ) {
    this.$store.dispatch("signIn", {
     userName: this.userName,
     userPassword: this.userPassword,
    });

    this.userName = "";
    this.userPassword = "";
   }
  },
 },
};
</script>

<style lang="scss" scoped>
@mixin btn {
 cursor: pointer;
 font-family: "Poppins", sans-serif;
 font-weight: 600;
 margin-left: 20px;
 color: white;
 font-size: 16px;
 width: 20%;
 border-style: hidden;
 border-radius: 10px;
}
.auth-container {
 display: flex;
 flex-direction: column;
 width: 25%;
 height: 45%;
 background: #e8eaed;
 border-radius: 10px;

 .btn-container {
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0px 20px 20px 0px;

  .btn-reg {
   @include btn;
   height: 55%;
   background-color: #c5c9d3;
  }
  .btn-sign {
   @include btn;
   height: 55%;
   background-color: #4293fc;
  }
  .btn-reg:hover {
   @include btn;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   transition: 200ms;
   background-color: #888b93;
  }
  .btn-sign:hover {
   @include btn;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   transition: 200ms;
   background-color: #266dcb;
  }
 }
 input {
  font-family: "Poppins", sans-serif;
  margin-top: 6px;
  width: 100%;
  height: 100%;
  border-style: hidden;
  background: #c5c9d3;
  border-radius: 10px;
  outline: none;
  font-size: 18px;
  padding: 7px;
 }
 input.invalid {
  box-sizing: border-box;
  outline: 3px solid rgba(255, 0, 0, 0.59);
 }
 input:hover {
  transition: 400ms;
  background: #a6a9b1;
 }
 form {
  display: flex;
  height: 80%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .form-el {
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 85%;
   height: 16%;
   margin-top: 25px;
   align-items: flex-start;
   label {
    font-family: "Poppins", sans-serif;
    color: #4e4c4c;
   }
   label.invalid {
    font-family: "Poppins", sans-serif;
    color: rgba(255, 0, 0, 0.59);
   }
  }
 }
}

@media screen and (max-width: 1281px) {
 .form-el {
  margin: 15px;
 }
 .btn-reg {
  @include btn;
  height: 70% !important;
  width: 30% !important;
 }
 .btn-sign {
  @include btn;
  height: 70% !important;
  width: 30% !important;
 }
}
@media screen and (min-width: 2559px) {
 .auth-container {
  height: 30%;
 }
}

@media screen and (min-width: 3439px) {
 .auth-container {
  height: 25%;
  width: 20%;
 }
}
/* 2048×1080 2K */
/* 2560x1440 3K */
/* 3840 Х 2160 */
</style>
