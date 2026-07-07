// ==========================================================================
// Pet Alerta - Orquestrador Principal do JavaScript (js/main.js)
// ==========================================================================

import { initHeaderToggle } from './header.js';
import { initFilterBadges } from './dashboard.js';
import { initCameraController } from './services/cameraService.js';
import { initPetForm } from './services/formService.js';
import { initHeader } from './services/headerService.js';
import { initPetList } from './services/petListService.js';


document.addEventListener('DOMContentLoaded', () => {
    console.log("MAIN");
    // Inicializa os recursos do Dashboard
    initFilterBadges();

    //Toggle do Header
    initHeader();

    //Lista cards
    initPetList();
    
    if (document.getElementById('petForm')) {
        console.log("FORM ENCONTRADO");
        const cameraController = initCameraController();
        console.log(cameraController);
        initPetForm(cameraController);
         console.log("FORM INICIALIZADO");
    }
});
