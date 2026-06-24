export function resetarFormulario({
    petForm,
    imagePreview,
    videoPreview,
    statusCamera,
    textoBotaoCamera
}) {

    petForm.reset();

    imagePreview.src = "";
    imagePreview.style.display = 'none';

    videoPreview.style.display = 'none';

    textoBotaoCamera.textContent = 'Ligar Câmera';

    statusCamera.textContent = 'Status: Câmera Desligada';
}