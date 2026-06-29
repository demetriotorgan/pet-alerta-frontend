import { gerarPayload } from '../payload.js';
import { logPayload } from './logPayload.js';

export function buildPayload(form, cameraController) {
    const formData = new FormData(form);

    //1.Logica da foto que estava em gerarPaylaod
    const fotoCamera = cameraController.getFotoBlob();
    const fotoGaleria = cameraController.getGalleryFile();
    const foto = fotoGaleria || fotoCamera;    

    //2.Monta objeto para validação
    const payload = {
        nomeAnimal: formData.get('nomeAnimal')?.trim() || '',
        especie: formData.get('especie') || '',
        raca: formData.get('raca')?.trim() || '',
        sexo: formData.get('sexo') || '',
        idade: formData.get('idade')?.trim() || '',
        porte: formData.get('porte') || '',
        cor: formData.get('cor')?.trim() || '',
        situacao: formData.get('situacao') || '',
        descricao: formData.get('descricao')?.trim() || '',
        nomeResponsavel: formData.get('nomeResponsavel')?.trim() || '',
        telefone: formData.get('telefone')?.trim() || '',
        cidade: formData.get('cidade')?.trim() || '',
        foto: foto // null se não tiver nada
    }       

    return payload;
}