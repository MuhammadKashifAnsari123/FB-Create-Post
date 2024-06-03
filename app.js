// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { set, ref, push, getDatabase, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTBboCyTNQmEgg7pF8Spk0PuU2fez6nH0",
    authDomain: "postapp-ad8f0.firebaseapp.com",
    projectId: "postapp-ad8f0",
    storageBucket: "postapp-ad8f0.appspot.com",
    messagingSenderId: "206109118722",
    appId: "1:206109118722:web:dc894d3fb6f1355a97f21b",
    measurementId: "G-VJ3EFM42EF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var UserName = document.getElementById('UserName');
var UserUrl = document.getElementById('UserUrl');
var postUrl = document.getElementById('postUrl');
var description = document.getElementById('description');
var parent = document.getElementById('parent');
var allTask;
window.addData = function () {
    var newTaskRef = push(ref(db, "tasks"));
    var obj = {
        id: newTaskRef.key,
        UserName: UserName.value,
        UserUrl: UserUrl.value,
        postUrl: postUrl.value,
        description: description.value
    };

    UserName.value = '';
    UserUrl.value = '';
    postUrl.value = '';
    description.value = '';

    set(newTaskRef, obj);
};

window.DeletePost = function (taskId) {
    var reference = ref(db, `tasks/${taskId}`);
    remove(reference);
};

function getData() {
    const reference = ref(db, "tasks/");
    onValue(reference, function (taskData) {
        allTask = taskData.val();
        if (allTask) {
            var arr = Object.values(allTask);
            parent.innerHTML = '';
            for (var i = 0; i < arr.length; i++) {
                var task = arr[i];
                parent.innerHTML += `<div class="post mb-3 bg-white rounded shadow-sm">
                    <div class="post-header p-3">
                        <img width="50px" class="rounded-circle" src="${task.UserUrl}" alt="">
                        <div>
                            <h5 class="mb-0">${task.UserName}</h5>
                            <p class="text-muted mb-0">${moment(task.timestamp).fromNow()}</p>
                        </div>
                    </div>
                    <div class="post-body p-3">
                        <p>${task.description}</p>
                        <img src="${task.postUrl}" class="img-fluid rounded" alt="">
                    </div>
                    <div class="post-actions p-3">
                        <button class='btn btn-light'>Like</button>
                        <button class='btn btn-light'>Comment</button>
                        <button onclick="DeletePost('${task.id}')" class='btn btn-danger'>Delete</button>
                    </div>
                </div>`;
            }
        }
    });
}

getData();
