    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById('supportModal');
      const openBtn = document.getElementById('openSupportFormBtn');
      const closeBtn = modal.querySelector('.modal-close');
      const modalForm = document.getElementById('modalSupportForm');
      const modalResponse = document.getElementById('modalFormResponse');

      openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('input').focus();
      });

      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modalResponse.textContent = '';
        modalForm.reset();
        openBtn.focus();
      });

      window.addEventListener('click', e => {
        if (e.target === modal) closeBtn.click();
      });

      modalForm.addEventListener('submit', e => {
        e.preventDefault();
        modalResponse.textContent = 'Đang gửi yêu cầu...';
        setTimeout(() => {
          modalResponse.textContent = 'Cảm ơn bạn! Yêu cầu đã được gửi.';
          modalForm.reset();
        }, 1500);
      });
    });