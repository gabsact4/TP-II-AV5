import Prototipo from "../interfaces/prototipo";

export default class Acomodacao implements Prototipo {
    public numero: string;
    public tipo: string;
    public capacidade: number;
    public precoDiaria: number;
    public andar: number;
    public descricao: string;
    public status: string = "Disponível";
    // campo legado
    public preco: number;

    public clonar(): Prototipo {
        const clone = new Acomodacao();
        clone.numero = this.numero;
        clone.tipo = this.tipo;
        clone.capacidade = this.capacidade;
        clone.precoDiaria = this.precoDiaria;
        clone.andar = this.andar;
        clone.descricao = this.descricao;
        clone.status = this.status;
        return clone;
    }
}
