const content = {
    1: { title: "A Essência", text: "Mensagem aqui...", poem: "Poema aqui...", music: "Música 1", img: "img/foto1.jpg" },
    2: { title: "O Sorriso", text: "Mensagem aqui...", poem: "Poema aqui...", music: "Música 2", img: "img/foto2.jpg" },
    3: { title: "A Jornada", text: "Mensagem aqui...", poem: "Poema aqui...", music: "Música 3", img: "img/foto3.jpg" },
    4: { title: "O Brilho", text: "Mensagem aqui...", poem: "Poema aqui...", music: "Música 4", img: "img/foto4.jpg" },
    5: { title: "O Futuro", text: "Mensagem aqui...", poem: "Poema aqui...", music: "Música 5", img: "img/foto5.jpg" }
};

const canvas = document.getElementById('effectsCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let fireworkTimer = null;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        // Raio de explosão aumentado (multiplicador maior)
        this.velocity = { 
            x: (Math.random() - 0.5) * 15, 
            y: (Math.random() - 0.5) * 15 
        };
        this.alpha = 1;
        this.friction = 0.97;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6; // Ocupa mais espaço na tela
    const colors = ['#d4af37', '#faf9f6', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    // Número de partículas incrementado para explosões massivas
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function handleFireworks() {
    const scrollPos = window.scrollY;
    if (scrollPos < 200) {
        if (!fireworkTimer) {
            fireworkTimer = setInterval(createFirework, 600);
        }
    } else {
        clearInterval(fireworkTimer);
        fireworkTimer = null;
    }
}

window.addEventListener('scroll', handleFireworks);
handleFireworks(); // Inicia ao carregar

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        if (p.alpha > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(i, 1);
        }
    });
    requestAnimationFrame(animate);
}

function openPage(id) {
    const data = content[id];
    const overlay = document.getElementById('detail-overlay');
    const body = document.getElementById('overlay-body');

    body.innerHTML = `
        <h1 style="font-size: 3rem; color: var(--dourado); font-weight: 200;">${data.title}</h1>
        <img src="${data.img}" style="width: 100%; border: 1px solid var(--dourado); margin: 40px 0;">
        <p style="font-size: 1.2rem; line-height: 1.8;">${data.text}</p>
        <hr style="margin: 40px 0; border: 0.5px solid var(--dourado); opacity: 0.3;">
        <p style="font-style: italic; color: var(--dourado); font-size: 1.5rem;">${data.poem}</p>
        <p style="margin-top: 30px;"><strong>🎵 ${data.music}</strong></p>
        <button onclick="closePage()" style="margin-top: 50px; padding: 15px 40px; background: var(--dourado); color: var(--azul-royal); border: none; font-weight: bold; cursor: pointer;">VOLTAR</button>
    `;

    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePage() {
    document.getElementById('detail-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

animate();

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        for(let i = 0; i < 3; i++) {
            setTimeout(createFirework, i * 300);
        }
    }, 1500);
});