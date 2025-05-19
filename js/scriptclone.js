// Parallax scroll effect
document.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const layerBack = document.querySelector('.layer-back');
  const layerMid = document.querySelector('.layer-mid');
  const layerFront = document.querySelector('.layer-front');
  
  if (layerBack) layerBack.style.transform = `translateY(${scrollY * 0.1}px)`;
  if (layerMid) layerMid.style.transform = `translateY(${scrollY * 0.25}px)`;
  if (layerFront) layerFront.style.transform = `translateY(${scrollY * 0.4}px)`;
});

// Animate elements on scroll
const animateOnScrollElems = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
animateOnScrollElems.forEach(el => observer.observe(el));

// Accordion FAQ
const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach(acc => {
  acc.addEventListener('click', () => {
    const expanded = acc.getAttribute('aria-expanded') === 'true';
    acc.setAttribute('aria-expanded', !expanded);
    const body = acc.nextElementSibling;
    if (!expanded) {
      body.classList.add('open');
    } else {
      body.classList.remove('open');
    }
  });
});

// Modal Login
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const modalCloseBtn = loginModal.querySelector('.modal-close');

loginBtn.addEventListener('click', () => {
  loginModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  loginModal.querySelector('#username').focus();
});

modalCloseBtn.addEventListener('click', closeModal);
loginModal.addEventListener('click', e => {
  if(e.target === loginModal) closeModal();
});

function closeModal() {
  loginModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Theme toggle
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if(document.body.classList.contains('light-theme')) {
    themeToggleBtn.textContent = '🌙';
  } else {
    themeToggleBtn.textContent = '☀️';
  }
});

// Responsive menu toggle
const btnMenuToggle = document.querySelector('.btn-menu-toggle');
const navList = document.querySelector('.nav-list');
btnMenuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});
// Kiểm tra đăng nhập
function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        alert("đăng nhập thành công!");
        // Chuyển hướng đến trang admin
        window.location.href = "admin.html"; // hoặc đường dẫn tới trang đăng nhập
    }
}
// Gọi hàm checkLogin() khi cần kiểm tra đăng nhập, ví dụ sau khi đăng nhập thành công