export interface Carro {
    modelo: string;
    preco: number;
}

export interface CarroResponse {
    carro?: Carro;
    error?: string;
    message?: string;
}