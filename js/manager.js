let allCodes = {}; // cache toàn bộ data
let currentFilter = "all"; // filter mặc định

const tabs = document.querySelectorAll("#tabs .tab-btn");
tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    // active tab
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderCodes();
  });
});

function renderCodes() {
  codeListElem.innerHTML = "";
  Object.entries(allCodes).forEach(([key, item]) => {
    // logic lọc
    if (
      currentFilter === "all" ||
      (currentFilter === "other" && !["modded", "vanilla", "beta"].includes(item.type)) ||
      item.type === currentFilter
    ) {
      const div = document.createElement("div");
      div.className = "code-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="code-info">
          <h3>${item.title} (${item.type})</h3>
          <p>Ngày: ${item.date}</p>
          <p>Package: ${item.pack}</p>
          <a href="${item.code}" target="_blank">Tải xuống</a><br>
          <div class="action-btns">
            <button class="edit-btn">Sửa</button>
            <button class="delete-btn">Xóa</button>
          </div>
        </div>
      `;
      div.querySelector(".edit-btn").onclick = () => {
        editingId = key;
        document.getElementById("codeTitle").value = item.title;
        document.getElementById("codeName").value = item.name;
        document.getElementById("codePack").value = item.pack;
        document.getElementById("codeUrl").value = item.code;
        document.getElementById("codeDate").value = item.date;
        document.getElementById("codeImage").value = item.image;
        document.getElementById("codeType").value = item.type;
        modal.style.display = "flex";
      };
      div.querySelector(".delete-btn").onclick = async () => {
        if (confirm("Xác nhận xóa?")) {
          await remove(ref(db, `code/${key}`));
        }
      };
      codeListElem.appendChild(div);
    }
  });
}

function loadCodes() {
  onValue(ref(db, "code"), (snapshot) => {
    allCodes = snapshot.val() || {};
    renderCodes();  // hiển thị theo filter hiện tại
  });
}


loadCodes();
