// src/services/logPayload.js
export function logPayload(payload) {
    // Se for FormData usa entries(), se for objeto mostra direto
    if (payload instanceof FormData) {
        const dadosVisiveis = Object.fromEntries(payload.entries());
        console.log('Payload FormData:', dadosVisiveis);
        console.log('Foto:', payload.get('foto'));
    } else {
        // É objeto JS normal
        console.log('Payload:', payload);
        console.log('Foto:', payload.foto);
    }
}