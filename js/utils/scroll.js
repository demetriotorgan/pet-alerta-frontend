export function scrollParaElemento(elemento) {
    if (!elemento) return;

    elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}