import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";

export default class EncerrarHospedagem implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        console.log("------ ENCERRAR HOSPEDAGEM -------");

        const armazem = Armazem.getInstancia();
        const hospedagens = armazem.getHospedagens();

        if (hospedagens.length === 0) {
            console.log("Nenhuma hospedagem ativa.");
            return;
        }

        hospedagens.forEach((hospedagem, index) => {
            console.log(`${index + 1} - ${hospedagem.hospede.nome} | ${hospedagem.acomodacao.tipo} | Saída: ${hospedagem.dataSaida.toLocaleDateString("pt-BR")}`);
        });

        const opcao = this.entrada.receberNumero("Selecione a hospedagem para encerrar") - 1;

        if (opcao < 0 || opcao >= hospedagens.length) {
            console.log("Opção inválida!");
            return;
        }

        const hospedagem = hospedagens[opcao];
        armazem.removerHospedagem(opcao);
        console.log(`Hospedagem de "${hospedagem.hospede.nome}" na acomodação "${hospedagem.acomodacao.tipo}" encerrada com sucesso!`);
    }
}
