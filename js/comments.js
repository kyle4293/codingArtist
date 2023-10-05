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

$("#submit").click(async function () {
    let content = $("#content").val();
    let username = $("#username").val();
    let password = $("#password").val();
    var date = new Date().getTime();

    let comment = {
        'content': content,
        'username': username,
        'password': password,
        'date': date
    };
    const res = await addDoc(collection(db, "comments"), comment);
    window.location.reload();
})

let docs = await getDocs(collection(db, "comments"));
docs.forEach((doc) => {
    let row = doc.data();

    let content = row['content'];
    let username = row['username'];
    let password = row['password'];
    let datetime = new Date(row['date']);
    let date = dateFormat(datetime);
    console.log(row);
    let temp_html = `
    <div class="card my-4">
        <div class="card-body">
            <div class="card-text">${content}</div>
            <div class="d-flex justify-content-end">
                <div class="badge bg-light text-dark p-2 text-start">
                    <div class="mb-2">${username}</div>
                    <div>${date}</div>
                    <div class="my-3">
                        <a href="{% url 'nagne:comment_modify' comment.id  %}" class="btn btn-sm btn-outline-secondary">수정</a>
                        <a href="#" class="delete btn btn-sm btn-outline-secondary "
                            data-uri="{% url 'nagne:comment_delete' comment.id  %}">삭제</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    $('#card').append(temp_html);
}); 

function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}