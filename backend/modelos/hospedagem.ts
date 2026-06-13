import Cliente from "./cliente";
import Acomodacao from "./acomodacao";

export default class Hospedagem {
    public hospede: Cliente;
    public acomodacao: Acomodacao;
    public dataEntrada: Date;
    public dataSaida: Date;
    // campos extras para o frontend
    public clienteNome: string;
    public acomodacaoNumero: string;
    public checkIn: string;
    public checkOut: string;
    public status: string = "Ativa";
    public valorTotal: number;
    public observacoes: string;

    constructor(hospede?: Cliente, acomodacao?: Acomodacao, dataEntrada?: Date, dataSaida?: Date) {
        this.hospede = hospede;
        this.acomodacao = acomodacao;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
}
