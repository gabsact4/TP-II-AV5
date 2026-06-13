import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";
import { DiretorSolteiroSimples } from "../builder/diretor/DiretorSolteiroSimples";
import { DiretorSolteiroMais } from "../builder/diretor/DiretorSolteiroMais";
import { DiretorCasalSimples } from "../builder/diretor/DiretorCasalSimples";
import { DiretorFamiliaSimples } from "../builder/diretor/DiretorFamiliaSimples";
import { DiretorFamiliaMais } from "../builder/diretor/DiretorFamiliaMais";
import { DiretorFamiliaSuper } from "../builder/diretor/DiretorFamiliaSuper";

export default class CriarAcomodacao implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        console.log("------ CADASTRAR ACOMODAÇÃO -------");
        console.log("Selecione o tipo de acomodação:");
        console.log("1 - Solteiro Simples");
        console.log("2 - Solteiro Mais");
        console.log("3 - Casal Simples");
        console.log("4 - Família Simples");
        console.log("5 - Família Mais");
        console.log("6 - Família Super");

        const opcao = this.entrada.receberNumero("Opção");
        const preco = this.entrada.receberNumero("Preço da diária (R$)");

        let acomodacao;

        switch (opcao) {
            case 1:
                acomodacao = new DiretorSolteiroSimples().construir(preco);
                break;
            case 2:
                acomodacao = new DiretorSolteiroMais().construir(preco);
                break;
            case 3:
                acomodacao = new DiretorCasalSimples().construir(preco);
                break;
            case 4:
                acomodacao = new DiretorFamiliaSimples().construir(preco);
                break;
            case 5:
                acomodacao = new DiretorFamiliaMais().construir(preco);
                break;
            case 6:
                acomodacao = new DiretorFamiliaSuper().construir(preco);
                break;
            default:
                console.log("Opção inválida!");
                return;
        }

        Armazem.getInstancia().adicionarAcomodacao(acomodacao);
        console.log(`Acomodação "${acomodacao.tipo}" cadastrada com sucesso!`);
        console.log(`Capacidade: ${acomodacao.capacidade} pessoa(s) | Preço: R$ ${acomodacao.preco.toFixed(2)}/diária`);
    }
}
