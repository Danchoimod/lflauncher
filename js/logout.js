const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "index.html"; // hoặc đường dẫn tới trang đăng nhập
}
document.getElementById("logoutBtn").addEventListener("click", () => {
  if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // hoặc về trang đăng nhập
  }
});