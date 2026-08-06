// ============================================
// Gramer Dokan — Alpine.js data + interactions
// ============================================

// -------- Sample product data --------
const sampleProducts = (count, prefix = 'Wild Sundarban Honey') => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: prefix,
    price: 1990,
    oldPrice: 2200,
    discount: 10,
    image: `assets/products/product-${(i % 4) + 1}.svg`,
  }));
};

// -------- Main app state --------
document.addEventListener('alpine:init', () => {
  Alpine.store('cart', {
    isOpen: false,
    items: [],

    get count() {
      return this.items.reduce((sum, i) => sum + i.qty, 0);
    },

    get total() {
      return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    formatPrice(n) {
      return '৳' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    add(product) {
      const existing = this.items.find(i => i.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
        this.items.push({ ...product, qty: 1 });
      }
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
    },

    updateQty(id, delta) {
      const item = this.items.find(i => i.id === id);
      if (!item) return;
      const next = item.qty + delta;
      if (next < 1) return;
      item.qty = next;
    },

    open()   { this.isOpen = true;  document.body.style.overflow = 'hidden'; },
    close()  { this.isOpen = false; document.body.style.overflow = ''; },
    toggle() { this.isOpen ? this.close() : this.open(); }
  });

  Alpine.store('wishlist', {
    ids: [],
    toggle(id) {
      const i = this.ids.indexOf(id);
      if (i > -1) this.ids.splice(i, 1);
      else this.ids.push(id);
    },
    has(id) { return this.ids.includes(id); }
  });

  Alpine.store('lang', { current: 'BN' });

  Alpine.store('offcanvas', {
    isOpen: false,
    open()   { this.isOpen = true;  document.body.style.overflow = 'hidden'; },
    close()  { this.isOpen = false; document.body.style.overflow = ''; },
    toggle() { this.isOpen ? this.close() : this.open(); }
  });

  // Global modal store
  // Usage: $store.modal.open('auth')          → opens with default 'md' size
  //        $store.modal.open('auth', 'lg')     → opens with large panel
  //        $store.modal.close()
  //        $store.modal.is('auth')             → boolean
  Alpine.store('modal', {
    active: null,
    size: 'md',
    open(name, size = 'md') {
      this.active = name;
      this.size   = size;
      document.body.style.overflow = 'hidden';
    },
    close() {
      this.active = null;
      document.body.style.overflow = '';
    },
    is(name) { return this.active === name; }
  });
});

// -------- Product list components --------
window.productList = (count, prefix) => ({
  products: sampleProducts(count, prefix),
});

// -------- Carousel component --------
window.carousel = (totalSlides = 3) => ({
  currentSlide: 0,
  totalSlides,
  next() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  },
  prev() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  },
  goto(i) { this.currentSlide = i; }
});

// -------- Cart suggestions carousel --------
window.cartSuggestions = () => ({
  slide: 0,
  products: [
    { id: 'sg1', name: 'Himsagar Mango-10 kg', price: 1600, oldPrice: 1800, image: 'assets/products/product-1.svg' },
    { id: 'sg2', name: 'Wild Sundarban Honey', price: 1990, oldPrice: 2200, image: 'assets/products/product-2.svg' },
    { id: 'sg3', name: 'Khejur Gur — 1 kg',   price: 580,  oldPrice: 650,  image: 'assets/products/product-3.svg' },
    { id: 'sg4', name: 'Gawa Ghee 500ml',      price: 950,  oldPrice: 1100, image: 'assets/products/product-4.svg' },
  ],
  get maxSlide() { return this.products.length - 1; },
  next() { if (this.slide < this.maxSlide) this.slide++; },
  prev() { if (this.slide > 0) this.slide--; }
});

// -------- Hero banner auto-rotate --------
window.heroSlider = () => ({
  slide: 0,
  total: 4,
  interval: null,
  init() {
    this.interval = setInterval(() => {
      this.slide = (this.slide + 1) % this.total;
    }, 5000);
  }
});

// -------- jQuery enhancements --------
$(function () {
  // Smooth-scrolling for anchor links
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 400);
    }
  });

  // Search focus state
  $('.header__search input, .bottom-search__field input').on('focus blur', function (e) {
    $(this).closest('.header__search, .bottom-search__field').toggleClass('is-focused', e.type === 'focus');
  });
});
