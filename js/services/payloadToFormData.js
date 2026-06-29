// src/services/formFlowService.js
export function payloadToFormData(payload) {
    const formData = new FormData();
    
    Object.entries(payload).forEach(([key, value]) => {
        if (value === null || value === '') return; // não manda campo vazio
        
        if (key === 'foto' && value) {
            const nomeFinal = value.name || `foto_${Date.now()}.jpg`;
            formData.append('foto', value, nomeFinal);
        } else {
            formData.append(key, value);
        }
    });
    
    return formData;
}