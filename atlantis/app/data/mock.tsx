import { Cliente, Acomodacao, Hospedagem, Funcionario, Financeiro } from "../type/tipo";

export const mockClientes: Cliente[] = [
  { id: 1, nome: "Ana Carolina Silva", cpf: "123.456.789-00", email: "ana@email.com", telefone: "(11) 99999-1234", dataNascimento: "1990-05-15", endereco: "Rua das Flores, 123", cidade: "São Paulo", estado: "SP" },
  { id: 2, nome: "Roberto Mendes", cpf: "987.654.321-00", email: "roberto@email.com", telefone: "(21) 98888-5678", dataNascimento: "1985-08-22", endereco: "Av. Atlântica, 456", cidade: "Rio de Janeiro", estado: "RJ" },
  { id: 3, nome: "Fernanda Costa", cpf: "456.789.123-00", email: "fernanda@email.com", telefone: "(31) 97777-9012", dataNascimento: "1995-12-03", endereco: "Rua da Paz, 789", cidade: "Belo Horizonte", estado: "MG" },
  { id: 4, nome: "Carlos Eduardo Lima", cpf: "321.654.987-00", email: "carlos@email.com", telefone: "(41) 96666-3456", dataNascimento: "1978-03-18", endereco: "Rua XV de Novembro, 200", cidade: "Curitiba", estado: "PR" },
];

export const mockAcomodacoes: Acomodacao[] = [
  { id: 1, numero: "101", tipo: "Standard", capacidade: 2, precoDiaria: 280, status: "Disponível", descricao: "Quarto standard com vista para o jardim", andar: 1 },
  { id: 2, numero: "201", tipo: "Luxo", capacidade: 2, precoDiaria: 480, status: "Ocupado", descricao: "Quarto luxo com varanda e vista para o mar", andar: 2 },
  { id: 3, numero: "301", tipo: "Suite", capacidade: 4, precoDiaria: 850, status: "Disponível", descricao: "Suite espaçosa com sala de estar", andar: 3 },
  { id: 4, numero: "401", tipo: "Presidencial", capacidade: 6, precoDiaria: 2200, status: "Disponível", descricao: "Suite presidencial com terraço privativo", andar: 4 },
  { id: 5, numero: "102", tipo: "Standard", capacidade: 2, precoDiaria: 280, status: "Manutenção", descricao: "Quarto standard - em manutenção", andar: 1 },
  { id: 6, numero: "202", tipo: "Luxo", capacidade: 3, precoDiaria: 520, status: "Disponível", descricao: "Quarto luxo superior com banheira", andar: 2 },
];

export const mockHospedagens: Hospedagem[] = [
  { id: 1, clienteId: 1, clienteNome: "Ana Carolina Silva", acomodacaoId: 2, acomodacaoNumero: "201", checkIn: "2026-05-20", checkOut: "2026-05-25", status: "Ativa", valorTotal: 2400, observacoes: "Lua de mel" },
  { id: 2, clienteId: 2, clienteNome: "Roberto Mendes", acomodacaoId: 3, acomodacaoNumero: "301", checkIn: "2026-05-18", checkOut: "2026-05-22", status: "Encerrada", valorTotal: 3400, observacoes: "" },
  { id: 3, clienteId: 3, clienteNome: "Fernanda Costa", acomodacaoId: 1, acomodacaoNumero: "101", checkIn: "2026-05-26", checkOut: "2026-05-28", status: "Reservada", valorTotal: 560, observacoes: "Viagem de negócios" },
];

export const mockFuncionarios: Funcionario[] = [
  { id: 1, nome: "Marcos Alves", cpf: "111.222.333-44", cargo: "Gerente Geral", departamento: "Administração", salario: 8500, dataAdmissao: "2020-01-15", email: "marcos@atlantis.com", telefone: "(12) 99999-0001", status: "Ativo" },
  { id: 2, nome: "Juliana Ramos", cpf: "222.333.444-55", cargo: "Recepcionista", departamento: "Recepção", salario: 2800, dataAdmissao: "2022-03-10", email: "juliana@atlantis.com", telefone: "(12) 99999-0002", status: "Ativo" },
  { id: 3, nome: "Pedro Souza", cpf: "333.444.555-66", cargo: "Camareiro", departamento: "Hospedagem", salario: 2200, dataAdmissao: "2021-07-20", email: "pedro@atlantis.com", telefone: "(12) 99999-0003", status: "Ativo" },
  { id: 4, nome: "Cláudia Ferreira", cpf: "444.555.666-77", cargo: "Chef de Cozinha", departamento: "Gastronomia", salario: 5500, dataAdmissao: "2019-11-05", email: "claudia@atlantis.com", telefone: "(12) 99999-0004", status: "Ativo" },
];

export const mockFinanceiro: Financeiro[] = [
  { id: 1, descricao: "Diária Suite 301 - Roberto Mendes", tipo: "Receita", categoria: "Hospedagem", valor: 3400, data: "2026-05-22", status: "Pago", referencia: "HSP-002" },
  { id: 2, descricao: "Diária Luxo 201 - Ana Carolina", tipo: "Receita", categoria: "Hospedagem", valor: 2400, data: "2026-05-25", status: "Pendente", referencia: "HSP-001" },
  { id: 3, descricao: "Folha de Pagamento - Maio", tipo: "Despesa", categoria: "RH", valor: 19000, data: "2026-05-30", status: "Pendente", referencia: "FP-052026" },
  { id: 4, descricao: "Manutenção Quarto 102", tipo: "Despesa", categoria: "Manutenção", valor: 1200, data: "2026-05-21", status: "Pago", referencia: "MNT-015" },
  { id: 5, descricao: "Restaurante - Eventos", tipo: "Receita", categoria: "Gastronomia", valor: 4500, data: "2026-05-20", status: "Pago", referencia: "REST-088" },
  { id: 6, descricao: "Conta de Energia", tipo: "Despesa", categoria: "Utilities", valor: 3800, data: "2026-05-15", status: "Pago", referencia: "UTL-022" },
];
