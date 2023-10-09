// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, query, where, doc, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, deleteDoc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

var cnt = 0;
let docs = await getDocs(collection(db, "comments"));
docs.forEach((doc) => {
    let row = doc.data();
    cnt++;

    let content = row['content'];
    let username = row['username'];
    let password = row['password'];
    let datetime = new Date(row['date']);
    let date = dateFormat(datetime);
    let id = doc.id;

    let temp_html = `
    <div class="commentFrame card my-4">
        <div class="commentForm card-body">
            <div class="card-text">${content}</div>
            <div class="d-flex justify-content-end">
                <div class="badge bg-light text-dark p-2 text-start">
                    <div class="mb-2">${username}</div>
                    <div>${date}</div>
                    <div class="my-3">
                        <a class="modify btn btn-sm btn-outline-secondary" value="${id}">수정</a>
                        <a class="del btn btn-sm btn-outline-secondary" value="${id}">삭제</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    $('#card').append(temp_html);
});
$('#commentCnt').text(cnt + "개의 글이 있습니다.");


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

$('.del').click(async function () {
    let id = $(this).attr("value");
    let password = prompt('비밀번호를 입력해주세요');

    // id값으로 데이터 한 개만 가져오기
    const commentRef = doc(db, "comments", id);
    const comment = await getDoc(commentRef);
    const realPassword = comment.data()['password'];

    if (realPassword == password) {
        deleteDoc(commentRef);
        setTimeout(function () { // 바로 reload하면 데이터 삭제가 이루어지지 않아서 지연 사용
            alert('삭제 성공');
            location.reload();
        }, 200);
    } else {
        alert('비밀번호가 틀렸습니다.');
    }
})

$('.modify').click(async function () {
    let id = $(this).attr("value");
    let password = prompt('비밀번호를 입력해주세요');

    const commentRef = doc(db, "comments", id);
    const comment = await getDoc(commentRef);
    const realPassword = comment.data()['password'];
    const content = comment.data()['content'];

    if (realPassword == password) {
        console.log(1);
        let template = `
        <textarea class="form-control" rows="4" placeholder="방명록을 작성하세요.">${content}</textarea>
        <button type="button" class="modBtn btn btn-primary" value="${id}">수정완료</button>
        `;
        const htmlBefore = $(this).parents('.commentForm');
        console.log();
        const htmlAfter = $(this).parents('.commentFrame');
        htmlBefore.remove();
        htmlAfter.append(template);
    } else {
        alert('비밀번호가 틀렸습니다.');
    }
});

$('.commentFrame').on('click', ".modBtn", async function () {
    let content = $(this).prev().val();
    let id = $(this).attr('value');

    if (!content) {
        alert('내용을 입력해주세요');
    }

    const commentRef = doc(db, "comments", id);

    await updateDoc(commentRef, {
        content: content,
    });
    setTimeout(function () { // 바로 reload하면 데이터 수정이 이루어지지 않아서 지연 사용
        alert('수정이 완료되었습니다.');
        location.reload();
    }, 200);
});