export function createEmptyState() {

    const div = document.createElement('div');

    div.className = 'empty-state';

    div.innerHTML = `
        <i class="ph-fill ph-paw-print"></i>

        <h2>Nenhum pet cadastrado</h2>

        <p>
            Seja o primeiro a cadastrar um pet perdido,
            encontrado ou disponível para adoção.
        </p>

        <a href="cadastro.html" class="btn-primary">
            Cadastrar Pet
        </a>
    `;

    return div;

}