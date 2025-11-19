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


document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        if (page) {

            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

            const targetPage = document.getElementById(page + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
            }
    }
    });
});


const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});


let ticketCounter = 1024;

const savedCounter = localStorage.getItem('ticketCounter');
if (savedCounter) {
    ticketCounter = parseInt(savedCounter);
}

function generateTicketId() {
    const id = ticketCounter++;
    localStorage.setItem('ticketCounter', ticketCounter.toString());
    return id;
}

function saveTicket(ticket) {
    let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

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
        
        saveTicket(ticket);
        
        successMessage.style.display = 'block';
        this.reset();
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
        updateDashboardCount();
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
        if (confirm('Deseja cancelar a criação do chamado?')) {
            newTicketForm.reset();
            successMessage.style.display = 'none';
        }
    });
}


function updateDashboardCount() {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const openTickets = tickets.filter(t => t.status === 'Aberto').length;

}