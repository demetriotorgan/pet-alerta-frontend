export const CAMERA_STATE = {
    OFF: 'desligada',
    LIVE: 'gravando',
    CAPTURED: 'capturada'
};

export function atualizarStatus(elemento, texto, cor) {
    elemento.textContent = texto;
    elemento.style.color = cor;
}