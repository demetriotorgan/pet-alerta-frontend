export function setLoadingState(botaoSubmit) {
    botaoSubmit.disabled = true;
    botaoSubmit.textContent = 'Enviando....';
}

export function resetLoadingState(botaoSubmit) {
    botaoSubmit.disabled = false;
    botaoSubmit.textContent = 'Cadastrar Animal';
}