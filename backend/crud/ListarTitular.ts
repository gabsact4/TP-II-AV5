import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";

export default class ListarTitular implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        console.log("----- BUSCAR TITULAR POR DEPENDENTE -----");

        const clientes = Armazem.getInstancia().getClientes();

        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.\n");
            return;
        }

        const dependentes = clientes.filter(c => c.titular !== undefined);

        if (dependentes.length === 0) {
            console.log("Nenhum cliente dependente cadastrado.\n");
            return;
        }

        console.log("Selecione o dependente:");
        dependentes.forEach((dep, index) => {
            console.log(`${index + 1} - ${dep.nome}`);
        });

        const depIndex = this.entrada.receberNumero("Opção") - 1;
        const dependente = dependentes[depIndex];

        console.log(`------ TITULAR DE ${dependente.nome} ------`);
        console.log(`Nome: ${dependente.titular.nome}`);
        console.log(`Nome social: ${dependente.titular.nomeSocial}`);
        console.log(`Data de nascimento: ${dependente.titular.dataNascimento.toLocaleDateString()}\n`);
    }
}