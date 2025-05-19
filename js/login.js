import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const closeBtn = loginModal.querySelector('.modal-close');

    // Đóng modal khi bấm nút close
    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        loginModal.setAttribute('aria-hidden', 'true');
        loginMessage.textContent = '';
        loginForm.reset();
    });

    loginForm.addEventListener('submit', async e => {
        e.preventDefault();

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, `Manager/${username}`));
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data.password === password) {
                    loginMessage.style.color = 'green';
                    loginMessage.textContent = 'Đăng nhập thành công!';
                    if (data.password === password) {
                        loginMessage.style.color = 'green';
                        loginMessage.textContent = 'Đăng nhập thành công!';
                        // ✅ Lưu thông tin vào localStorage
                        localStorage.setItem('loggedInUser', JSON.stringify({
                            username: username
                        }));

                        // ✅ Chuyển trang
                        window.location.href = 'admin.html';
                    }

                    // Thêm hành động sau đăng nhập thành công ở đây, ví dụ chuyển trang
                    setTimeout(() => {
                        loginModal.style.display = 'none';
                        loginModal.setAttribute('aria-hidden', 'true');
                        loginMessage.textContent = '';
                        loginForm.reset();
                    }, 1500);
                } else {
                    loginMessage.style.color = 'red';
                    loginMessage.textContent = 'Sai mật khẩu!';
                }
            } else {
                loginMessage.style.color = 'red';
                loginMessage.textContent = 'Tên đăng nhập không tồn tại!';
            }
        } catch (error) {
            loginMessage.style.color = 'red';
            loginMessage.textContent = 'Lỗi kết nối, vui lòng thử lại!';
            console.error(error);
        }
    });
});
