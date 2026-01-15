const content = {
    1: { title: "O Sorriso", text: "Tal qual o sol guia o girassol à luz e à vida, seu sorriso guia almas e as ilumina em meio ao caos que se faz fora — e dentro — de cada um.", poem: "Girassois de Van Gogh", music: "O seu olhar é um caminho sem saída; Somos livres como girassóis de Van Gogh", img: "img/sol.jpeg" },
    2: { title: "A Essência", text: "A fã: animada, divertida, intensa. A que gosta de ouvir, assistir, ler. Ama não se importar se vão achar ruim, pois sabe o quanto é precioso ser quem é.", poem: "Answer: Love Myself", music: "Talvez abrir os olhos para o amanhã seja o meu pesadelo Mas no meio disso, eu despertei para a luz Eu sou o único que eu deveria amar neste mundo O eu brilhante, a minha alma preciosa Eu finalmente percebi isso, então eu me amo Apesar de não ser perfeito, eu sou tão belo Você me mostrou que eu tenho motivos Eu deveria amar a mim mesmo Eu respondo com toda a minha respiração, com todo o caminho que percorri O eu de ontem, o eu de hoje, o eu de amanhã (Aprendendo a amar a mim mesmo) Sem exceções, todos eles são eu", img: "img/btssimbol.jpeg" },
    3: { title: "A Jornada", text: "Em meio ao dia a dia, trabalhos e correrias, o seu desbravar e aproveitar a simplicidade da vida e seus bons momentos mostram o quão incrível é saber desfrutar de sua alegre companhia.", poem: "Solitário Surfista", music: "Eu não preciso de muito pra ser feliz Um pouco de sol, um pouco de paz, é o que eu sempre quis Eu e meu pensamento, eu e o meu momento O tempo para quando eu sinto esse vento. É o solitário surfista, que não está sozinho Porque Deus e a natureza guiam o seu caminho O prazer de estar com você mesmo é o maior prazer É saber que você se basta pra poder viver. ", img: "img/canga.jpeg" },
    4: { title: "O Brilho", text: "Dona de um brilho inigualável... Amada por muitos — pelos mais sensíveis e inteligentes. Respeitada por quem reconhece sua doce fortaleza. Admirada por quem a enxerga e vivenciada por aqueles a quem resolve admirar.", poem: "Dona Culpa", music: "Eu sou a santa, eu sou a gata, eu sou a caça Eu sou a fêmea, a dona da casa Eu sou a regra, eu sou a exceção Eu sou a vênus, eu sou a virgem, eu sou a brasa Eu sou a rede, eu sou a asa Eu sou o sim, eu sou o não, Eu sou o dia, eu sou a noite, eu sou o susto Eu sou o reto, eu sou o justo Eu sou a lei, a solução Eu sou a farsa, eu sou a força, eu sou o vício Eu sou o fim, o edifício Onde descansa o seu coração", img: "img/gravataauau.jpeg" },
    5: { title: "O Futuro", text: "Mulher forte, grande. De alma e corpo, definida e decidida no que quer, não mede esforços para alcançar seus objetivos. Supera os desafios da vida, do corpo e do coração com dedicação, afeto e carinho, moldando não apenas a alma, mas também o corpo.", poem: "Vênus", music: "Eu sou a força da natureza E eu não tenho medo de nada Eu sou a dona da minha vida Eu sou a dona da minha estrada. Corpo de Vênus, shape de deusa Foco no topo, alma de guerreira Eu sou a cura, eu sou o veneno Eu sou a dona da minha carteira. Eu sou a luz que ilumina o caminho Eu sou o brilho que ofusca o olhar Eu sou o vento que sopra o destino Eu sou o mar que te faz mergulhar.", img: "img/braço.jpeg" },
    6: { title: "A Mente", text: "Brilhante, elegante, inteligente, empática. No português faltam adjetivos para descrever a magnitude de sua mente. Conversas contigo sempre são excitantes, complexas, cheias de conteúdo e riqueza; sua voz ecoa sabedoria.", poem: "Mulher Feita", music: "Ela é uma letra do Caetano com flow do Racionais / Hoje o que ela mais quer é silêncio e paz / (...) Ela é a prova que a inteligência é o que atrai / Que a sabedoria é o que te faz mais", img: "img/agua.jpeg" },
    7: {title:"O Sentimento", text:"Sua leveza de ser, apaixonante e companheira. Uma parceira de infinidades de momentos e sentimentos. Mostra o que é com louvor. Mostrou-me não apenas a cidade, mas a graça de aproveitá-la com você e o prazer de chamá-la de amiga.", poem:"Pura Amizade", music:"Amiga, nos vários momentos da vida é bom estar contigo / Na luz do teu brilho, na tua sombra eu me abrigo / É bela e pura amizade... Você tem sempre um jeito novo de me encantar.", img:"img/s2nit.jpeg"},
    8: {title:"A Beleza", text:"Simplesmente bela, por dentro e por fora, da cabeça aos pés. Em outra vida, a inspiração de Botticelli ao pintar o nascimento de Vênus. Dona de uma elegante sensualidade, misturada ao brilho do sorriso e à profundidade do olhar.", poem:"Garota de Ipanema/ <br/> Coisa Linda", music:"Olha que coisa mais linda, mais cheia de graça / É ela, menina, que vem e que passa / Num doce balanço a caminho do mar; <br/> Coisa linda / Vou pra onde você está / Não demoro / Quero te encontrar.", img:"img/venus.jpeg"}
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
