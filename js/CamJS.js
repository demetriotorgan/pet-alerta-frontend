export class CamJS {
    constructor(configuracoes = {}) {
        // 1. Configurações dinâmicas passadas pelo usuário
        this.videoElement = configuracoes.videoElement;
        
        // Se a aplicação não passar um canvas, a biblioteca cria um em memória
        this.canvasElement = configuracoes.canvasElement || document.createElement('canvas');

        // Define o modo de faceamento padrão como 'environment' (Traseira) se não for especificado
        this.facingMode = configuracoes.facingMode || 'environment';
        
        // 2. Estado encapsulado (fim do estado global)
        this.streamAtual = null;
    }

    // 3. Métodos da Câmera
    async iniciar() {
        if (!this.videoElement) {
            throw new Error("CamJS: Elemento de vídeo não fornecido na configuração.");
        }

        try {
            // Aplicando o facingMode nas constraints do getUserMedia
            const constraints = {
                video: {
                    facingMode: this.facingMode
                }
            };
            this.streamAtual = await navigator.mediaDevices.getUserMedia(constraints);
            this.videoElement.srcObject = this.streamAtual;
        } catch (erro) {
            console.error("CamJS: Falha ao acessar hardware de vídeo.", erro);
            throw erro; 
        }
    }

    parar() {
        if (this.streamAtual) {
            this.streamAtual.getTracks().forEach(track => track.stop());
            this.streamAtual = null;
        }
        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }
    }

    // 4. Método de captura desacoplado (Retorna um objeto com os dados)
    capturar(formato = "image/jpeg", qualidade = 0.9) {
        return new Promise((resolve, reject) => {
            if (!this.streamAtual) {
                return reject(new Error("CamJS: A câmera não está iniciada."));
            }

            const contexto = this.canvasElement.getContext("2d");
            
            // Ajusta o canvas para o tamanho real do vídeo
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;
            
            contexto.drawImage(this.videoElement, 0, 0);

            // Transforma a captura em Blob e resolve a Promise
            this.canvasElement.toBlob((blob) => {
                if (!blob) {
                    return reject(new Error("CamJS: Erro ao processar a imagem."));
                }

                // Monta o objeto de retorno pronto para uso externo
                const captura = {
                    blob: blob,
                    formato: formato,
                    tamanhoBytes: blob.size,
                    dimensoes: {
                        largura: this.canvasElement.width,
                        altura: this.canvasElement.height
                    },
                    timestamp: Date.now()
                };

                resolve(captura);
            }, formato, qualidade);
        });
    }
}