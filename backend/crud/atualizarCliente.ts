import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Cliente from "../modelos/cliente";
import Armazem from "../armazem/armazem";
import { builderCli } from "../builder/builder";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";

export default class AtualizarCliente implements Menu {
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

        console.log("------ ATUALIZAR CLIENTE ------");
        console.log("Selecione o cliente para atualizar:");
        
        const titulares = clientes.filter(c => !c.titular);
        
        if (titulares.length === 0) {
            console.log("Nenhum cliente titular cadastrado.\n");
            return;
        }

        titulares.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome} (${cliente.nomeSocial})`);
        });

        const opcao = this.entrada.receberNumero("Opção") - 1;
        
        if (opcao < 0 || opcao >= titulares.length) {
            console.log("Opção inválida!");
            return;
        }

        const clienteExistente = titulares[opcao];
        const indexOriginal = clientes.findIndex(c => c === clienteExistente);

        console.log("\n--- Deixe em branco para manter o valor atual ---\n");

        const nome = this.entrada.receberTexto(`Nome (atual: ${clienteExistente.nome})`) || clienteExistente.nome;
        const nomeSocial = this.entrada.receberTexto(`Nome social (atual: ${clienteExistente.nomeSocial})`) || clienteExistente.nomeSocial;
        
        let dataNascimento = clienteExistente.dataNascimento;
        const mudarData = this.entrada.receberTexto("Deseja alterar a data de nascimento? (s/n)");
        if (mudarData.toLowerCase() === 's') {
            dataNascimento = this.entrada.receberData("Nova data de nascimento");
        }

        const builder = new builderCli()
            .DadosPessoais(nome, nomeSocial, dataNascimento)
            .telefone(
                clienteExistente.telefones[0]?.ddd || this.entrada.receberNumero("DDD do telefone"),
                clienteExistente.telefones[0]?.numero || this.entrada.receberNumero("Número do telefone")
            );

        const mudarEndereco = this.entrada.receberTexto("Deseja alterar o endereço? (s/n)");
        if (mudarEndereco.toLowerCase() === 's') {
            builder.endereco(
                this.entrada.receberTexto("Rua") || clienteExistente.endereco.rua,
                this.entrada.receberTexto("Bairro") || clienteExistente.endereco.bairro,
                this.entrada.receberTexto("Cidade") || clienteExistente.endereco.cidade,
                this.entrada.receberTexto("Estado") || clienteExistente.endereco.estado,
                this.entrada.receberTexto("País") || clienteExistente.endereco.pais,
                this.entrada.receberTexto("Código postal") || clienteExistente.endereco.codigoPostal
            );
        } else {
            builder.endereco(
                clienteExistente.endereco.rua,
                clienteExistente.endereco.bairro,
                clienteExistente.endereco.cidade,
                clienteExistente.endereco.estado,
                clienteExistente.endereco.pais,
                clienteExistente.endereco.codigoPostal
            );
        }

        const clienteAtualizado = builder.construir();
        
        clienteAtualizado.dependentes = clienteExistente.dependentes;
        
        clienteAtualizado.dependentes.forEach(dep => {
            dep.titular = clienteAtualizado;
        });

        armazem.atualizarCliente(indexOriginal, clienteAtualizado);
        console.log(" Cliente atualizado com sucesso!");
    }
}