# Gramer Dokan — Frontend Package
## Laravel Integration Guide

---

## 📁 Folder Structure

```
gramer-dokan/
├── css/
│   ├── style.css        ← Global styles + variables + utilities
│   ├── header.css       ← Header & navbar styles
│   ├── footer.css       ← Footer & business links styles
│   └── home.css         ← Homepage-specific styles
│
├── js/
│   └── main.js          ← Slider, cart, mobile menu, lazy load
│
├── images/
│   └── (put your images here)
│
└── pages/
    ├── index.html       ← Complete homepage (standalone preview)
    ├── header.html      ← Header partial (Laravel Blade ready)
    └── footer.html      ← Footer partial (Laravel Blade ready)
```

---

## ⚙️ Laravel Setup

### 1. Copy assets to Laravel public folder

```bash
cp -r css/   public/css/
cp -r js/    public/js/
cp -r images/ public/images/
```

### 2. Create Blade partials

**resources/views/partials/header.blade.php**
→ Copy content from `pages/header.html`

**resources/views/partials/footer.blade.php**
→ Copy content from `pages/footer.html`

### 3. Create master layout

**resources/views/layouts/app.blade.php**

```html
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'Gramer Dokan')</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link rel="stylesheet" href="{{ asset('css/header.css') }}">
  <link rel="stylesheet" href="{{ asset('css/footer.css') }}">
  @yield('styles')
</head>
<body>

  @include('partials.header')

  <main>
    @yield('content')
  </main>

  @include('partials.footer')

  <script src="{{ asset('js/main.js') }}"></script>
  @yield('scripts')
</body>
</html>
```

### 4. Homepage view

**resources/views/home.blade.php**

```blade
@extends('layouts.app')

@section('title', 'Gramer Dokan — গ্রামের স্বাদ, আপনার ঘরে')

@section('styles')
  <link rel="stylesheet" href="{{ asset('css/home.css') }}">
@endsection

@section('content')
  {{-- Hero Slider --}}
  {{-- Featured Categories --}}
  {{-- Product sections --}}
  {{-- Copy sections from pages/index.html --}}
@endsection
```

---

## 🎨 CSS Variables (Customize Colors)

Edit `css/style.css` — `:root` block:

| Variable         | Value     | Usage              |
|------------------|-----------|--------------------|
| `--clr-gold`     | `#e8a020` | Primary accent     |
| `--clr-bg`       | `#0f0f0f` | Page background    |
| `--clr-surface`  | `#1a1a1a` | Card background    |
| `--clr-text`     | `#d4d4d4` | Body text          |

---

## 📦 Dependencies

- Font Awesome 6.5 (CDN)
- Google Fonts: Hind Siliguri + Playfair Display (CDN)
- No jQuery, no extra libraries — pure vanilla JS

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout             |
|------------|--------------------|
| > 1200px   | 5-column grid      |
| 992–1200px | 4-column grid      |
| 768–992px  | 3-column grid      |
| 480–768px  | 2-column grid      |
| < 480px    | 2-column grid      |

---

## ✅ Done by Claude
- Pixel-perfect recreation from PDF design
- Dark + Gold modern theme
- All sections: Hero, Categories, Products, Promo, Reviews, Video, Blog, Footer
- Fully responsive
- Laravel Blade ready
- Zero external JS dependencies
