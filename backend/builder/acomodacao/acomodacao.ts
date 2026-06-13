import Acomodacao from "../../modelos/acomodacao";

type TipoAcomodacaoEnum = {
    cama_solteiro: number
    cama_casal: number
    suite: number
    climatização: string
    garagem: number
}

export class BuilderAcomodacao {
    private acomodacaoInstance: Acomodacao;

    constructor() {
        this.acomodacaoInstance = new Acomodacao();
    }

    servico(enumTipo: TipoAcomodacaoEnum, nome: string, preco: number): this {
        this.acomodacaoInstance.tipo = nome;

        this.acomodacaoInstance.capacidade =
            (enumTipo.cama_casal * 2) + enumTipo.cama_solteiro;

        this.acomodacaoInstance.preco = preco;

        return this;
    }

    construir(): Acomodacao {
        return this.acomodacaoInstance;
    }
}