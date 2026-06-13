import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";
import Prototipo from "../interfaces/prototipo";

export default class Cliente implements Prototipo {
    public nome: string;
    public nomeSocial: string;
    public dataNascimento: Date;
    public dataCadastro: Date;
    public telefones: Telefone[] = [];
    public endereco: Endereco;
    public documentos: Documento[] = [];
    public dependentes: Cliente[] = [];
    public titular: Cliente;

    public clonar(): Prototipo {
        const clone = new Cliente();
        clone.nome = this.nome;
        clone.nomeSocial = this.nomeSocial;
        clone.dataNascimento = new Date(this.dataNascimento);
        clone.dataCadastro = new Date(this.dataCadastro);
        
        this.telefones.forEach(telefone => {
            clone.telefones.push(telefone.clonar() as Telefone);
        });
        
        if (this.endereco) {
            clone.endereco = this.endereco.clonar() as Endereco;
        }
        
        this.documentos.forEach(doc => {
            const novoDoc = new Documento();
            novoDoc.numero = doc.numero;
            novoDoc.tipo = doc.tipo;
            novoDoc.dataExpedicao = new Date(doc.dataExpedicao);
            clone.documentos.push(novoDoc);
        });        
        return clone;
    }
}