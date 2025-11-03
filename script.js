document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupButtons();
    setupSearch();
    setupFilterTabs();
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });
}

function setupButtons() {
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    const getStartedBtn = document.querySelector('.btn-primary');
    const discordBtn = document.querySelector('.btn-secondary');
    const executeButtons = document.querySelectorAll('.btn-execute');

    loginBtn.addEventListener('click', function() {
        alert('Login functionality would be implemented here');
    });

    registerBtn.addEventListener('click', function() {
        alert('Registration functionality would be implemented here');
    });

    getStartedBtn.addEventListener('click', function() {
        alert('Get Started - redirect to download/setup page');
    });

    discordBtn.addEventListener('click', function() {
        window.open('https://discord.com', '_blank');
    });

    executeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const scriptCard = this.closest('.script-card');
            const scriptName = scriptCard.querySelector('.script-name').textContent;
            alert(`Executing script: ${scriptName}`);
        });
    });
}

function setupSearch() {
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const scriptCards = document.querySelectorAll('.script-card');

        scriptCards.forEach(card => {
            const scriptName = card.querySelector('.script-name').textContent.toLowerCase();
            const scriptDesc = card.querySelector('.script-desc').textContent.toLowerCase();

            if (scriptName.includes(query) || scriptDesc.includes(query) || query === '') {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.textContent.toLowerCase();
            console.log('Filter applied:', filter);
        });
    });
}

function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
