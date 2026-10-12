// ============ АНИМАЦИЯ ЛИСТЬЕВ НА CANVAS ============
const canvas = document.getElementById('leaves');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Leaf {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 6 + 3;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#8ba888' : '#c9a961';
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + 20) this.reset();
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const leaves = Array.from({ length: 25 }, () => new Leaf());

function animateLeaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
    });
    requestAnimationFrame(animateLeaves);
}
animateLeaves();

// ============ SCROLL REVEAL ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============ КОНСТРУКТОР ============
const speciesButtons = document.querySelectorAll('.species-btn');
const treeVisual = document.getElementById('treeVisual');
const previewSpecies = document.getElementById('previewSpecies');
const nameInput = document.getElementById('nameInput');
const yearsInput = document.getElementById('yearsInput');
const epitaphInput = document.getElementById('epitaphInput');
const previewName = document.getElementById('previewName');

speciesButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        speciesButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const species = btn.dataset.species;
        const emoji = btn.dataset.emoji;
        treeVisual.textContent = emoji;
        previewSpecies.textContent = species;
    });
});

nameInput.addEventListener('input', (e) => {
    previewName.textContent = e.target.value || 'Ваше имя';
});

// ============ ВЫБОР ПАКЕТА ============
function selectPackage(type) {
    const names = {
        basic: 'Базовый',
        memorial: 'Мемориальный',
        family: 'Семейный',
        preorder: 'Предзаказ'
    };
    document.getElementById('constructor').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        alert(`Выбран пакет «${names[type]}». Заполните форму ниже, чтобы создать мемориал.`);
    }, 800);
}

// ============ СОЗДАНИЕ МЕМОРИАЛА ============
function createMemorial() {
    const name = nameInput.value || 'Иван Петрович Сидоров';
    const years = yearsInput.value || '1952 — 2024';
    const epitaph = epitaphInput.value || '«Он посадил сад, который будет цвести после него. Его любовь — в каждом листе.»';
    const species = previewSpecies.textContent;
    const emoji = document.querySelector('.species-btn.active').dataset.emoji;

    document.getElementById('memorialName').textContent = name;
    document.getElementById('memorialYears').textContent = years;
    document.getElementById('memorialEpitaph').textContent = epitaph;
    document.getElementById('memorialSpecies').textContent = species;
    document.getElementById('memorialTreeIcon').textContent = emoji;

    const today = new Date();
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    document.getElementById('memorialDate').textContent =
        `Посажен ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    document.getElementById('memorial').scrollIntoView({ behavior: 'smooth' });

    // Эффект подсветки
    const demo = document.getElementById('memorialDemo');
    demo.style.transition = 'all 0.6s ease';
    demo.style.boxShadow = '0 0 60px rgba(201, 169, 97, 0.4)';
    setTimeout(() => {
        demo.style.boxShadow = '';
    }, 1500);
}

// ============ NAV SCROLL EFFECT ============
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        nav.style.padding = '12px 48px';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.padding = '20px 48px';
        nav.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

// ============ ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРЕЙ ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('%c🌿 Возрождение', 'font-size: 24px; color: #2d4a3e; font-family: serif;');
console.log('%cMVP цифровой платформы запущен', 'color: #8ba888;');