// js/teste-cam.js
import { CamJS } from './CamJS.js'; // Certifique-se de que o caminho e o nome estão corretos

// Selecionando os elementos do DOM criados para o teste
const btnCamera = document.getElementById('botaoCamera');
const videoPreview = document.getElementById('videoPreview');
const statusCamera = document.getElementById('statusCamera');

let cameraInstance = null;

btnCamera.addEventListener('click', async () => {
    // 1. Evita instanciar múltiplas vezes se o usuário clicar de novo
    if (!cameraInstance) {
        console.log("Instanciando a CamJS...");
        
        // Passando o elemento de vídeo exigido pelo construtor da sua biblioteca
        cameraInstance = new CamJS({
            videoElement: videoPreview
        });
    }

    try {
        // Se a câmera já estiver ligada, vamos simular a captura e desligar
        if (cameraInstance.streamAtual && cameraInstance.streamAtual.active) {
            
            statusCamera.textContent = "Status: Capturando foto...";
            console.log("Chamando o método .capturar()...");
            
            const captura = await cameraInstance.capturar();
            console.log("Resultado da captura:", captura);
            // Aqui você deve ver no console: { blob: Blob, timestamp: 17... }
            
            alert(`Sucesso! Foto capturada em formato Blob.\nTamanho: ${(captura.blob.size / 1024).toFixed(2)} KB`);

            // Desliga a câmera usando o método de descarte da biblioteca
            console.log("Desligando hardware...");
            await cameraInstance.parar();
            
            videoPreview.style.display = "none";
            statusCamera.textContent = "Status: Câmera Desligada (Foto Salva em Memória)";
            btnCamera.querySelector('.text-camera').textContent = "Tirar foto agora";

        } else {
            // Caso contrário, vamos ligar o hardware
            statusCamera.textContent = "Status: Solicitando permissão da câmera...";
            videoPreview.style.display = "block";

            console.log("Chamando o método .iniciar()...");
            await cameraInstance.iniciar();
            
            statusCamera.textContent = "Status: Câmera AO VIVO";
            // Altera o texto do botão para indicar a próxima ação do usuário
            btnCamera.querySelector('.text-camera').textContent = "Clique para binarizar/capturar";
        }

    } catch (error) {
        console.error("Falha no ciclo de vida da CamJS:", error);
        statusCamera.textContent = `Erro: ${error.message}`;
        alert(`Erro na CamJS: ${error.message}`);
    }
});