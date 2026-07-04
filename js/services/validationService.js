// src/services/validationService.js

export const validarFormulario = (payload) => {
    const erros = [];
    const camposComErro = [];

    // Lista de campos obrigatórios conforme sua lista
    const camposObrigatorios = [
        { key: 'especie', label: 'Espécie' },
        { key: 'sexo', label: 'Sexo' },
        { key: 'porte', label: 'Porte' },
        { key: 'cor', label: 'Cor Predominante' },
        { key: 'categoria', label: 'Categoria' },
        { key: 'descricao', label: 'Descrição' },
        { key: 'nomeResponsavel', label: 'Nome do Responsável' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'cidade', label: 'Cidade' }
    ];

    // Validação de campos de texto/select
    camposObrigatorios.forEach(campo => {
        const valor = payload[campo.key];
        if(!valor || valor.toString().trim() ===""){
            erros.push(`O campo ${campo.label} é obrigatório.`);
            camposComErro.push(campo.key); // <-- guarda a key
        }
    });

    // Validação específica da Foto
    if (!payload.foto) {
        erros.push("É necessário anexar ou tirar uma foto do animal.");
        camposComErro.push('foto');
    }

    // Validação simples de telefone (pode ser expandida)
    if (payload.telefone && payload.telefone.replace(/\D/g, '').length < 10) {
        erros.push("O telefone informado parece inválido.");
    }

    return {
        isValid: erros.length === 0,
        erros,
        camposComErro
    };
};