export type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  estado: string;
};

export type Acomodacao = {
  id: number;
  numero: string;
  tipo: "Standard" | "Luxo" | "Suite" | "Presidencial";
  capacidade: number;
  precoDiaria: number;
  status: "Disponível" | "Ocupado" | "Manutenção";
  descricao: string;
  andar: number;
};

export type Hospedagem = {
  id: number;
  clienteId: number;
  clienteNome: string;
  acomodacaoId: number;
  acomodacaoNumero: string;
  checkIn: string;
  checkOut: string;
  status: "Ativa" | "Encerrada" | "Reservada";
  valorTotal: number;
  observacoes: string;
};

export type Funcionario = {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
  departamento: string;
  salario: number;
  dataAdmissao: string;
  email: string;
  telefone: string;
  status: "Ativo" | "Inativo";
};

export type Financeiro = {
  id: number;
  descricao: string;
  tipo: "Receita" | "Despesa";
  categoria: string;
  valor: number;
  data: string;
  status: "Pago" | "Pendente" | "Cancelado";
  referencia: string;
};
