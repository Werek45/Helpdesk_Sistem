// Configuração simples do gráfico usando Chart.js
// Verificar se Chart.js foi carregado antes de usar
if (typeof Chart !== 'undefined') {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
            datasets: [{
                label: 'Chamados Resolvidos por Dia',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Navegação entre páginas
document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        if (page) {
            // Esconder todas as páginas
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            // Mostrar a página selecionada
            const targetPage = document.getElementById(page + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
            }
    }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Carregar preferência salva
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Alternar dark mode
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Gerenciamento de Chamados
let ticketCounter = 1024; // Próximo ID disponível

// Carregar contador do localStorage
const savedCounter = localStorage.getItem('ticketCounter');
if (savedCounter) {
    ticketCounter = parseInt(savedCounter);
}

// Função para gerar ID único
function generateTicketId() {
    const id = ticketCounter++;
    localStorage.setItem('ticketCounter', ticketCounter.toString());
    return id;
}

// Função para salvar chamado
function saveTicket(ticket) {
    let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

// Formulário de Novo Chamado
const newTicketForm = document.getElementById('new-ticket-form');
const cancelBtn = document.getElementById('cancel-btn');
const successMessage = document.getElementById('success-message');

if (newTicketForm) {
    newTicketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const ticket = {
            id: generateTicketId(),
            subject: formData.get('subject'),
            priority: formData.get('priority'),
            category: formData.get('category'),
            description: formData.get('description'),
            status: 'Aberto',
            date: new Date().toLocaleString('pt-BR')
        };
        
        // Salvar chamado
        saveTicket(ticket);
        
        // Mostrar mensagem de sucesso
        successMessage.style.display = 'block';
        this.reset();
        
        // Esconder mensagem após 3 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
        
        // Atualizar contador de chamados abertos no dashboard (se necessário)
        updateDashboardCount();
    });
}

// Botão cancelar
if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
        if (confirm('Deseja cancelar a criação do chamado?')) {
            newTicketForm.reset();
            successMessage.style.display = 'none';
        }
    });
}

// Função para atualizar contador no dashboard
function updateDashboardCount() {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const openTickets = tickets.filter(t => t.status === 'Aberto').length;
    // Você pode atualizar o card do dashboard aqui se necessário
}