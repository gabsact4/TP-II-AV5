import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";

export default class ListarDependentes implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        console.log("------ LISTAR DEPENDENTES POR TITULAR ------");

        const clientes = Armazem.getInstancia().getClientes();

        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.\n");
            return;
        }

        console.log("Selecione o titular:");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`);
        });

        const titularIndex = this.entrada.receberNumero("Opção") - 1;
        const titular = clientes[titularIndex];

        if (titular.dependentes.length === 0) {
            console.log(`\n${titular.nome} não possui dependentes.\n`);
            return;
        }

        console.log(`------ DEPENDENTES DE ${titular.nome} -------`);
        titular.dependentes.forEach((dep, i) => {
            console.log(`${i + 1} - ${dep.nome} (${dep.nomeSocial})`);
        });
        console.log("");
    }
}