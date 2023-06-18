import { createStore } from "vuex";
import { ref, set, push, onValue } from "firebase/database";
import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
} from "firebase/auth";
import db from "@/firebase";
export default createStore({
 state() {
  return {
   contacts: [],
   chats: [],
   contactsIds: [],
   idToken: "",
   email: "",
   userId: "",
   selectedChat: "",
   erorrMassage: "",
  };
 },
 getters: {
  getChats(state) {
   return state.chats;
  },
  getErrorMassage(state) {
   return state.erorrMassage;
  },
  getContacts(state) {
   return state.contacts;
  },
  getContactsIds(state) {
   return state.contactsIds;
  },
  getSelectedChat(state) {
   return state.selectedChat.id;
  },
  getUserId(state) {
   return state.userId;
  },
  userEmail(state) {
   return state.email;
  },
 },
 actions: {
  getChats(context) {
   const contactsRef = ref(db, "Users/" + this.state.userId + "/chats");
   onValue(contactsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
     context.commit("getChats", Object.values(data));
    }
   });
  },
  clearError(context) {
   context.commit("clearError");
  },
  getContacts(context) {
   const contactsRef = ref(db, "Users/" + this.state.userId + "/contacts");
   onValue(contactsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
     context.commit("getContacts", Object.values(data));
     context.commit("getContactsIds", Object.keys(data));
    }
   });
  },
  addContact(_, payload) {
   set(ref(db, "Users/" + this.state.userId + "/contacts/" + payload.id), {
    name: payload.name,
    id: payload.id,
   });
  },
  sendMassage(_, payload) {
   const newMassage = ref(
    db,
    "Chats/" + this.state.userId + "/" + this.state.selectedChat.id
   );
   const newMassageRef = push(newMassage);
   set(newMassageRef, {
    text: payload.text,
    from: payload.from,
   });

   set(
    ref(
     db,
     "Users/" + this.state.userId + "/chats/" + this.state.selectedChat.id
    ),
    {
     name: this.state.selectedChat.name,
     id: this.state.selectedChat.id,
    }
   );

   set(
    ref(
     db,
     "Users/" + this.state.selectedChat.id + "/chats/" + this.state.userId
    ),
    {
     name: this.state.email,
     id: this.state.userId,
    }
   );

   const newMassage2 = ref(
    db,
    "Chats/" + this.state.selectedChat.id + "/" + this.state.userId
   );
   const newMassageRef2 = push(newMassage2);
   set(newMassageRef2, {
    text: payload.text,
    from: payload.from,
   });
  },
  selectContact(context, payload) {
   if (payload.name && payload.id) {
   }
   context.commit("selectContact", payload);
  },
  logout(context) {
   context.commit("logout");
  },
  signIn(context, payload) {
   signInWithEmailAndPassword(getAuth(), payload.userName, payload.userPassword)
    .then((userCredential) => {
     localStorage.setItem("email", userCredential.user.email);
     localStorage.setItem("id", userCredential.user.uid);
     localStorage.setItem("token", userCredential.user.accessToken);

     context.commit("setUser", userCredential);
    })
    .catch((error) => context.commit("setError", error.message));
  },
  autoLogin(context) {
   const email = localStorage.getItem("email");
   const token = localStorage.getItem("token");
   const id = localStorage.getItem("id");
   if (email && token && id) {
    context.commit("autoSetUser", { token: token, email: email, id: id });
   }
  },
  register(context, payload) {
   createUserWithEmailAndPassword(
    getAuth(),
    payload.userName,
    payload.userPassword
   )
    .then((userCredential) => {
     localStorage.setItem("email", userCredential.user.email);
     localStorage.setItem("id", userCredential.user.uid);
     localStorage.setItem("token", userCredential.user.accessToken);
     context.commit("setUser", userCredential);
     set(ref(db, "Users/" + userCredential.user.uid), {
      name: userCredential.user.email,
      id: userCredential.user.uid,
      contacts: [],
     });
    })
    .catch((error) => context.commit("setError", error.message));
  },
 },
 mutations: {
  getChats(state, payload) {
   state.chats = payload;
  },
  getContacts(state, payload) {
   state.contacts = payload.filter((el) => el.id !== state.userId);
  },
  getContactsIds(state, payload) {
   state.contactsIds = payload.filter((el) => el !== state.userId);
  },
  selectContact(state, payload) {
   state.selectedChat = payload;
  },
  logout(state) {
   state.email = "";
   state.idToken = "";
   localStorage.removeItem("email");
   localStorage.removeItem("token");
   localStorage.removeItem("id");
  },
  autoSetUser(state, payload) {
   state.idToken = payload.token;
   state.userId = payload.id;
   state.email = payload.email;
  },
  setUser(state, payload) {
   state.idToken = payload.user.accessToken;
   state.userId = payload.user.uid;
   state.email = payload.user.email;
  },
  setError(state, payload) {
   state.erorrMassage = payload;
  },
  clearError(state) {
   state.erorrMassage = "";
  },
 },
});
