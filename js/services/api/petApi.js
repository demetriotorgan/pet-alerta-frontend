import { apiFetch } from './apiClient.js';

export function cadastrarPet(formData) {

    return apiFetch('/pets', {
        method: 'POST',
        body: formData
    });
};

export async function listarPets() {
    const response = await apiFetch('/pets')
    return response.data
}