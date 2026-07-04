import { gerarPayload } from '../payload.js';
import { resetarFormulario } from './uiResetService.js';
import { imagePreview, videoPreview, statusCamera, textoBotaoCamera } from '../utils/domHelpers.js';
import { resetLoadingState, setLoadingState } from './formSubmitService.js';
import { buildPayload } from './formFlowService.js';
import { logPayload } from '../services/logPayload.js';
import { validarFormulario } from './validationService.js';
import { payloadToFormData } from './payloadToFormData.js';
import { limparErroFoto, mostrarErros } from '../utils/formErrorService.js';
import { cadastrarPet } from './api/petApi.js';

export function initPetForm(cameraController) {

    const petForm = document.getElementById('petForm');
      // Quando tira foto OU escolhe da galeria, limpa o erro
    cameraController.onFotoCapturada = () => {
        limparErroFoto();
    };

    
    const inputGaleria = document.getElementById('petGalleryFile');
    inputGaleria.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;       
    });

    petForm.addEventListener('submit', async (event) => {
        event.preventDefault();
         limparErroFoto(petForm);

        //1.Monta objeto        
        const payload = buildPayload(petForm, cameraController);

        //2. Executar validação
        const validacao = validarFormulario(payload);
        if (!validacao.isValid) {
            mostrarErros(petForm, validacao.camposComErro, validacao.erros);
            return; // barra o submit
        }

        // 3. Converte pra FormData SÓ se passou
        const formDataFinal = payloadToFormData(payload);


        //4. Se passou segue para envio
        const botaoSubmit = petForm.querySelector('.btn-submit');

        //5. Enviando para o backend
        try {
            setLoadingState(botaoSubmit);    
            const resultado = await cadastrarPet(formDataFinal);
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
             
            limparErroFoto(petForm);
            // logPayload(payload);
            alert('Animal Cadastrado com sucesso');

        } catch (error) {
            alert(error.message);   
        }finally{
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