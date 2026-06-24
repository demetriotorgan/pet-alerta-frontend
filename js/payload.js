export function gerarPayload(formElement, fotoBlob = null){
    const paylaod =  new FormData(formElement); //Captura automaticamente todos os campos com o atributo 'name'
    if(fotoBlob){
        paylaod.set('foto', fotoBlob, `captura_${Date.now()}.jpg`);
    }
    return paylaod;
}