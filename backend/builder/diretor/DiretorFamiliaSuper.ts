import { BuilderAcomodacao } from "../acomodacao/acomodacao";
import Acomodacao from "../../modelos/acomodacao";
import { familia_super } from "../../enumeracoes/bolsa_familia/familia_super";

export class DiretorFamiliaSuper {
    private builder: BuilderAcomodacao;

    constructor() {
        this.builder = new BuilderAcomodacao();
    }

    construir(preco: number): Acomodacao {
        return this.builder
            .servico(familia_super, "Família Super", preco)
            .construir();
    }
}
