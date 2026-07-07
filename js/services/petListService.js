import { listarPets } from '../services/api/petApi.js';
import { createPetCard } from '../renderers/petCardRenderer.js';
import { createEmptyState } from '../renderers/emptyStateRenderer.js';
import { createLoadingState } from '../renderers/loadingRenderer.js';

export async function initPetList() {    

    const container = document.querySelector('.pet-list');    
    if (!container) return;

    container.innerHTML = '';
    container.appendChild(createLoadingState());

    try {

        const pets = await listarPets();
        console.log(pets);

        container.innerHTML = '';

        if (pets.length === 0) {
            container.appendChild(createEmptyState());
            return;

        }

        pets.forEach(pet => {
            container.appendChild(createPetCard(pet));
        });

    } catch (error) {

        console.error(error);

    }

}