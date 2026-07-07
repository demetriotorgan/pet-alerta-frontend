// renderers/petCardRenderer.js

/**
 * Cria um elemento <article> com os dados do pet
 * @param {Object} pet - Objeto retornado pela API
 * @returns {HTMLElement} article com classe pet-card
 */
export function createPetCard(pet) {
    const article = document.createElement('article');
    article.className = 'pet-card';
    article.dataset.petId = pet.id || pet._id || '';

    // Fallbacks pra evitar undefined na tela
    const foto = pet.foto.url || pet.fotoUrl || './img/placeholder-pet.jpg';
    const nome = pet.nomeAnimal || 'Sem nome';
    const especie = pet.especie || 'Não informado';
    const raca = pet.raca || 'SRD';
    const sexo = pet.sexo || 'Não informado';
    const idade = pet.idade || 'Não informado';
    const porte = pet.porte || 'Não informado';
    const cor = pet.cor || 'Não informado';
    const descricao = pet.descricao || 'Sem descrição disponível.';
    const responsavel = pet.nomeResponsavel || 'Não informado';
    const cidade = pet.cidade || 'Não informado';
    const estado = pet.estado || '';
    const cidadeCompleta = estado ? `${cidade} - ${estado}` : cidade;
    const telefone = pet.telefone || pet.contatoTelefone || '';
    const status = pet.status || 'Perdido'; // Perdido, Encontrado, etc
    const ultimaAtualizacao = formatarData(pet.updatedAt || pet.ultimaAtualizacao);

    // Monta link do WhatsApp só se tiver telefone
    const telefoneLimpo = telefone.replace(/\D/g, '');
    const linkWhatsapp = telefoneLimpo 
        ? `https://wa.me/55${telefoneLimpo}` 
        : '#';

    // Define cor do badge pelo status
    const badgeClass = getBadgeClass(status);
    const badgeEmoji = getBadgeEmoji(status);

    article.innerHTML = `
        <div class="pet-card-thumb">
            <img src="${foto}" alt="Foto do Pet ${nome}" loading="lazy">
        </div>

        <div class="pet-card-info">
            <h3>${nome}</h3>
            <div class="pet-specs">
                <span><i class="ph-duotone ph-paw-print"></i> <strong>Espécie:</strong> ${especie}</span>
                <span><i class="ph ph-dna"></i> <strong>Raça:</strong> ${raca}</span>
                <span><i class="ph ph-gender-intersex"></i> <strong>Sexo:</strong> ${sexo}</span>
                <span><i class="ph ph-cake"></i> <strong>Idade:</strong> ${idade}</span>
                <span><i class="ph ph-ruler"></i> <strong>Porte:</strong> ${porte}</span>
                <span><i class="ph ph-palette"></i> <strong>Cor:</strong> ${cor}</span>
            </div>
            <p class="pet-description">${descricao}</p>                        
        </div>

        <div class="pet-card-contact">
            <p><strong>Responsável:</strong> ${responsavel}</p>
            <p><strong>Cidade:</strong> ${cidadeCompleta}</p>
            <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>

            <a href="${linkWhatsapp}" class="btn-whatsapp" target="_blank" rel="noopener noreferrer" ${!telefoneLimpo ? 'style="pointer-events:none;opacity:0.5;"' : ''}>
                <i class="ph-fill ph-whatsapp-logo"></i>
                <span>Enviar Mensagem</span>
            </a>

            <span class="badge ${badgeClass}">${status} ${badgeEmoji}</span>
        </div>

        <footer class="pet-card-footer">
            <span>Última Atualização:</span>
            <span>${ultimaAtualizacao}</span>
        </footer>
    `;

    return article;
}

/**
 * Formata data ISO para DD/MM/YYYY
 * @param {string} dataISO 
 * @returns {string}
 */
function formatarData(dataISO) {
    if (!dataISO) return 'Data não informada';
    
    try {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return 'Data inválida';
    }
}

/**
 * Retorna classe CSS do badge conforme status
 * @param {string} status 
 * @returns {string}
 */
function getBadgeClass(status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('perdido')) return 'badge-perdido';
    if (statusLower.includes('encontrado')) return 'badge-encontrado';
    if (statusLower.includes('adoção') || statusLower.includes('adocao')) return 'badge-adocao';
    if (statusLower.includes('resgatado')) return 'badge-resgatado';
    return 'badge-default';
}

/**
 * Retorna emoji do badge conforme status
 * @param {string} status 
 * @returns {string}
 */
function getBadgeEmoji(status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('perdido')) return '🔴';
    if (statusLower.includes('encontrado')) return '🟢';
    if (statusLower.includes('adoção') || statusLower.includes('adocao')) return '💚';
    if (statusLower.includes('resgatado')) return '🔵';
    return '⚪';
}