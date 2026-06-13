import Cliente from "../modelos/cliente";
import Acomodacao from "../modelos/acomodacao";
import Hospedagem from "../modelos/hospedagem";

export default class Armazem {
    private static instancia: Armazem;
    private clientes: Cliente[] = [];
    private acomodacoes: Acomodacao[] = [];
    private hospedagens: Hospedagem[] = [];

    private constructor() {}

    public static getInstancia(): Armazem {
        if (!Armazem.instancia) {
            Armazem.instancia = new Armazem();
        }
        return Armazem.instancia;
    }

    // ---- Clientes ----
    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    public removerCliente(index: number): void {
        this.clientes.splice(index, 1);
    }

    public atualizarCliente(index: number, cliente: Cliente): void {
        this.clientes[index] = cliente;
    }

    // ---- Acomodações ----
    public getAcomodacoes(): Acomodacao[] {
        return this.acomodacoes;
    }

    public adicionarAcomodacao(acomodacao: Acomodacao): void {
        this.acomodacoes.push(acomodacao);
    }

    public removerAcomodacao(index: number): void {
        this.acomodacoes.splice(index, 1);
    }

    // ---- Hospedagens ----
    public getHospedagens(): Hospedagem[] {
        return this.hospedagens;
    }

    public adicionarHospedagem(hospedagem: Hospedagem): void {
        this.hospedagens.push(hospedagem);
    }

    public removerHospedagem(index: number): void {
        this.hospedagens.splice(index, 1);
    }
}
