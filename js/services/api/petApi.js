import { apiFetch } from './apiClient.js';

export function cadastrarPet(formData) {

    return apiFetch('/pets', {
        method: 'POST',
        body: formData
    });

}