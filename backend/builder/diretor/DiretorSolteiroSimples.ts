import { BuilderAcomodacao } from "../acomodacao/acomodacao";
import Acomodacao from "../../modelos/acomodacao";
import { solteiro_simples } from "../../enumeracoes/bolsa_familia/solteiro_simples";

export class DiretorSolteiroSimples {
    private builder: BuilderAcomodacao;

    constructor() {
        this.builder = new BuilderAcomodacao();
    }

    construir(preco: number): Acomodacao {
        return this.builder
            .servico(solteiro_simples, "Solteiro Simples", preco)
            .construir();
    }
}
