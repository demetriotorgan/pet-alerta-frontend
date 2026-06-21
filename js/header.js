// ==========================================================================
// Pet Alerta - Controle de Componentes do Header (js/header.js)
// ==========================================================================

/**
 * Ativa a lógica de alternância de destaque entre os botões de navegação do header.
 * @param {HTMLElement} btnNav - O botão "Ver Animais"
 * @param {HTMLElement} btnPrimary - O botão "Anunciar Pet"
 */
export function initHeaderToggle(btnNav, btnPrimary) {
    
    // Função auxiliar interna para atualizar os estados visuais
    const alternarDestaque = (botaoClicado, botaoInativo) => {
        // Se o botão já está ativo, não faz nada
        if (botaoClicado.classList.contains('btn-primary')) return;

        // O botão clicado ganha o destaque e perde o estilo secundário
        botaoClicado.classList.add('btn-primary');
        botaoClicado.classList.remove('btn-nav');

        // O botão inativo perde o destaque e ganha o estilo secundário
        botaoInativo.classList.add('btn-nav');
        botaoInativo.classList.remove('btn-primary');
    };

    // Ouvinte para o clique no "Ver Animais"
    btnNav.addEventListener('click', () => {
        alternarDestaque(btnNav, btnPrimary);
    });

    // Ouvinte para o clique no "Anunciar Pet"
    btnPrimary.addEventListener('click', () => {
        alternarDestaque(btnPrimary, btnNav);
    });
}