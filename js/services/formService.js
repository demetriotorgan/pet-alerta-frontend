import { gerarPayload } from '../payload.js';
import { resetarFormulario } from './uiResetService.js';
import { imagePreview, videoPreview, statusCamera, textoBotaoCamera,botaoCamera } from '../utils/domHelpers.js';
import { resetLoadingState, setLoadingState } from './formSubmitService.js';
import { buildPayload } from './formFlowService.js';
import { logPayload } from '../services/logPayload.js';
import { validarFormulario } from './validationService.js';
import { payloadToFormData } from './payloadToFormData.js';
import { limparErroFoto, mostrarErros } from '../utils/formErrorService.js';
import { cadastrarPet } from './api/petApi.js';
import { scrollParaElemento } from '../utils/scroll.js';

export function initPetForm(cameraController) {
    console.log("INIT PET FORM");
    const petForm = document.getElementById('petForm');
    console.log(petForm);
    // Quando tira foto OU escolhe da galeria, limpa o erro
    cameraController.onFotoCapturada = () => {
        limparErroFoto();
    };


    const inputGaleria = document.getElementById('petGalleryFile');
    inputGaleria.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
    });

    //scroll para area de video
    botaoCamera.addEventListener('click', ()=>{
        scrollParaElemento(videoPreview);
    });

    petForm.addEventListener('submit', async (event) => {
        console.log("SUBMIT");
        event.preventDefault();
        console.log("1");
        limparErroFoto(petForm);

        //1.Monta objeto   
        console.log("2");
        const payload = buildPayload(petForm, cameraController);

        //2. Executar validação
        console.log("3", payload)
        const validacao = validarFormulario(payload);
        console.log("4", validacao);
        if (!validacao.isValid) {
            mostrarErros(petForm, validacao.camposComErro, validacao.erros);
            return; // barra o submit
        }

        // 3. Converte pra FormData SÓ se passou
        console.log("6");
        const formDataFinal = payloadToFormData(payload);


        //4. Se passou segue para envio

        console.log("7");
        const botaoSubmit = petForm.querySelector('.btn-submit');

        logPayload(payload);

        //5. Enviando para o backend
        try {
            setLoadingState(botaoSubmit);
            const resultado = await cadastrarPet(formDataFinal);
            console.log("8");
            console.log(resultado.data);

            //Restaura o botão de envio do formulário
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
            console.log("9");

            limparErroFoto(petForm);

            alert('Animal Cadastrado com sucesso');

        } catch (error) {
            alert(error.message);
        } finally {
            resetLoadingState(botaoSubmit);
        }
    });

    petForm.addEventListener('input', (e) => {
        if (e.target.matches('input, select, textarea')) {
            e.target.classList.remove('error');
            // Remove msg de erro do campo
            const msg = e.target.closest('.form-group')?.querySelector('.error-message');
            msg?.remove();
        }
    });

    // Pra foto: remove quando escolher arquivo ou tirar foto
    inputGaleria.addEventListener('change', () => {
        document.querySelector('.botoes-foto-container').classList.remove('error');
        document.querySelector('.botoes-foto-container +.error-message')?.remove();
    });
}