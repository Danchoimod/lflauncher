import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbeiGpq8bCGIHT0f1pg3eLmxmnFKLuUqQ",
    authDomain: "lflauncher.firebaseapp.com",
    databaseURL: "https://lflauncher-default-rtdb.firebaseio.com",
    projectId: "lflauncher",
    storageBucket: "lflauncher.firebasestorage.app",
    messagingSenderId: "528661623395",
    appId: "1:528661623395:web:0b2322ba830548dc2b3e56",
    measurementId: "G-617X1TP66E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

let editId = null;
const postListElem = document.getElementById("postList");
// Kiểm tra đăng nhập


function getPosts(callback) {
    const postsRef = ref(db, "posts");
    onValue(postsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const posts = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        posts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        callback(posts);
    });
}

async function savePost(post) {
    if (post.id) {
        const postRef = ref(db, `posts/${post.id}`);
        await update(postRef, {
            title: post.title,
            content: post.content,
            image: post.image,
            createdAt: Date.now()
        });
    } else {
        const postsRef = ref(db, "posts");
        const newPostRef = push(postsRef);
        await set(newPostRef, {
            title: post.title,
            content: post.content,
            image: post.image,
            createdAt: Date.now()
        });
    }
}

async function deletePost(id) {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    const postRef = ref(db, `posts/${id}`);
    await remove(postRef);
    alert("Xóa bài viết thành công!");
}

function renderPosts() {
    getPosts((posts) => {
        postListElem.innerHTML = "";
        posts.forEach(post => {
            const dateStr = post.createdAt ? new Date(post.createdAt).toLocaleString() : "Chưa có ngày";

            const div = document.createElement("div");
            div.className = "code-item"; // đổi từ 'post' sang 'code-item' để hiển thị dạng grid

            div.innerHTML = `
                <img src="${post.image}" alt="Ảnh bài viết" />
                <div class="code-info">
                    <h3>${post.title}</h3>
                    <div class="date">${dateStr}</div>
                    <p>${post.content}</p>
                    <div class="action-btns">
                        <button class="edit-btn" onclick="editPost('${post.id}');document.getElementById('postFormModal').style.display = 'flex';">Sửa</button>
                        <button class="delete-btn" onclick="deletePost('${post.id}')">Xóa</button>
                    </div>
                </div>
            `;

            postListElem.appendChild(div);
        });
    });
}


function editPost(id) {
    const postRef = ref(db, `posts/${id}`);
    onValue(postRef, (snapshot) => {
        const post = snapshot.val();
        if (!post) return alert("Bài viết không tồn tại");

        document.getElementById("title").value = post.title;
        document.getElementById("content").value = post.content;
        document.getElementById("imageURL").value = post.image.startsWith("data:") ? "" : post.image;
        document.getElementById("imageInput").value = "";

        editId = id;
        document.getElementById("submitBtn").textContent = "Cập nhật bài viết";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, { onlyOnce: true });
}

async function submitPost() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageInput = document.getElementById("imageInput");
    const imageURL = document.getElementById("imageURL").value.trim();

    if (!title || !content) {
        alert("Vui lòng nhập tiêu đề và nội dung.");
        return;
    }

    const handleSave = async (imageData) => {
        await savePost({
            id: editId,
            title,
            content,
            image: imageData
        });
        editId = null;
        document.getElementById("submitBtn").textContent = "Thêm bài viết";
        clearForm();
        alert("Lưu bài viết thành công!");
        renderPosts();
    };

    if (imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            handleSave(e.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else if (imageURL) {
        handleSave(imageURL);
    } else {
        if (editId) {
            const postRef = ref(db, `posts/${editId}`);
            onValue(postRef, (snapshot) => {
                const oldImage = snapshot.val()?.image || "";
                handleSave(oldImage);
            }, { onlyOnce: true });
        } else {
            alert("Vui lòng chọn ảnh từ máy hoặc dán URL ảnh.");
        }
    }
}


function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("imageInput").value = "";
    document.getElementById("imageURL").value = "";
}

renderPosts();

window.submitPost = submitPost;
window.editPost = editPost;
window.deletePost = deletePost;

      document.getElementById('openPostFormBtn').onclick = function() {
        document.getElementById('postFormModal').style.display = 'flex';
      };
      document.getElementById('closePostFormBtn').onclick = function() {
        document.getElementById('postFormModal').style.display = 'none';
      };
      window.onclick = function(event) {
        const modal = document.getElementById('postFormModal');
        if (event.target === modal) modal.style.display = 'none';
      };