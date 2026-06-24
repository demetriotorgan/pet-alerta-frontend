import { CamJS } from "../CamJS.js";
import { CAMERA_STATE,  atualizarStatus} from "../utils/cameraUI.js";
import {videoPreview, imagePreview, botaoCamera, textoBotaoCamera, statusCamera, inputGaleria} from "../utils/domHelpers.js";

export function initCameraController() {

    // Variável em escopo  do módulo para armazenar o Blob da foto tirada pela câmera
    let fotoCapturadaBlob = null;
    let estadoCamera = CAMERA_STATE.OFF;
    let previewUrl = null;    

    function reset() {
        cameraInstancia.parar();

        fotoCapturadaBlob = null;
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }
        imagePreview.src = '';

        estadoCamera = CAMERA_STATE.OFF;

        videoPreview.style.display = 'none';
        imagePreview.style.display = 'none';        

        textoBotaoCamera.textContent = 'Ligar Câmera';
        atualizarStatus(statusCamera,'Status: Câmera Desligada', '#555');
        inputGaleria.value = '';
    };

    // Inicializa a instância da CamJS passando o elemento de vídeo mapeado no HTML
    const cameraInstancia = new CamJS({
        videoElement: videoPreview
    });    

    botaoCamera.addEventListener('click', async () => {
        if (estadoCamera === CAMERA_STATE.OFF || estadoCamera === CAMERA_STATE.CAPTURED) {
            // AÇÃO: LIGAR A CÂMERA
            try {
                imagePreview.style.display = 'none'; // Esconde prévias anteriores
                videoPreview.style.display = 'block'; // Exibe o elemento de vídeo ao vivo

                atualizarStatus(statusCamera,"Status: Iniciando hardware...", '#555');

                await cameraInstancia.iniciar();

                estadoCamera = CAMERA_STATE.LIVE;
                textoBotaoCamera.textContent = "Tirar Foto";
                atualizarStatus(statusCamera,"Status: Câmera Ao Vivo", "#0D6EFD");
            } catch (erro) {
                atualizarStatus(statusCamera,"Status: Erro ao acessar câmera.", "#DC3545");
            }
        } else if (estadoCamera === CAMERA_STATE.LIVE) {
            // AÇÃO: CAPTURAR A IMAGEM
            try {
                // Captura o objeto contendo o blob usando o método da CamJS
                const captura = await cameraInstancia.capturar("image/jpeg", 0.9);

                fotoCapturadaBlob = captura.blob; // Armazena o Blob na nossa variável do módulo

                // Cria uma URL em memória temporária para carregar na tag <img> de preview
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                }

                previewUrl = URL.createObjectURL(fotoCapturadaBlob);
                imagePreview.src = previewUrl;

                // Desliga a câmera física para economizar recursos/bateria do usuário
                cameraInstancia.parar();

                // Alterna as visualizações na tela
                videoPreview.style.display = 'none';
                imagePreview.style.display = 'block';

                estadoCamera = CAMERA_STATE.CAPTURED;
                textoBotaoCamera.textContent = "Tirar outra foto";
                atualizarStatus(statusCamera,"Status: Foto Capturada com Sucesso!", "#198754");

                // Limpa o input de arquivo de galeria caso houvesse algo selecionado antes
                inputGaleria.value = "";
            } catch (erro) {
                console.error(erro);
                atualizarStatus(statusCamera,"Status: Erro ao processar captura.", "#DC3545");
            }
        }
    });

    inputGaleria.addEventListener('change', () => {

        if (inputGaleria.files.length > 0) {

            fotoCapturadaBlob = null;
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                previewUrl = null;
            }

            imagePreview.src = '';

            if (estadoCamera === CAMERA_STATE.LIVE) {
                cameraInstancia.parar();
            }

            videoPreview.style.display = 'none';
            imagePreview.style.display = 'none';

            estadoCamera = CAMERA_STATE.OFF;

            textoBotaoCamera.textContent = 'Ligar Câmera';
            atualizarStatus(statusCamera,'Status: Arquivo selecionado da galeria', '#555');
        }

    });

    return {
        getFotoBlob: () => fotoCapturadaBlob,
        reset,
        parar: () => cameraInstancia.parar()
    }
};
