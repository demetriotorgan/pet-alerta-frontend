import { gerarPayload } from '../payload.js';
import { logPayload } from './logPayload.js';

export function buildPayload(form, cameraController) {
    const fotoCamera = cameraController.getFotoBlob();
    const fotoGaleria = cameraController.getGalleryFile();

    const foto = fotoGaleria || fotoCamera;

    // console.log("CAMERA:", cameraController.getFotoBlob());
    // console.log("GALLERY:", cameraController.getGalleryFile());
    // console.log("FINAL FOTO:", foto);

    console.log("📷 CAMERA:", cameraController.getFotoBlob());
    console.log("📁 GALLERY:", cameraController.getGalleryFile());

    console.log("🎯 FOTO FINAL:",
        cameraController.getGalleryFile() ||
        cameraController.getFotoBlob()
    );

    const payload = gerarPayload(form, foto);

    logPayload(payload);

    return payload;
}