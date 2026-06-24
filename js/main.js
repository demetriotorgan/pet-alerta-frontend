// ==========================================================================
// Pet Alerta - Orquestrador Principal do JavaScript (js/main.js)
// ==========================================================================

import { initHeaderToggle } from './header.js';
import { initFilterBadges } from './dashboard.js';
import { gerarPayload } from './payload.js';
// Importação da sua biblioteca CamJS
import { CamJS } from './CamJS.js'; 

// Variável em escopo global do módulo para armazenar o Blob da foto tirada pela câmera
let fotoCapturadaBlob = null;
let cameraInstancia = null;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os recursos do Dashboard
    initFilterBadges();

    // Configurações do Header Toggle
    const botaoVerAnimais = document.querySelector('.app-header .btn-nav, .app-header .btn-primary:nth-child(1)');
    const botaoAnunciarPet = document.querySelector('.app-header .btn-primary, .app-header .btn-nav:nth-child(2)');

    if (botaoVerAnimais && botaoAnunciarPet) {
        initHeaderToggle(botaoVerAnimais, botaoAnunciarPet);
    }

    // -------------------------------------------------------------
    // INTEGRAÇÃO DA BIBLIOTECA CAMJS
    // -------------------------------------------------------------
    const videoPreview = document.getElementById('videoPreview');
    const imagePreview = document.getElementById('imagePreview');
    const botaoCamera = document.getElementById('botaoCamera');
    const textoBotaoCamera = document.getElementById('textoBotaoCamera');
    const statusCamera = document.getElementById('statusCamera');
    const inputGaleria = document.getElementById('petGalleryFile');

    // Inicializa a instância da CamJS passando o elemento de vídeo mapeado no HTML
    cameraInstancia = new CamJS({ videoElement: videoPreview });

    // Estado do fluxo da câmera: 'desligada', 'gravando' ou 'capturada'
    let estadoCamera = 'desligada'; 

    botaoCamera.addEventListener('click', async () => {
        if (estadoCamera === 'desligada' || estadoCamera === 'capturada') {
            // AÇÃO: LIGAR A CÂMERA
            try {
                imagePreview.style.display = 'none'; // Esconde prévias anteriores
                videoPreview.style.display = 'block'; // Exibe o elemento de vídeo ao vivo
                
                statusCamera.textContent = "Status: Iniciando hardware...";
                await cameraInstancia.iniciar();
                
                estadoCamera = 'gravando';
                textoBotaoCamera.textContent = "Tirar Foto";
                statusCamera.textContent = "Status: Câmera Ao Vivo";
                statusCamera.style.color = "#0D6EFD";
            } catch (erro) {
                statusCamera.textContent = "Status: Erro ao acessar câmera.";
                statusCamera.style.color = "#DC3545";
            }
        } else if (estadoCamera === 'gravando') {
            // AÇÃO: CAPTURAR A IMAGEM
            try {
                // Captura o objeto contendo o blob usando o método da CamJS
                const captura = await cameraInstancia.capturar("image/jpeg", 0.9);
                
                fotoCapturadaBlob = captura.blob; // Armazena o Blob na nossa variável do módulo
                
                // Cria uma URL em memória temporária para carregar na tag <img> de preview
                imagePreview.src = URL.createObjectURL(fotoCapturadaBlob);
                
                // Desliga a câmera física para economizar recursos/bateria do usuário
                cameraInstancia.parar(); 

                // Alterna as visualizações na tela
                videoPreview.style.display = 'none';
                imagePreview.style.display = 'block';

                estadoCamera = 'capturada';
                textoBotaoCamera.textContent = "Tirar outra foto";
                statusCamera.textContent = "Status: Foto Capturada com Sucesso!";
                statusCamera.style.color = "#198754";

                // Limpa o input de arquivo de galeria caso houvesse algo selecionado antes
                inputGaleria.value = ""; 
            } catch (erro) {
                console.error(erro);
                statusCamera.textContent = "Status: Erro ao processar captura.";
            }
        }
    });

    // Se o usuário decidir escolher um arquivo da galeria, limpamos a foto gravada da câmera
    inputGaleria.addEventListener('change', () => {
        if (inputGaleria.files.length > 0) {
            fotoCapturadaBlob = null; // Prioriza o arquivo físico da galeria
            if (estadoCamera === 'gravando') {
                cameraInstancia.parar();
                videoPreview.style.display = 'none';
            }
            imagePreview.style.display = 'none';
            estadoCamera = 'desligada';
            textoBotaoCamera.textContent = "Ligar Câmera";
            statusCamera.textContent = "Status: Arquivo selecionado da galeria";
            statusCamera.style.color = "#555";
        }
    });

    // -------------------------------------------------------------
    // ENVIO DO FORMULÁRIO (PAYLOAD FINAL)
    // -------------------------------------------------------------
    const petForm = document.getElementById('petForm');
    
    petForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const botaoSubmit = petForm.querySelector('.btn-submit');
        botaoSubmit.disabled = true;
        botaoSubmit.textContent = 'Enviando....';

        // Passa o petForm e o fotoCapturadaBlob (que pode ser null se ele usou a galeria)
        const payload = gerarPayload(petForm, fotoCapturadaBlob);
       
        // Convertendo para objeto legível no console.log
        const dadosVisiveis = Object.fromEntries(payload.entries());
        console.log('Payload produzido com sucesso (Visual):', dadosVisiveis);
        
        // Dica pedagógica: O arquivo binário em si não aparece como texto limpo no fromEntries,
        // mas você pode comprovar a existência dele buscando diretamente no FormData:
        console.log('Verificação do arquivo de foto anexado:', payload.get('foto'));

        // Reinicia os botões após a simulação de envio
        setTimeout(() => {
            botaoSubmit.disabled = false;
            botaoSubmit.textContent = 'Cadastrar Animal';
        }, 1500);
    });
});
