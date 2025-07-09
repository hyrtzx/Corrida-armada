# Projeto Era Nuclear: Dados e Acontecimentos


Este é um projeto web interativo e educativo sobre a **Corrida Armamentista e o Medo Nuclear** durante a Guerra Fria. O objetivo é transformar dados históricos e números complexos em visualizações impactantes e fáceis de entender, demonstrando a escala do conflito e seus momentos mais críticos.

## 🚀 Funcionalidades

O site é uma *Single Page Application* (SPA) com uma navegação responsiva que permite explorar quatro seções principais:

1.  **Acontecimentos:** Uma linha do tempo visual com imagens e textos sobre eventos marcantes, como a bomba de Hiroshima, os testes nucleares, a Crise dos Mísseis de Cuba e a Tsar Bomba.
2.  **Arsenal Total:** Um gráfico de linhas interativo que compara a evolução do número de ogivas nucleares dos EUA e da URSS/Rússia ao longo das décadas.
3.  **Tríade Nuclear:** Um gráfico de barras que explica a composição dos arsenais (bombardeiros, mísseis terrestres e mísseis de submarino) em diferentes períodos.
4.  **Poder Destrutivo:** Um gráfico de barras com escala logarítmica que compara o poder explosivo da bomba de Hiroshima, uma ogiva moderna e a Tsar Bomba.

## 💻 Tecnologias Utilizadas

-   **HTML5:** Estrutura semântica do conteúdo.
-   **CSS3:** Estilização, layout responsivo com Flexbox e Media Queries.
-   **JavaScript (ES6+):** Manipulação do DOM, lógica de navegação e interatividade.
-   **Chart.js:** Biblioteca utilizada para criar todos os gráficos interativos e visualmente atraentes.
-   **JSON:** Os dados do arsenal nuclear são carregados a partir de um arquivo local (`fetch API`) para manter o código organizado.

## 🏃 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SEU-USUARIO/NOME-DO-SEU-REPOSITORIO.git
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd NOME-DO-SEU-REPOSITORIO
    ```
3.  **Abra o arquivo `index.html`:**
    -   Você pode abrir o arquivo `index.html` diretamente no seu navegador.
    -   **Recomendado:** Se você usa o VS Code, instale a extensão **Live Server** e clique com o botão direito no `index.html` > "Open with Live Server" para evitar problemas de CORS ao carregar os dados locais.

## 📊 Fontes de Dados

Os dados numéricos dos arsenais são compilações e aproximações baseadas em informações públicas de fontes como a **Federation of American Scientists (FAS)** e o **Stockholm International Peace Research Institute (SIPRI)**, adaptados para os fins educacionais deste projeto.
