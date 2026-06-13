export type Perfil = "admin" | "gerente" | "financeiro" | "cliente";

export interface Usuario {
  nome: string;
  email: string;
  perfil: Perfil;
}

export function getUsuario(): Usuario | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("atlantis_usuario");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setUsuario(u: Usuario) {
  localStorage.setItem("atlantis_usuario", JSON.stringify(u));
}

export function logout() {
  localStorage.removeItem("atlantis_usuario");
}

// Permissões por perfil
const permissoes: Record<Perfil, string[]> = {
  cliente:    ["principal", "cliente", "hospedagem_registro", "sobre"],
  gerente:    ["principal", "cliente", "hospedagem", "acomodacao", "rh", "sobre"],
  financeiro: ["principal", "cliente", "hospedagem", "acomodacao", "financeiro", "rh", "sobre"],
  admin:      ["principal", "cliente", "hospedagem", "acomodacao", "financeiro", "rh", "sobre"],
};

export function temAcesso(perfil: Perfil, secao: string): boolean {
  return permissoes[perfil]?.includes(secao) ?? false;
}
