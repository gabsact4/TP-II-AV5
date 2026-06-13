const BASE = "http://localhost:3001";

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ erro: "Erro desconhecido" }));
    throw new Error(err.erro || "Erro na requisição");
  }
  return res.json();
}

// Auth
export async function login(email: string, senha: string) {
  return req<{ nome: string; email: string; perfil: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
}

// Clientes
export async function listarClientes() {
  return req<any[]>("/clientes");
}
export async function criarCliente(dados: any) {
  return req<any>("/clientes", { method: "POST", body: JSON.stringify(dados) });
}
export async function atualizarCliente(id: number, dados: any) {
  return req<any>(`/clientes/${id}`, { method: "PUT", body: JSON.stringify(dados) });
}
export async function deletarCliente(id: number) {
  return fetch(`${BASE}/clientes/${id}`, { method: "DELETE" });
}

// Acomodações
export async function listarAcomodacoes() {
  return req<any[]>("/acomodacoes");
}
export async function criarAcomodacao(dados: any) {
  return req<any>("/acomodacoes", { method: "POST", body: JSON.stringify(dados) });
}

// Hospedagens
export async function listarHospedagens() {
  return req<any[]>("/hospedagens");
}
export async function criarHospedagem(dados: any) {
  return req<any>("/hospedagens", { method: "POST", body: JSON.stringify(dados) });
}
// Agora usa ID real do banco
export async function encerrarHospedagem(id: number) {
  return req<any>(`/hospedagens/${id}/encerrar`, { method: "PUT" });
}
