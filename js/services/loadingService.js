import { overlay, overlayLoading, titulo, mensagem } from '../utils/domHelpers.js';

let currentButton = null;
let originalButtonText = "";

function show({
    button,
    buttonText = "Enviando...",
    title = "Carregando...",
    message = ""
}) {
    currentButton = button;
    originalButtonText = button.textContent;
    button.disabled = true;
    button.textContent = buttonText;
    titulo.textContent = title;
    mensagem.textContent = message;
    overlayLoading.classList.remove("hidden");
};

function hide() {
    overlayLoading.classList.add("hidden");
    if (currentButton) {
        currentButton.disabled = false;
        currentButton.textContent = originalButtonText;
    }
    currentButton = null;
    originalButtonText = "";
};

export const Loading = {show, hide};