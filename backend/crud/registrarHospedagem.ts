import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";
import Hospedagem from "../modelos/hospedagem";

export default class RegistrarHospedagem implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        console.log("------ REGISTRAR HOSPEDAGEM -------");

        const armazem = Armazem.getInstancia();
        const clientes = armazem.getClientes().filter(c => !c.titular);
        const acomodacoes = armazem.getAcomodacoes();

        if (clientes.length === 0) {
            console.log("Nenhum cliente titular cadastrado. Cadastre um cliente primeiro.");
            return;
        }

        if (acomodacoes.length === 0) {
            console.log("Nenhuma acomodação cadastrada. Cadastre uma acomodação primeiro.");
            return;
        }

        // Selecionar hóspede
        console.log("\nSelecione o hóspede (titular):");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome} (${cliente.nomeSocial})`);
        });

        const clienteIndex = this.entrada.receberNumero("Opção") - 1;
        if (clienteIndex < 0 || clienteIndex >= clientes.length) {
            console.log("Opção inválida!");
            return;
        }

        const hospede = clientes[clienteIndex];

        // Verificar se já está hospedado
        const jaHospedado = armazem.getHospedagens().some(h => h.hospede === hospede);
        if (jaHospedado) {
            console.log("Este hóspede já possui uma hospedagem ativa!");
            return;
        }

        // Selecionar acomodação
        console.log("\nSelecione a acomodação:");
        acomodacoes.forEach((acomodacao, index) => {
            console.log(`${index + 1} - ${acomodacao.tipo} | Capacidade: ${acomodacao.capacidade} pessoa(s) | R$ ${acomodacao.preco.toFixed(2)}/diária`);
        });

        const acomodacaoIndex = this.entrada.receberNumero("Opção") - 1;
        if (acomodacaoIndex < 0 || acomodacaoIndex >= acomodacoes.length) {
            console.log("Opção inválida!");
            return;
        }

        const acomodacao = acomodacoes[acomodacaoIndex];

        // Datas
        const dataEntrada = this.entrada.receberData("Data de entrada");
        const dataSaida = this.entrada.receberData("Data de saída");

        const hospedagem = new Hospedagem(hospede, acomodacao, dataEntrada, dataSaida);
        armazem.adicionarHospedagem(hospedagem);

        console.log(`\nHospedagem registrada com sucesso!`);
        console.log(`Hóspede: ${hospede.nome}`);
        console.log(`Acomodação: ${acomodacao.tipo}`);
        console.log(`Entrada: ${dataEntrada.toLocaleDateString("pt-BR")}`);
        console.log(`Saída: ${dataSaida.toLocaleDateString("pt-BR")}`);
    }
}
