export function createLoadingState() {

    const div = document.createElement('div');

    div.className = 'loading-state';

    div.innerHTML = `
        <div class="loading-spinner"></div>

        <h2>Carregando pets...</h2>

        <p>Aguarde enquanto buscamos os pets cadastrados.</p>
    `;

    return div;
}