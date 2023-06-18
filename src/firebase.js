import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
 apiKey: "AIzaSyDsUcosq4b0TP6gYDRLxNmfUh9LqiAamPc",
 authDomain: "vue-chat-71a26.firebaseapp.com",
 databaseURL: "https://vue-chat-71a26-default-rtdb.firebaseio.com",
 projectId: "vue-chat-71a26",
 storageBucket: "vue-chat-71a26.appspot.com",
 messagingSenderId: "170675291082",
 appId: "1:170675291082:web:94a472b68bcf4853894533",
 measurementId: "G-DGDC7LQ5N9",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
