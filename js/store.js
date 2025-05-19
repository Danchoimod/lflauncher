
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getDatabase, ref, onValue, set, push, update, remove } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDbeiGpq8bCGIHT0f1pg3eLmxmnFKLuUqQ",
    authDomain: "lflauncher.firebaseapp.com",
    databaseURL: "https://lflauncher-default-rtdb.firebaseio.com",
    projectId: "lflauncher",
    storageBucket: "lflauncher.appspot.com",
    messagingSenderId: "528661623395",
    appId: "1:528661623395:web:0b2322ba830548dc2b3e56"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const openBtn = document.getElementById("openFormBtn");
  const modal = document.getElementById("formModal");
  const closeBtn = document.getElementById("closeFormBtn");
  const submitBtn = document.getElementById("submitBtn");
  const imageInput = document.getElementById("marketImageFile");
  const imageUrl = document.getElementById("marketImageUrl");
  const previewImage = document.getElementById("previewImage");
  const marketList = document.getElementById("marketList");

  let editingId = null;
  let base64Image = "";
  let currentFilter = "all"; // lọc hiện tại

  openBtn.onclick = () => { clearForm(); modal.style.display = "flex"; };
  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      base64Image = reader.result;
      previewImage.src = base64Image;
      imageUrl.value = "";
    };
    reader.readAsDataURL(file);
  });

  imageUrl.addEventListener("input", () => {
    if (imageUrl.value) {
      previewImage.src = imageUrl.value;
      base64Image = "";
    }
  });

  function clearForm() {
    editingId = null;
    base64Image = "";
    ["marketName", "marketDescription", "marketDisplay", "marketLink", "marketOwner", "marketVersion", "marketImageUrl"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("marketType").value = "Addon";
    document.getElementById("marketRate").value = "";
    previewImage.src = "";
    imageInput.value = "";
  }

  submitBtn.onclick = async () => {
    const data = {
      name: document.getElementById("marketName").value,
      description: document.getElementById("marketDescription").value,
      display: document.getElementById("marketDisplay").value,
      link: document.getElementById("marketLink").value,
      owner: document.getElementById("marketOwner").value,
      version: document.getElementById("marketVersion").value,
      type: document.getElementById("marketType").value,
      dfrate: Number(document.getElementById("marketRate").value) || 0,
      imagelink: base64Image || imageUrl.value
    };

    if (!data.name || !data.link) return alert("Vui lòng nhập tên và link!");

    if (editingId) {
      await update(ref(db, `market/${editingId}`), data);
    } else {
      const newRef = push(ref(db, "market"));
      data.id = newRef.key;
      await set(newRef, data);
    }

    modal.style.display = "none";
    clearForm();
  };

  function renderList(snapshot) {
    marketList.innerHTML = "";
    const data = snapshot.val();
    if (!data) return;

    Object.entries(data).forEach(([id, item]) => {
      if (currentFilter !== "all" && item.type !== currentFilter) return;

      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <img src="${item.imagelink}" alt="${item.name}" />
        <div class="info">
          <h3>${item.name}</h3>

          <p>Version: ${item.version} | Type: ${item.type}</p>
          <p>By: ${item.owner}</p>
          <a href="${item.link}" target="_blank">Tải về</a>
          <div class="action-btns">
            <button class="edit-btn">Sửa</button>
            <button class="delete-btn">Xóa</button>
          </div>
        </div>`;
//          <p>${item.description}</p>
      div.querySelector(".edit-btn").onclick = () => {
        editingId = id;
        document.getElementById("marketName").value = item.name;
        document.getElementById("marketDescription").value = item.description;
        document.getElementById("marketDisplay").value = item.display;
        document.getElementById("marketLink").value = item.link;
        document.getElementById("marketOwner").value = item.owner;
        document.getElementById("marketVersion").value = item.version;
        document.getElementById("marketType").value = item.type;
        document.getElementById("marketRate").value = item.dfrate;
        base64Image = item.imagelink.startsWith("data:") ? item.imagelink : "";
        previewImage.src = item.imagelink;
        imageUrl.value = item.imagelink.startsWith("data:") ? "" : item.imagelink;
        modal.style.display = "flex";
      };

      div.querySelector(".delete-btn").onclick = async () => {
        if (confirm("Xác nhận xóa?")) await remove(ref(db, `market/${id}`));
      };

      marketList.appendChild(div);
    });
  }

  // Thêm tab filter
  const section = document.querySelector("section");
  const tabs = document.createElement("div");
  tabs.id = "tabs";
  tabs.style.marginBottom = "15px";
  tabs.innerHTML = `
    <button class="tab-btn active" data-filter="all">Tất cả</button>
    <button class="tab-btn" data-filter="Addon">Addon</button>
    <button class="tab-btn" data-filter="Maps">Maps</button>
    <button class="tab-btn" data-filter="Textures">Textures</button>
    <button class="tab-btn" data-filter="Skins">Skins</button>
    <button class="tab-btn" data-filter="Other">Khác</button>
  `;
  section.insertBefore(tabs, marketList);

  // Gắn sự kiện cho tab
  tabs.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      onValue(ref(db, "market"), renderList);
    });
  });

  onValue(ref(db, "market"), renderList);

  // Kiểm tra đăng nhập
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "index.html";
  }
