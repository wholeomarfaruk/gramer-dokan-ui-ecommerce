/* ============================================
   GRAMER DOKAN — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Hero Slider ── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.slider-dot');
  let current  = 0;
  let autoPlay;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAutoPlay() {
    autoPlay = setInterval(() => goToSlide(current + 1), 4500);
  }

  document.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.addEventListener('click', () => { clearInterval(autoPlay); goToSlide(i); startAutoPlay(); });
  });
  document.querySelector('.arrow-prev')?.addEventListener('click', () => { clearInterval(autoPlay); goToSlide(current - 1); startAutoPlay(); });
  document.querySelector('.arrow-next')?.addEventListener('click', () => { clearInterval(autoPlay); goToSlide(current + 1); startAutoPlay(); });

  if (slides.length) startAutoPlay();

  /* ── Mobile Menu Toggle ── */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav     = document.querySelector('.navbar-nav');
  menuBtn?.addEventListener('click', () => nav?.classList.toggle('open'));

  /* ── Sticky Header Shadow ── */
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ── Wishlist Toggle ── */
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
      }
    });
  });

  /* ── Add to Cart Feedback ── */
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Added';
      this.style.background = 'var(--clr-green)';
      this.style.color = '#fff';
      setTimeout(() => {
        this.innerHTML = original;
        this.style.background = '';
        this.style.color = '';
      }, 1500);
      updateCartCount();
    });
  });

  function updateCartCount() {
    const badge = document.querySelector('.cart-btn .badge-count');
    if (badge) badge.textContent = parseInt(badge.textContent || '0') + 1;
  }

  /* ── Search Suggestions (stub) ── */
  const searchInput = document.querySelector('.search-form input');
  searchInput?.addEventListener('input', function () {
    // Hook into Laravel search API here
    // e.g. fetch(`/api/search?q=${this.value}`)
  });

  /* ── Category filter chips ── */
  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ── Lazy load images ── */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

});
