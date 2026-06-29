// src/services/formSubmitService.js ou cria um formErrorService.js
export function limparErros(form) {
    // Remove classe de todos os inputs/selects/textarea
    form.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });

    // Remove mensagens de erro antigas
    form.querySelectorAll('.error-message').forEach(el => el.remove());

    // Remove erro do container da foto
    const containerFoto = form.querySelector('.botoes-foto-container');
    containerFoto?.classList.remove('error');
}

export function mostrarErros(form, camposComErro, mensagens) {
    limparErros(form); // limpa antes de pintar os novos

    camposComErro.forEach((key, index) => {
        let campo;

        // Caso especial da foto
        if (key === 'foto') {
            campo = form.querySelector('.botoes-foto-container');
        } else {
            campo = form.querySelector(`[name="${key}"]`);
        }

        if (campo) {
            campo.classList.add('error');

            // Cria mensagem embaixo do campo
            const msgErro = document.createElement('span');
            msgErro.className = 'error-message';
            msgErro.textContent = mensagens[index];

            // Insere depois do input ou do container da foto
            campo.closest('.form-group').appendChild(msgErro);
        }
    });

    // Foca no primeiro campo com erro
    const primeiroErro = form.querySelector('.error');
    primeiroErro?.focus();
}

export function limparErroFoto() {
    const containerFoto = document.querySelector('.botoes-foto-container');
    containerFoto?.classList.remove('error');

    // Remove a msg de erro que fica dentro do.form-group pai
    const formGroupFoto = containerFoto?.closest('.form-group');
    formGroupFoto?.querySelector('.error-message')?.remove();
}