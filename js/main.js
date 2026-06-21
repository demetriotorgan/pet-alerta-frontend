// ==========================================================================
// Pet Alerta - Orquestrador Principal do JavaScript (js/main.js)
// ==========================================================================

// Importando a funcionalidade do módulo do Header
import { initHeaderToggle } from './header.js';
import { initFilterBadges } from './dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os recursos do Dashboard
    initFilterBadges();
});

// Executa apenas quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Captura os dois botões usando seletores genéricos ou IDs se preferir
    const botaoVerAnimais = document.querySelector('.app-header .btn-nav, .app-header .btn-primary:nth-child(1)');
    const botaoAnunciarPet = document.querySelector('.app-header .btn-primary, .app-header .btn-nav:nth-child(2)');

    // Dica pedagógica: Adicionar IDs no HTML facilita a captura exata pelos alunos!
    // Exemplo se usar IDs:
    // const botaoVerAnimais = document.getElementById('btn-ver-animais');
    // const botaoAnunciarPet = document.getElementById('btn-anunciar-pet');

    if (botaoVerAnimais && botaoAnunciarPet) {
        // Inicializa o comportamento importado do módulo
        initHeaderToggle(botaoVerAnimais, botaoAnunciarPet);
    }
});