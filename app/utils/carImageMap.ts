export const CAR_IMAGE_MAP: { [modelo: string]: string } = {
    'Argo': 'argo.png',
    'Dolphin Mini': 'dolphin_mini.png',
    'HB20': 'hb20.png',
    'Onix': 'onix.png',
    'Polo': 'polo.png',
};

/**
 * Retorna o caminho completo da imagem na pasta /public.
 * @param modelo O modelo do carro retornado pela API.
 * @returns O caminho público (ex: /carros/uno.jpg) ou um fallback.
 */
export function getCarImagePath(modelo: string): string {
    const defaultImage = '/carros/default.png'; // Crie uma imagem default
    
    // Normalize o modelo para a busca (se necessário, dependendo da sua API)
    // Se a API é consistente, use o modelo direto.
    const path = CAR_IMAGE_MAP[modelo];
    
    return path ? `/carros/${path}` : defaultImage;
}

