import { BuilderAcomodacao } from "../acomodacao/acomodacao";
import Acomodacao from "../../modelos/acomodacao";
import { familia_simples } from "../../enumeracoes/bolsa_familia/familia_simples";

export class DiretorFamiliaSimples {
    private builder: BuilderAcomodacao;

    constructor() {
        this.builder = new BuilderAcomodacao();
    }

    construir(preco: number): Acomodacao {
        return this.builder
            .servico(familia_simples, "Família Simples", preco)
            .construir();
    }
}
