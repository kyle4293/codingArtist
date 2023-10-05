// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvFpgx2vL0ivDQvrPrGwysXB4aWTXaPL0",
    authDomain: "sparta-1730c.firebaseapp.com",
    projectId: "sparta-1730c",
    storageBucket: "sparta-1730c.appspot.com",
    messagingSenderId: "347762079276",
    appId: "1:347762079276:web:f810e63af91fcaaa23c389",
    measurementId: "G-SJ8YR6BE0H"
};


// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);