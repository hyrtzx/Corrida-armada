// --- CLASSE PARA CONTROLAR O MENU (AGORA USADA EM TODAS AS TELAS) ---
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        // CORREÇÃO: O seletor dos links estava errado. Agora pegamos os elementos <li>.
        const navListItems = this.navList.querySelectorAll("li");
        navListItems.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        
        // Adiciona o evento de clique aos links para fechar o menu
        this.navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (this.navList.classList.contains(this.activeClass)) {
                    this.handleClick();
                }
            });
        });
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

// O seletor para os links precisa ser mais específico para a animação
const mobileNavbar = new MobileNavbar(".mobile-menu", ".nav-list", ".nav-list a");
mobileNavbar.init();

// --- LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
    // Lógica de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    const contentPages = document.querySelectorAll('.content-page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            contentPages.forEach(page => page.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Leva o usuário de volta ao topo da página ao trocar de seção
            window.scrollTo(0, 0);
        });
    });

    // Renderiza todos os gráficos
    criarGraficoArsenalTotal();
    criarGraficoTriade();
    criarGraficoPoderDestrutivo();
    criarGraficoArsenaisAtuais();
});


// --- FUNÇÕES DOS GRÁFICOS (permanecem as mesmas) ---
async function criarGraficoArsenalTotal() {
    const response = await fetch('data/arsenais.json');
    const data = await response.json();
    const ctx = document.getElementById('arsenalTotalChart').getContext('2d');
    new Chart(ctx, { type: 'line', data: { labels: data.map(d => d.ano), datasets: [{ label: 'Arsenal Nuclear dos EUA', data: data.map(d => d.eua), borderColor: '#3f7de8', backgroundColor: 'rgba(63, 125, 232, 0.2)', fill: true, tension: 0.4 }, { label: 'Arsenal Nuclear da URSS/Rússia', data: data.map(d => d.urss), borderColor: '#e83a73', backgroundColor: 'rgba(232, 58, 115, 0.2)', fill: true, tension: 0.4 }] }, options: getDefaultChartOptions('Número de Ogivas') });
}
function criarGraficoTriade() {
    const ctx = document.getElementById('triadeChart').getContext('2d');
    new Chart(ctx, { type: 'bar', data: { labels: ['1965', '1985'], datasets: [{ label: 'Bombardeiros', data: [2100, 350], backgroundColor: '#3f7de8' }, { label: 'Mísseis Terrestres (ICBMs)', data: [850, 1000], backgroundColor: '#3fb950' }, { label: 'Mísseis de Submarino (SLBMs)', data: [450, 670], backgroundColor: '#a371f7' }] }, options: { ...getDefaultChartOptions('Número de Sistemas de Lançamento'), scales: { x: { stacked: true }, y: { stacked: true } } } });
}
function criarGraficoPoderDestrutivo() {
    const ctx = document.getElementById('poderDestrutivoChart').getContext('2d');
    new Chart(ctx, { type: 'bar', data: { labels: ['Hiroshima ("Little Boy")', 'Ogiva Moderna (W87)', 'Tsar Bomba'], datasets: [{ label: 'Poder Explosivo em Quilotons', data: [15, 300, 50000], backgroundColor: ['#f7b731', '#e83a73', '#a371f7'], borderWidth: 1 }] }, options: { ...getDefaultChartOptions(''), indexAxis: 'y', scales: { x: { type: 'logarithmic', title: { display: true, text: 'Poder em Quilotons (escala logarítmica)' } } }, plugins: { legend: { display: false } } } });
}
function criarGraficoArsenaisAtuais() {
    const ctx = document.getElementById('arsenaisAtuaisChart').getContext('2d');
    const data = { labels: ['Rússia', 'Estados Unidos', 'China', 'França', 'Reino Unido', 'Paquistão', 'Índia', 'Israel', 'Coreia do Norte'], datasets: [{ label: 'Número Estimado de Ogivas Nucleares', data: [5580, 5044, 500, 290, 225, 170, 170, 90, 50], backgroundColor: '#e83a73', borderColor: '#ff8a65', borderWidth: 1 }] };
    new Chart(ctx, { type: 'bar', data: data, options: { ...getDefaultChartOptions(''), indexAxis: 'y', plugins: { legend: { display: false } } } });
}
function getDefaultChartOptions(yAxisTitle = '') {
    const textColor = '#e6edf3';
    const gridColor = '#21262d';
    const textFont = "'Source Sans Pro', sans-serif";
    const titleFont = "'Exo 2', sans-serif";
    return { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: textColor, font: { family: textFont, size: 14 } } }, tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.8)', titleFont: { family: titleFont, size: 16 }, bodyFont: { family: textFont, size: 14 } } }, scales: { y: { beginAtZero: true, title: { display: !!yAxisTitle, text: yAxisTitle, color: textColor, font: { family: titleFont, size: 16, weight: 'bold' } }, ticks: { color: textColor, font: { family: textFont } }, grid: { color: gridColor } }, x: { ticks: { color: textColor, font: { family: textFont } }, grid: { color: gridColor } } } };
}