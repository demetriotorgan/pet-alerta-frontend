export function gerarPayload(formElement, foto = null) {

    const formData = new FormData(formElement);

    // 🔥 REMOVE qualquer foto automática do input HTML
    formData.delete('foto');

    // 🔥 define fonte única (controller manda)
    if (foto) {
        const nomeFinal = foto.name || `foto_${Date.now()}.jpg`;
        formData.set('foto', foto, nomeFinal);
    }

    return formData;
}