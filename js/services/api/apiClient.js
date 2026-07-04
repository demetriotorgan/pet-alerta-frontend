const BASE_URL = 'https://pet-alerta-backend.vercel.app/api';

export async function apiFetch(endpoint, options = {}) {

    const response = await fetch(`${BASE_URL}${endpoint}`, options);    

    let data = null;

    try {
        data = await response.json();
        console.log(data);
    } catch {}

    if (!response.ok) {
        throw new Error(data?.message || 'Erro na requisição');
    }

    return data;
}