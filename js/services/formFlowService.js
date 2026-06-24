import { gerarPayload } from '../payload.js';
import { logPayload } from './logPayload.js';

export function buildPayload(form, cameraController) {
    const foto = cameraController.getFotoBlob();
    const payload = gerarPayload(form, foto);

    logPayload(payload);

    return payload;
}