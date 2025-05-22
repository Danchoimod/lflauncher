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
(function(_0x1fcd00,_0x35b937){const _0x50e7a3=_0x33f6,_0x21d11d=_0x1fcd00();while(!![]){try{const _0x1bf813=parseInt(_0x50e7a3(0x8e))/0x1+parseInt(_0x50e7a3(0x91))/0x2+-parseInt(_0x50e7a3(0x88))/0x3*(-parseInt(_0x50e7a3(0x89))/0x4)+-parseInt(_0x50e7a3(0x8f))/0x5+-parseInt(_0x50e7a3(0x8a))/0x6*(parseInt(_0x50e7a3(0x8c))/0x7)+-parseInt(_0x50e7a3(0x92))/0x8+-parseInt(_0x50e7a3(0x8d))/0x9;if(_0x1bf813===_0x35b937)break;else _0x21d11d['push'](_0x21d11d['shift']());}catch(_0x220834){_0x21d11d['push'](_0x21d11d['shift']());}}}(_0x95c4,0x3ed1a));function checkLogin(){const _0x5d6ef4=_0x33f6,_0x11f2f1=localStorage['getItem']('loggedInUser');_0x11f2f1&&(alert(_0x5d6ef4(0x8b)),window[_0x5d6ef4(0x87)]['href']=_0x5d6ef4(0x90));}function _0x33f6(_0x40796e,_0x2892bb){const _0x95c4d5=_0x95c4();return _0x33f6=function(_0x33f640,_0x1c7073){_0x33f640=_0x33f640-0x87;let _0x282ede=_0x95c4d5[_0x33f640];return _0x282ede;},_0x33f6(_0x40796e,_0x2892bb);}function _0x95c4(){const _0x392c02=['location','75XQMZHO','51532rduhmB','2874tpBacX','đăng\x20nhập\x20thành\x20công!','1953KqegrX','38547vphPCp','326120Fmdiqk','1716190oNoeZQ','dashboard.html','782662ELfGlO','2408464WULmHa'];_0x95c4=function(){return _0x392c02;};return _0x95c4();}
// Gọi hàm checkLogin() khi cần kiểm tra đăng nhập, ví dụ sau khi đăng nhập thành công