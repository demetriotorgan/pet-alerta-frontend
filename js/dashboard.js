/**
 * Inicializa o comportamento alternável (toggle) dos botões de filtro.
 * Utiliza delegação de eventos para maior performance e escalabilidade.
 */
export function initFilterBadges() {
    const filtersGrid = document.querySelector('.filters-grid');

    // Proteção: Caso o script rode em uma página que não tenha a grid de filtros
    if (!filtersGrid) return;

    filtersGrid.addEventListener('click', (event) => {
        // Encontra o botão .filter-badge mais próximo do clique (trata cliques no texto ou no ícone <i>)
        const clickedBadge = event.target.closest('.filter-badge');

        // Se o clique não foi em um badge de filtro, ignora
        if (!clickedBadge) return;

        // 1. Remove a classe 'active' de TODOS os badges dentro desta grid
        const allBadges = filtersGrid.querySelectorAll('.filter-badge');
        allBadges.forEach(badge => badge.classList.remove('active'));

        // 2. Adiciona a classe 'active' apenas no badge que foi clicado
        clickedBadge.classList.add('active');

        // [Ponto de Extensão Futuro]: Chamar a função que filtra os cards na API
        const filterType = clickedBadge.textContent.trim().toLowerCase();
        console.log(`Filtrando o dashboard por: ${filterType}`);
    });
}