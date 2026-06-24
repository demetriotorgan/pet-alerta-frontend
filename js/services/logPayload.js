export function logPayload(payload) {
    const dadosVisiveis = Object.fromEntries(payload.entries());

    console.log('Payload:', dadosVisiveis);
    console.log('Foto:', payload.get('foto'));
}