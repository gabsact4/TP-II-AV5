import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";

export default class DeletarDependente implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        const armazem = Armazem.getInstancia();
        const clientes = armazem.getClientes();
        const titulares = clientes.filter(c => !c.titular);

        if (titulares.length === 0) {
            console.log("Nenhum cliente titular cadastrado.\n");
            return;
        }

        console.log(" DELETAR DEPENDENTE ");
        console.log("Selecione o titular:");
        
        titulares.forEach((titular, index) => {
            console.log(`${index + 1} - ${titular.nome} (${titular.dependentes.length} dependente(s))`);
        });

        const titularOpcao = this.entrada.receberNumero("Opção") - 1;
        
        if (titularOpcao < 0 || titularOpcao >= titulares.length) {
            console.log("Opção inválida!");
            return;
        }

        const titular = titulares[titularOpcao];

        if (titular.dependentes.length === 0) {
            console.log(`${titular.nome} não possui dependentes `);
            return;
        }

        console.log(` DEPENDENTES DE ${titular.nome} `);
        titular.dependentes.forEach((dep, index) => {
            console.log(`${index + 1} - ${dep.nome} (${dep.nomeSocial})`);
        });

        const depOpcao = this.entrada.receberNumero("Selecione o dependente para deletar") - 1;
        
        if (depOpcao < 0 || depOpcao >= titular.dependentes.length) {
            console.log("Opção inválida!");
            return;
        }

        const dependente = titular.dependentes[depOpcao];
        
        titular.dependentes.splice(depOpcao, 1);
        
        const indexNoArmazem = clientes.findIndex(c => c === dependente);
        if (indexNoArmazem !== -1) {
            armazem.removerCliente(indexNoArmazem);
        }

        console.log(` Dependente deletado com sucesso`);
    }
}