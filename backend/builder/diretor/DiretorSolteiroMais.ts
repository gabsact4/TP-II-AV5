import { BuilderAcomodacao } from "../acomodacao/acomodacao";
import Acomodacao from "../../modelos/acomodacao";
import { solteiro_mais } from "../../enumeracoes/bolsa_familia/solteiro_mais";

export class DiretorSolteiroMais {
    private builder: BuilderAcomodacao;

    constructor() {
        this.builder = new BuilderAcomodacao();
    }

    construir(preco: number): Acomodacao {
        return this.builder
            .servico(solteiro_mais, "Solteiro Mais", preco)
            .construir();
    }
}
