// Theme Toggle
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll Progress
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = (scrollTop / scrollHeight * 100) + '%';
});

// Cursor Effect Thing
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 4 + 'px';
    cursor.style.top = my - 4 + 'px';
});

function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursorRing.style.left = cx - 18 + 'px';
    cursorRing.style.top = cy - 18 + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        cursorRing.style.width = '56px';
        cursorRing.style.height = '56px';
        cursorRing.style.opacity = '0.2';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.opacity = '0.4';
    });
});

// Observe Changes to fill progress bars
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Animate language bars inside
            e.target.querySelectorAll('.lang-bar-fill').forEach(bar => bar.classList.add('animated'));
            // Animate skill bars inside
            e.target.querySelectorAll('.skill-level-fill').forEach(bar => bar.classList.add('animated'));
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .exp-item, .skill-card').forEach(el => io.observe(el));

// Stagger skill cards
document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.07) + 's';
});

// function openResume() {
//   const m = document.getElementById('resumeModal');
//   m.style.display = 'flex';
// }
// function closeResume() {
//   document.getElementById('resumeModal').style.display = 'none';
// }
// // Close on backdrop click
// document.getElementById('resumeModal').addEventListener('click', function(e) {
//   if (e.target === this) closeResume();
// });
// // Close on Escape key
// document.addEventListener('keydown', e => { if (e.key === 'Escape') closeResume(); });