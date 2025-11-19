# 🎫 Helpdesk System - Dashboard & Ticket Management

> **Versão:** 1.0.0-beta

Um protótipo de interface para um sistema corporativo de Helpdesk (Service Desk), desenvolvido como parte de uma atividade acadêmica de Engenharia de Software. O projeto simula o fluxo de gerenciamento de chamados técnicos, visualização de métricas e configurações de usuário.

![Status do Projeto](https://img.shields.io/badge/Status-Beta-orange) ![License](https://img.shields.io/badge/License-MIT-green)

## 📸 Preview

*(Adicione um print da tela do seu dashboard aqui e coloque na pasta do projeto, ex: `screenshot.png`)*
![Dashboard Screenshot](./screenshot.png)

## 🚀 Funcionalidades

* **Dashboard Interativo:** Visão geral com Cards de status (Abertos, Em andamento, Críticos) e gráfico de desempenho.
* **Gerenciamento de Chamados:** Listagem visual de tickets com badges de status e prioridade.
* **Criação de Tickets:** Formulário simulado para abertura de novos chamados com validação de campos.
* **Navegação SPA:** Alternância entre telas (Dashboard, Meus Chamados, Configurações) sem recarregamento da página, utilizando JavaScript puro.
* **Interface Responsiva:** Layout adaptável construído com CSS Flexbox.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização, variáveis CSS e animações (FadeIn).
* **JavaScript (ES6+):** Lógica de manipulação do DOM e navegação.
* **[Chart.js](https://www.chartjs.org/):** Biblioteca externa para renderização do gráfico de barras.

## 📂 Estrutura do Projeto

```text
Helpdesk_System/
│
├── index.html      # Estrutura principal e Views
├── style.css       # Estilos globais e layout
├── script.js       # Lógica de navegação e inicialização do Chart.js
└── README.md       # Documentação
