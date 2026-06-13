import Cliente from "../modelos/cliente"
import Telefone from "../modelos/telefone"
import Endereco from "../modelos/endereco"
import Documento from "../modelos/documento"
import { TipoDocumento } from "../enumeracoes/tipoDocumento"

export class builderCli {
    private cliente: Cliente;

    constructor() {
        this.cliente = new Cliente();
        this.cliente.dataCadastro = new Date();
        this.cliente.endereco = new Endereco(); 
    }

    DadosPessoais(nome: string, nomeSocial: string, dataNascimento: Date): this {
        this.cliente.nome = nome;
        this.cliente.nomeSocial = nomeSocial;
        this.cliente.dataNascimento = dataNascimento;
        return this;
    }

    telefone(ddd: number, numero: number): this {
        const telefone = new Telefone();
        telefone.ddd = ddd;
        telefone.numero = numero;
        this.cliente.telefones.push(telefone);
        return this
    }

    documento(numero: string, tipo: TipoDocumento, dataExpedicao: Date): this {
        const documento = new Documento()
        documento.numero = numero;
        documento.tipo = tipo;
        documento.dataExpedicao = dataExpedicao;
        this.cliente.documentos.push(documento);
        return this
    }

    endereco(rua: string, bairro: string, cidade: string, estado: string, pais: string, codigoPostal: string): this {
        this.cliente.endereco.rua = rua;
        this.cliente.endereco.bairro = bairro;
        this.cliente.endereco.cidade = cidade;
        this.cliente.endereco.estado = estado;
        this.cliente.endereco.pais = pais;
        this.cliente.endereco.codigoPostal = codigoPostal;
        return this
    }

    dependente(dependente: Cliente): this {
        dependente.titular = this.cliente
        this.cliente.dependentes.push(dependente);
        return this
    }


    private revisor(): void {
        if (!this.cliente.nome) {
            throw new Error("Nome é necessário");
        }
        if (!this.cliente.endereco.rua) {
            throw new Error("Endereço é necessário");
        }
        if (this.cliente.telefones.length === 0) {
            throw new Error("Telefone é necessário");
        }
        if (this.cliente.documentos.length === 0) {
        throw new Error("Documento é necessário");
        }
    }

    construir(): Cliente {
        this.revisor(); 
        return this.cliente
    }
}
