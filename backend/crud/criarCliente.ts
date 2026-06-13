import Menu from "../teste/menu";
import Entrada from "../teste/entrada";
import Cliente from "../modelos/cliente";
import Armazem from "../armazem/armazem";
import { builderCli } from "../builder/builder";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";

export default class CriarCliente implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    executar(): void {
        console.log("------ CADASTRO DE CLIENTE -------");

        const nome = this.entrada.receberTexto("Nome");
        const nomeSocial = this.entrada.receberTexto("Nome social");
        const dataNascimento = this.entrada.receberData("Data de nascimento");

        const cliente = new builderCli()
            .DadosPessoais(nome, nomeSocial, dataNascimento)
            .telefone(
                this.entrada.receberNumero("DDD do telefone"),
                this.entrada.receberNumero("Número do telefone")
            )
            .endereco(
                this.entrada.receberTexto("Rua"),
                this.entrada.receberTexto("Bairro"),
                this.entrada.receberTexto("Cidade"),
                this.entrada.receberTexto("Estado"),
                this.entrada.receberTexto("País"),
                this.entrada.receberTexto("Código postal")
            )
            .documento(
                this.entrada.receberTexto("Número do documento"),
                TipoDocumento.CPF,
                this.entrada.receberData("Data de expedição")
            )
            .construir();

        Armazem.getInstancia().adicionarCliente(cliente);
        console.log("Cliente cadastrado com sucesso!");
    }
}

