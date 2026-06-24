import { initHeaderToggle } from '../header.js';

export function initHeader() {

    const botaoVerAnimais = document.querySelector(
        '.app-header .btn-nav, .app-header .btn-primary:nth-child(1)'
    );

    const botaoAnunciarPet = document.querySelector(
        '.app-header .btn-primary, .app-header .btn-nav:nth-child(2)'
    );

    if (botaoVerAnimais && botaoAnunciarPet) {
        initHeaderToggle(botaoVerAnimais, botaoAnunciarPet);
    }
}