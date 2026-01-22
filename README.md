# 🎨 Portfolio Website dengan Animasi Modern

Portfolio website yang menakjubkan dengan animasi premium dan desain modern menggunakan HTML, CSS, dan JavaScript murni.

## ✨ Fitur Utama

### 🎭 Animasi & Efek Visual
- **Gradient Orbs Animasi** - Background orbs yang bergerak mengikuti mouse
- **Typing Effect** - Animasi typing untuk job title yang bergantian
- **Parallax Scrolling** - Efek parallax pada hero section
- **Glassmorphism** - Desain kartu dengan efek glass blur
- **Morphing Shapes** - Bentuk yang berubah-ubah secara dinamis
- **Floating Cards** - Kartu yang melayang dengan animasi smooth
- **3D Tilt Effect** - Project cards dengan efek 3D saat hover
- **Skill Bar Animation** - Progress bar yang teranimasi saat scroll
- **Counter Animation** - Angka statistik yang naik bertahap
- **Hover Micro-interactions** - Animasi halus pada setiap elemen interaktif

### 🎨 Desain Modern
- **Dark Mode Premium** - Tema gelap dengan gradien warna-warni
- **Vibrant Gradients** - Gradien yang eye-catching dan modern
- **Smooth Transitions** - Transisi halus di semua interaksi
- **Responsive Design** - Tampil sempurna di semua device
- **Modern Typography** - Font Google: Outfit & Space Grotesk
- **Glassmorphism UI** - Elemen dengan backdrop blur effect

### 📱 Responsif
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)
- Mobile menu dengan animasi smooth

### 🎯 Sections
1. **Hero Section**
   - Animated gradient background
   - Typing animation untuk job roles
   - Floating skill cards
   - Morphing shape decoration
   - CTA buttons dengan hover effects

2. **About Section**
   - Deskripsi pribadi
   - Animated statistics cards
   - Floating illustration
   - Smooth reveal animations

3. **Skills Section**
   - 3 kategori skill (Frontend, Backend, Design)
   - Animated skill progress bars
   - Icon dengan gradient background
   - Shimmer effect pada progress bar

4. **Projects Section**
   - 4 project showcase
   - Hover overlay dengan links
   - Gradient placeholders
   - 3D tilt effect
   - Technology tags

5. **Contact Section**
   - Contact form dengan validasi
   - Contact methods cards
   - Social media links
   - Animated form submission

## 🚀 Cara Menggunakan

### 1. Langsung Buka
Cukup buka file `index.html` di browser modern (Chrome, Firefox, Edge, Safari).

### 2. Gunakan Live Server
Jika menggunakan VS Code:
```bash
# Install extension "Live Server"
# Kemudian klik kanan index.html > Open with Live Server
```

### 3. Setup Lokal dengan Laragon
Jika menggunakan Laragon (sudah ada di folder ini):
```
1. Buka Laragon
2. Start All
3. Akses: http://localhost/portofolio
```

## 🎨 Kustomisasi

### Mengubah Nama & Informasi
Edit di `index.html`:
```html
<!-- Nama -->
<span class="name-text">Your Name</span>

<!-- Job Roles (ada di script.js) -->
const phrases = [
    'Full Stack Developer',
    'UI/UX Designer',
    // Tambah atau edit sesuai kebutuhan
];

<!-- Contact Info -->
<a href="mailto:hello@example.com">hello@example.com</a>
<a href="tel:+1234567890">+1 (234) 567-890</a>
```

### Mengubah Warna Theme
Edit di `styles.css`:
```css
:root {
    /* Ubah gradien primary */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    /* Ubah gradien secondary */
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    
    /* Atau buat gradien sendiri! */
}
```

### Mengubah Skills
Edit di `index.html` section Skills:
```html
<div class="skill-item">
    <div class="skill-header">
        <span>Nama Skill</span>
        <span class="skill-percent">95%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="95"></div>
    </div>
</div>
```

### Menambah Projects
Copy struktur project card di `index.html`:
```html
<div class="project-card">
    <!-- Project content here -->
</div>
```

## 🎁 Easter Egg

Coba ketik Konami Code di keyboard saat website terbuka:
```
⬆️ ⬆️ ⬇️ ⬇️ ⬅️ ➡️ ⬅️ ➡️ B A
```
Lihat apa yang terjadi! 🎉

## 🌟 Teknologi yang Digunakan

- **HTML5** - Struktur semantic
- **CSS3** - Styling dengan animasi advanced
- **JavaScript (Vanilla)** - Interaktivitas tanpa library
- **Google Fonts** - Outfit & Space Grotesk
- **CSS Custom Properties** - Untuk theming
- **CSS Grid & Flexbox** - Layout responsive
- **Intersection Observer API** - Scroll animations
- **CSS Animations & Keyframes** - Smooth animations

## 📝 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎯 Performance

- ⚡ Pure CSS animations (hardware accelerated)
- ⚡ Debounced scroll events
- ⚡ Intersection Observer untuk lazy animations
- ⚡ Minimal dependencies
- ⚡ Optimized asset loading

## 📱 Responsiveness

Website ini sepenuhnya responsive dengan breakpoints:
- Mobile First approach
- 640px - Mobile
- 968px - Tablet
- 1200px+ - Desktop

## 🎨 Color Palette

```css
Primary Purple: #667eea → #764ba2
Secondary Pink: #f093fb → #f5576c
Accent Blue: #4facfe → #00f2fe
Success Green: #43e97b → #38f9d7
Background Dark: #0a0a0f
Text Primary: #ffffff
Text Secondary: #a0a0b0
```

## 🔧 Struktur File

```
portofolio/
│
├── index.html          # Struktur HTML utama
├── styles.css          # Semua styling dan animasi
├── script.js           # Interaktivitas dan animasi JS
└── README.md          # Dokumentasi (file ini)
```

## 💡 Tips Pengembangan

1. **Tambah Gambar Asli**
   - Ganti placeholder SVG dengan foto asli
   - Gunakan format WebP untuk performance
   - Optimize gambar sebelum upload

2. **Integrasikan Backend**
   - Hubungkan form contact ke backend/API
   - Gunakan EmailJS untuk email tanpa backend
   - Tambahkan reCAPTCHA untuk security

3. **SEO Optimization**
   - Tambahkan meta tags yang sesuai
   - Buat sitemap.xml
   - Tambahkan schema.org markup
   - Optimize untuk social media (Open Graph)

4. **Performance**
   - Minify CSS & JS untuk production
   - Lazy load images
   - Add service worker untuk PWA
   - Optimize fonts loading

## 🚀 Deploy

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin <your-repo>
git push -u origin main

# Settings > Pages > Source: main branch
```

### Netlify
1. Drag & drop folder ke Netlify
2. Atau connect GitHub repository
3. Done! ✨

### Vercel
```bash
vercel
# Follow prompts
```

## 📄 License

Free to use untuk personal dan commercial projects.
Silakan modifikasi sesuai kebutuhan!

## 🙏 Credits

- Design & Development: Your Name
- Fonts: Google Fonts
- Icons: Custom SVG
- Inspiration: Modern web design trends

---

**Dibuat dengan ❤️ dan kopi ☕**

Jika ada pertanyaan atau butuh bantuan kustomisasi, jangan ragu untuk bertanya!

Happy Coding! 🚀✨
