// Funcionalidade 1: Contador de Visitas com localStorage
function updateVisitCounter() {
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    document.getElementById('visit-counter').innerText = `Você visitou esta página ${visitCount} vezes!`;
}

// Funcionalidade 2: Toggle de Áudio
const audio = document.getElementById('background-audio');
const audioBtn = document.getElementById('audio-toggle-btn');
let isPlaying = false;

audioBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        // Adiciona o SVG correto para o ícone de pausar música
        audioBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line></svg>`;
    } else {
        audio.play();
        // Adiciona o SVG correto para o ícone de música tocando
        audioBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    }
    isPlaying = !isPlaying;
});

// Funcionalidade 3: Animação na Rolagem (Intersection Observer)
const animatedElements = document.querySelectorAll('.animated-element');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(el => observer.observe(el));

// Funcionalidade 4: Manipulação de Formulário
const form = document.getElementById('contact-form');
const feedbackDiv = document.getElementById('form-feedback');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    const subject = document.getElementById('input-subject').value;
    
    console.log(`Dados enviados: Nome: ${name}, E-mail: ${email}, Assunto: ${subject}`);
    
    feedbackDiv.style.display = 'block';
    feedbackDiv.innerHTML = `Obrigado, <strong>${name}</strong>! Recebemos sua mensagem sobre "<strong>${subject}</strong>" e entraremos em contato no e-mail <strong>${email}</strong>.`;
    
    form.reset();
});

// Funcionalidade 5: Desenho Animado no Canvas
const canvas = document.getElementById('skillsChart');
const ctx = canvas.getContext('2d');

function drawSkillsChart() {
    const skills = [
        { name: 'HTML', value: 85, color: '#e34c26' },
        { name: 'CSS', value: 75, color: '#2965f1' },
        { name: 'JS', value: 60, color: '#f0db4f' }
    ];

    const barWidth = 40;
    const gap = 30;
    const chartHeight = canvas.height - 40;
    const chartWidth = canvas.width;

    let progress = 0;

    function animateChart() {
        ctx.clearRect(0, 0, chartWidth, canvas.height);

        skills.forEach((skill, index) => {
            const x = chartWidth / 2 - (skills.length * (barWidth + gap)) / 2 + index * (barWidth + gap);
            const targetHeight = (skill.value / 100) * chartHeight;
            const currentHeight = Math.min(progress, targetHeight);

            // Desenha a barra
            ctx.fillStyle = skill.color;
            ctx.fillRect(x, chartHeight - currentHeight, barWidth, currentHeight);
            
            // Adiciona o valor da porcentagem
            ctx.fillStyle = '#2c3e50'; // Cor do texto
            ctx.textAlign = 'center';
            ctx.font = '12px Poppins';
            ctx.fillText(`${skill.value}%`, x + barWidth / 2, chartHeight - currentHeight - 10);
            
            // Texto do nome da habilidade
            ctx.fillStyle = '#343a40'; // Cor do texto secundário
            ctx.fillText(skill.name, x + barWidth / 2, chartHeight + 20);
        });

        if (progress < 100) {
            progress += 2;
            requestAnimationFrame(animateChart);
        }
    }

    animateChart();
}


document.addEventListener('DOMContentLoaded', () => {
    updateVisitCounter();
    drawSkillsChart();
});