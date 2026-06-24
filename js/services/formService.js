import { gerarPayload } from '../payload.js';
import { resetarFormulario } from './uiResetService.js';
import { imagePreview, videoPreview, statusCamera, textoBotaoCamera } from '../utils/domHelpers.js';
import { resetLoadingState, setLoadingState } from './formSubmitService.js';
import { buildPayload } from './formFlowService.js';
import { logPayload } from '../services/logPayload.js';

export function initPetForm(cameraController) {

    const petForm = document.getElementById('petForm');
    const inputGaleria = document.getElementById('petGalleryFile');

    inputGaleria.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (!file) return;
        
    });

    petForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const botaoSubmit = petForm.querySelector('.btn-submit');

        setLoadingState(botaoSubmit);

        // Passa o petForm e o fotoCapturadaBlob (que pode ser null se ele usou a galeria)
        const payload = buildPayload(petForm, cameraController);
        logPayload(payload);

        // Reinicia os botões após a simulação de envio
        setTimeout(() => {
            // 1. Restaura o botão de envio do formulário
            resetLoadingState(botaoSubmit);

            // reset da câmera via controller
            cameraController.reset();

            // reset da UI via service
            resetarFormulario({
                petForm,
                imagePreview,
                videoPreview,
                statusCamera,
                textoBotaoCamera
            });

            alert('Animal Cadastrado com sucesso');
        }, 1500);
    });
}