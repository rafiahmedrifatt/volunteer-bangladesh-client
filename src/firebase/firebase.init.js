import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAfXjMYYIS_D-wVPQAS1Kx8ynBf3_Umiu8",
    authDomain: "volunteer-management-project.firebaseapp.com",
    projectId: "volunteer-management-project",
    storageBucket: "volunteer-management-project.firebasestorage.app",
    messagingSenderId: "140690850935",
    appId: "1:140690850935:web:e4a38c99a4dc5f362d7272"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);