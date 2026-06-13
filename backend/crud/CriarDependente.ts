import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Cliente from "../modelos/cliente";
import Armazem from "../armazem/armazem";
import { builderCli } from "../builder/builder";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";

export default class CriarDependente implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        console.log("------ CADASTRAR DEPENDENTE -------");

        const clientes = Armazem.getInstancia().getClientes();
        const titulares = clientes.filter(c => !c.titular);

        if (titulares.length === 0) {
            console.log(" Nenhum cliente titular cadastrado. Cadastre um titular primeiro");
            return;
        }

        console.log("Selecione o titular:");
        titulares.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome} (${cliente.nomeSocial})`);
        });

        const titularIndex = this.entrada.receberNumero("Opção") - 1;
        
        if (titularIndex < 0 || titularIndex >= titulares.length) {
            console.log("Opção inválida!");
            return;
        }
        
        const titular = titulares[titularIndex];

        console.log("\n--- DADOS DO DEPENDENTE ---");
        const nome = this.entrada.receberTexto("Nome do dependente");
        const nomeSocial = this.entrada.receberTexto("Nome social");
        const dataNascimento = this.entrada.receberData("Data de nascimento");

        const dependente = new builderCli()
            .DadosPessoais(nome, nomeSocial, dataNascimento)
            .telefone(
                this.entrada.receberNumero("DDD do telefone"),
                this.entrada.receberNumero("Número do telefone")
            )
            .documento(
                this.entrada.receberTexto("Número do documento (CPF)"),
                TipoDocumento.CPF,
                this.entrada.receberData("Data de expedição")
            )
            .endereco(
                titular.endereco.rua,
                titular.endereco.bairro,
                titular.endereco.cidade,
                titular.endereco.estado,
                titular.endereco.pais,
                titular.endereco.codigoPostal
            )
            .construir();

        dependente.titular = titular;
        titular.dependentes.push(dependente);
        Armazem.getInstancia().adicionarCliente(dependente);

        console.log("Dependente cadastrado com sucesso!");
    }
}