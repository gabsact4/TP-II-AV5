import { BuilderAcomodacao } from "../acomodacao/acomodacao";
import Acomodacao from "../../modelos/acomodacao";
import { casal_simples } from "../../enumeracoes/bolsa_familia/casal_simples";

export class DiretorCasalSimples {
    private builder: BuilderAcomodacao;

    constructor() {
        this.builder = new BuilderAcomodacao();
    }

    construir(preco: number): Acomodacao {
        return this.builder
            .servico(casal_simples, "Casal Simples", preco)
            .construir();
    }
}
