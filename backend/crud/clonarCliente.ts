import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Armazem from "../armazem/armazem";
import Cliente from "../modelos/cliente";

export default class ClonarCliente implements Menu {
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

        console.log("------ CLONAR CLIENTE (PROTOTYPE) ------");
        console.log("Selecione o cliente para clonar:");
        
        clientes.forEach((cliente, index) => {
            const tipo = cliente.titular ? "🔹 Dependente" : "👤 Titular";
            console.log(`${index + 1} - ${tipo}: ${cliente.nome}`);
        });

        const opcao = this.entrada.receberNumero("Opção") - 1;
        
        if (opcao < 0 || opcao >= clientes.length) {
            console.log("Opção inválida!");
            return;
        }

        const clienteOriginal = clientes[opcao];
        
        const clienteClone = clienteOriginal.clonar() as Cliente;
        
        const novoNome = this.entrada.receberTexto(`Novo nome para o clone (original: ${clienteOriginal.nome})`) || `${clienteOriginal.nome} (cópia)`;
        clienteClone.nome = novoNome;
        clienteClone.dataCadastro = new Date();
        
        clienteClone.dependentes = [];
        
        if (clienteClone.titular) {
            clienteClone.titular = undefined as any;
        }
        
        armazem.adicionarCliente(clienteClone);
        
        console.log(` Cliente clonado com sucesso! Novo cliente: ${clienteClone.nome}`);
    }
}