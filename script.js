// Sistema de tradução com animação de loading
document.addEventListener('DOMContentLoaded', function() {
    
    let isAnimating = false;
    
    // === ANIMAÇÃO DE LOADING ===
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-spinner">
            <div class="loader-ring"></div>
        </div>
    `;
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 300);
    });
    
    setTimeout(() => {
        if (loader && !loader.classList.contains('loader-hidden')) {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                if (loader.parentNode) loader.remove();
            }, 500);
        }
    }, 2000);
    
    // Função para mudar idioma
    function changeLanguage(lang) {
        if (isAnimating) return;
        
        const currentBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
        if (currentBtn && currentBtn.classList.contains('active')) return;
        
        isAnimating = true;
        
        document.querySelectorAll('.language-content, .lang-btn').forEach(el => {
            el.classList.remove('active');
        });
        
        const activeContent = document.getElementById(`content-${lang}`);
        const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
        
        if (activeContent && activeBtn) {
            setTimeout(() => {
                activeContent.classList.add('active');
                activeBtn.classList.add('active');
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }, 30);
        }
        
        localStorage.setItem('paoliello-language', lang);
    }
    
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    const savedLang = localStorage.getItem('paoliello-language') || 'pt';
    
    setTimeout(() => {
        const ptContent = document.getElementById('content-pt');
        const ptButton = document.querySelector('.lang-btn[data-lang="pt"]');
        
        if (ptContent && ptButton) {
            ptContent.classList.add('active');
            ptButton.classList.add('active');
        }
        
        if (savedLang && savedLang !== 'pt') {
            setTimeout(() => {
                changeLanguage(savedLang);
            }, 500);
        }
    }, 100);
    
    // Placeholder para botão de agendamento
    const bookingBtns = document.querySelectorAll('[id^="booking-link"]');
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Link de agendamento em breve');
            }
        });
    });
});