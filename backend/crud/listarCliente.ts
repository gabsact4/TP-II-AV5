import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";

export default class ListarClientes implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        const armazem = Armazem.getInstancia();
        const clientes = armazem.getClientes();

        console.log("        LISTA DE CLIENTES             ");

        if (clientes.length === 0) {
            console.log(" Nenhum cliente cadastrado");
            return;
        }

        const titulares = clientes.filter(c => !c.titular);
        const dependentes = clientes.filter(c => c.titular);

        console.log(` TITULARES (${titulares.length}):`);
        console.log("─".repeat(50));
        titulares.forEach((cliente, index) => {
            console.log(`${index + 1}. Nome: ${cliente.nome}`);
            console.log(`   Social: ${cliente.nomeSocial}`);
            console.log(`   Dependentes: ${cliente.dependentes.length}`);
            console.log(`   Telefone: (${cliente.telefones[0]?.ddd}) ${cliente.telefones[0]?.numero}`);
            console.log("─".repeat(50));
        });

        if (dependentes.length > 0) {
            console.log(`DEPENDENTES (${dependentes.length}):`);
            console.log("─".repeat(50));
            dependentes.forEach((cliente, index) => {
                console.log(`${index + 1}. Nome: ${cliente.nome}`);
                console.log(`   Social: ${cliente.nomeSocial}`);
                console.log(`   Titular: ${cliente.titular?.nome}`);
                console.log("─".repeat(50));
            });
        }
        console.log("");
    }
}