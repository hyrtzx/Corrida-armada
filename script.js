// --- CLASSE DO MENU MOBILE (permanece igual) ---
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }
    animateLinks() { this.navLinks.forEach((link, index) => { link.style.animation ? (link.style.animation = "") : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`); }); }
    handleClick() { this.navList.classList.toggle(this.activeClass); this.mobileMenu.classList.toggle(this.activeClass); this.animateLinks(); }
    addClickEvent() { this.mobileMenu.addEventListener("click", this.handleClick); }
    init() { if (this.mobileMenu) { this.addClickEvent(); } return this; }
}
const mobileNavbar = new MobileNavbar(".mobile-menu", ".nav-list", ".nav-list li");
mobileNavbar.init();


// --- LÓGICA DE NAVEGAÇÃO ÚNICA E SIMPLIFICADA ---
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentPages = document.querySelectorAll('.content-page');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Desativa todos os links e páginas
            navLinks.forEach(item => item.classList.remove('active'));
            contentPages.forEach(page => page.classList.remove('active'));

            // Ativa o link e a página correspondente
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Fecha o menu mobile (se estiver aberto) após clicar
            if (mobileNavbar.navList.classList.contains('active')) {
                mobileNavbar.handleClick();
            }
        });
    });

    // RENDERIZA TODOS OS GRÁFICOS QUANDO A PÁGINA CARREGA
    criarGraficoArsenalTotal();
    criarGraficoTriade();
    criarGraficoPoderDestrutivo();
});


// --- FUNÇÕES DOS GRÁFICOS (permanecem exatamente as mesmas de antes) ---

async function criarGraficoArsenalTotal() {
    const response = await fetch('data/arsenais.json');
    const data = await response.json();
    const labels = data.map(item => item.ano);
    const euaData = data.map(item => item.eua);
    const urssData = data.map(item => item.urss);
    const ctx = document.getElementById('arsenalTotalChart').getContext('2d');
    new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: 'Arsenal Nuclear dos EUA', data: euaData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)', fill: true, tension: 0.4 }, { label: 'Arsenal Nuclear da URSS/Rússia', data: urssData, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)', fill: true, tension: 0.4 }] }, options: getDefaultChartOptions('Número de Ogivas') });
}

function criarGraficoTriade() {
    const ctx = document.getElementById('triadeChart').getContext('2d');
    new Chart(ctx, { type: 'bar', data: { labels: ['1965', '1985'], datasets: [{ label: 'Bombardeiros', data: [2100, 350], backgroundColor: 'rgba(255, 206, 86, 0.7)' }, { label: 'Mísseis Terrestres (ICBMs)', data: [850, 1000], backgroundColor: 'rgba(75, 192, 192, 0.7)' }, { label: 'Mísseis de Submarino (SLBMs)', data: [450, 670], backgroundColor: 'rgba(54, 162, 235, 0.7)' }] }, options: { ...getDefaultChartOptions('Número de Sistemas de Lançamento'), scales: { x: { stacked: true, ...getDefaultChartOptions().scales.x }, y: { stacked: true, ...getDefaultChartOptions().scales.y } } } });
}

function criarGraficoPoderDestrutivo() {
    const ctx = document.getElementById('poderDestrutivoChart').getContext('2d');
    new Chart(ctx, { type: 'bar', data: { labels: ['Bomba de Hiroshima ("Little Boy")', 'Ogiva Moderna (W87)', 'Tsar Bomba (Teste Soviético)'], datasets: [{ label: 'Poder Explosivo em Quilotons (escala logarítmica)', data: [15, 300, 50000], backgroundColor: ['rgba(255, 159, 64, 0.7)', 'rgba(255, 99, 132, 0.7)', 'rgba(153, 102, 255, 0.7)'], borderColor: ['rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)'], borderWidth: 1 }] }, options: { ...getDefaultChartOptions(''), indexAxis: 'y', scales: { x: { type: 'logarithmic', title: { display: true, text: 'Poder em Quilotons (1 = 1.000 toneladas de TNT)', color: '#e0e0e0' }, ticks: { color: '#e0e0e0' } }, y: { ticks: { color: '#e0e0e0' } } }, plugins: { legend: { display: false } } } });
}

function getDefaultChartOptions(yAxisTitle = '') {
    return { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#e0e0e0', font: { size: 14 } } }, tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.8)', titleFont: { size: 16 }, bodyFont: { size: 14 } } }, scales: { y: { beginAtZero: true, title: { display: true, text: yAxisTitle, color: '#e0e0e0' }, ticks: { color: '#e0e0e0' } }, x: { title: { display: false }, ticks: { color: '#e0e0e0' } } } };
}