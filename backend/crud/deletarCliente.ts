import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";

export default class DeletarCliente implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        const armazem = Armazem.getInstancia();
        const clientes = armazem.getClientes();
        
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.\n");
            return;
        }

        console.log("------ DELETAR CLIENTE ------");
        console.log("Selecione o cliente para deletar:");
        
        clientes.forEach((cliente, index) => {
            const tipo = cliente.titular ? " Dependente" : " Titular";
            const titularNome = cliente.titular ? ` (Titular: ${cliente.titular.nome})` : "";
            console.log(`${index + 1} - ${tipo}: ${cliente.nome}${titularNome}`);
        });

        const opcao = this.entrada.receberNumero("Opção") - 1;
        
        if (opcao < 0 || opcao >= clientes.length) {
            console.log("Opção inválida!");
            return;
        }

        const clienteDeletado = clientes[opcao];
        
        if (clienteDeletado.dependentes && clienteDeletado.dependentes.length > 0) {
            console.log(`ATENÇÃO: ${clienteDeletado.nome} possui ${clienteDeletado.dependentes.length} dependente(s)!`);
            const confirmar = this.entrada.receberTexto("Deletar este cliente removerá todos os dependentes. Continuar? (s/n)");
            
            if (confirmar.toLowerCase() !== 's') {
                console.log("Operação cancelada.\n");
                return;
            }
            
            clienteDeletado.dependentes.forEach(dep => {
                const depIndex = clientes.findIndex(c => c === dep);
                if (depIndex !== -1) {
                    armazem.removerCliente(depIndex);
                }
            });
        }
        
        if (clienteDeletado.titular) {
            const titular = clienteDeletado.titular;
            const depIndex = titular.dependentes.findIndex(d => d === clienteDeletado);
            if (depIndex !== -1) {
                titular.dependentes.splice(depIndex, 1);
            }
        }
        
        armazem.removerCliente(opcao);
        console.log(`Cliente deletado com sucesso!`);
    }
}