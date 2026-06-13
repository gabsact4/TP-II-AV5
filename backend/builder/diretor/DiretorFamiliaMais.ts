import { BuilderAcomodacao } from "../acomodacao/acomodacao";
import Acomodacao from "../../modelos/acomodacao";
import { familia_mais } from "../../enumeracoes/bolsa_familia/familia_mais";

export class DiretorFamiliaMais {
    private builder: BuilderAcomodacao;

    constructor() {
        this.builder = new BuilderAcomodacao();
    }

    construir(preco: number): Acomodacao {
        return this.builder
            .servico(familia_mais, "Família Mais", preco)
            .construir();
    }
}
