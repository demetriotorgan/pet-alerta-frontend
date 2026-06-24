// ==========================================================================
// Pet Alerta - Orquestrador Principal do JavaScript (js/main.js)
// ==========================================================================

import { initHeaderToggle } from './header.js';
import { initFilterBadges } from './dashboard.js';
import { initCameraController } from './services/cameraService.js';
import { initPetForm } from './services/formService.js';
import { initHeader } from './services/headerService.js';


document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os recursos do Dashboard
    initFilterBadges();

    //Toggle do Header
    initHeader();
    
    if (document.getElementById('petForm')) {
        const cameraController = initCameraController();
        initPetForm(cameraController);
    }
});
