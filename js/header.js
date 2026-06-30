// ==========================================================================
// Pet Alerta - Controle de Componentes do Header (js/header.js)
// ==========================================================================

/**
 * Ativa a lógica de alternância de destaque entre os botões de navegação do header.
 * @param {HTMLElement} btnNav - O botão "Ver Animais"
 * @param {HTMLElement} btnPrimary - O botão "Anunciar Pet"
 */
export function initHeaderToggle(btnNav, btnPrimary) {
    
    const path = window.location.pathname;
    const btnVer = document.getElementById('btn-ver-animais');
    const btnAnunciar = document.getElementById('btn-anunciar-pet');
    
    if (!btnVer || !btnAnunciar) return; // segurança se não achar os botões

    const isHome = path.endsWith('/') || path.endsWith('index.html');
    const isCadastro = path.includes('cadastro.html');

    if (isHome) {
        btnVer.classList.add('btn-primary');
        btnVer.classList.remove('btn-nav');
        btnAnunciar.classList.add('btn-nav');
        btnAnunciar.classList.remove('btn-primary');
    } else if (isCadastro) {
        btnAnunciar.classList.add('btn-primary');
        btnAnunciar.classList.remove('btn-nav');
        btnVer.classList.add('btn-nav');
        btnVer.classList.remove('btn-primary');
    }
}