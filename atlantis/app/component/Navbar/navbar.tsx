"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsuario, logout, temAcesso, Perfil } from "../../lib/auth";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  secao: string;
  children?: { label: string; href: string; secao: string }[];
};

const navItems: NavItem[] = [
  { label: "Principal", href: "/pages/principal", icon: "🏠", secao: "principal" },
  { label: "Hospedagem", href: "/pages/hospedagem/registro", icon: "🛏️", secao: "hospedagem", children: [
    { label: "Registros",  href: "/pages/hospedagem/registro", secao: "hospedagem_registro" },
    { label: "Cadastrar",  href: "/pages/hospedagem/cadastro", secao: "hospedagem" },
  ]},
  { label: "Acomodação", href: "/pages/acomodacao/detalhes", icon: "🏨", secao: "acomodacao", children: [
    { label: "Detalhes",  href: "/pages/acomodacao/detalhes", secao: "acomodacao" },
    { label: "Cadastrar", href: "/pages/acomodacao/cadastro", secao: "acomodacao" },
  ]},
  { label: "Clientes", href: "/pages/cliente/perfil", icon: "👥", secao: "cliente", children: [
    { label: "Perfis",    href: "/pages/cliente/perfil",   secao: "cliente" },
    { label: "Cadastrar", href: "/pages/cliente/cadastro", secao: "cliente" },
  ]},
  { label: "Financeiro", href: "/pages/financeiro/controle", icon: "💰", secao: "financeiro", children: [
    { label: "Controle",  href: "/pages/financeiro/controle",  secao: "financeiro" },
    { label: "Relatório", href: "/pages/financeiro/relatorio", secao: "financeiro" },
  ]},
  { label: "RH",    href: "/pages/rh/cadastrarFuncionario", icon: "👔", secao: "rh" },
  { label: "Sobre", href: "/pages/sobre",                   icon: "ℹ️", secao: "sobre" },
];

const perfilBadge: Record<string, { label: string; color: string }> = {
  admin:      { label: "Admin",      color: "#8b5cf6" },
  gerente:    { label: "Gerente",    color: "#0ea5e9" },
  financeiro: { label: "Financeiro", color: "#10b981" },
  cliente:    { label: "Cliente",    color: "#f0b429" },
};

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [usuario, setUsuario] = useState<{ nome: string; perfil: string } | null>(null);

  useEffect(() => {
    const u = getUsuario();
    if (!u) { router.replace("/pages/login"); return; }
    setUsuario(u);
  }, []);

  function handleLogout() {
    logout();
    router.push("/pages/login");
  }

  const perfil = (usuario?.perfil ?? "cliente") as Perfil;
  const badge  = perfilBadge[perfil] ?? perfilBadge.cliente;

  const itemsVisiveis = navItems.filter(item => {
    // item principal visível se tem acesso à secao ou qualquer filho
    if (temAcesso(perfil, item.secao)) return true;
    return item.children?.some(c => temAcesso(perfil, c.secao));
  });

  return (
    <aside style={{
      width: 240,
      minHeight: "100vh",
      background: "var(--surface)",
      borderRight: "1px solid rgba(14,165,233,0.12)",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      left: 0, top: 0, bottom: 0,
      zIndex: 50,
      boxShadow: "4px 0 24px rgba(0,0,0,0.3)"
    }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(14,165,233,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, var(--ocean-bright), var(--ocean-accent))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 4px 12px rgba(14,165,233,0.4)"
          }}>🌊</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--ocean-glow)", letterSpacing: "-0.02em" }}>ATLANTIS</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Hotel & Resort</div>
          </div>
        </div>
      </div>

      <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
        {itemsVisiveis.map((item) => {
          const isActive = pathname.startsWith(item.href.split("/").slice(0,3).join("/"));
          const filhosVisiveis = item.children?.filter(c => temAcesso(perfil, c.secao)) ?? [];
          return (
            <div key={item.href} style={{ marginBottom: 4 }}>
              {filhosVisiveis.length > 0 ? (
                <div>
                  <div className="sidebar-link" style={{
                    color: isActive ? "var(--ocean-glow)" : undefined,
                    background: isActive ? "rgba(14,165,233,0.1)" : undefined,
                    borderLeft: isActive ? "3px solid var(--ocean-accent)" : "3px solid transparent",
                    fontWeight: 600, fontSize: 13,
                  }}>
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                  <div style={{ paddingLeft: 20, marginTop: 2 }}>
                    {filhosVisiveis.map(child => (
                      <Link key={child.href} href={child.href} className="sidebar-link" style={{
                        fontSize: 13,
                        color: pathname === child.href ? "var(--ocean-glow)" : undefined,
                        background: pathname === child.href ? "rgba(14,165,233,0.1)" : undefined,
                        borderLeft: pathname === child.href ? "3px solid var(--ocean-accent)" : "3px solid transparent",
                        paddingLeft: 12,
                      }}>
                        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>▸</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={item.href} className="sidebar-link" style={{
                  color: isActive ? "var(--ocean-glow)" : undefined,
                  background: isActive ? "rgba(14,165,233,0.1)" : undefined,
                  borderLeft: isActive ? "3px solid var(--ocean-accent)" : "3px solid transparent",
                  fontWeight: 500, fontSize: 13,
                }}>
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid rgba(14,165,233,0.12)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--ocean-blue), var(--ocean-accent))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "white", flexShrink: 0
          }}>{usuario?.nome?.[0] ?? "?"}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{usuario?.nome ?? "..."}</div>
            <span style={{
              fontSize: 10, fontWeight: 700, color: badge.color,
              textTransform: "uppercase", letterSpacing: "0.05em"
            }}>{badge.label}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{ width: "100%", padding: "8px 12px", fontSize: 12 }}
        >
          Sair do Sistema →
        </button>
      </div>
    </aside>
  );
}
