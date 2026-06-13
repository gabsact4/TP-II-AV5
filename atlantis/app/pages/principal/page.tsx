"use client";
import { useEffect, useState } from "react";
import PageLayout from "../../component/PageLayout";
import { listarAcomodacoes, listarHospedagens, listarClientes } from "../../lib/api";
import Link from "next/link";
import { getUsuario, temAcesso, Perfil } from "../../lib/auth";

export default function PrincipalPage() {
  const [acomodacoes, setAcomodacoes] = useState<any[]>([]);
  const [hospedagens, setHospedagens] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [perfil, setPerfil] = useState<Perfil>("cliente");

  useEffect(() => {
    const u = getUsuario();
    if (u) setPerfil(u.perfil as Perfil);
    Promise.all([listarAcomodacoes(), listarHospedagens(), listarClientes()])
      .then(([a, h, c]) => { setAcomodacoes(a); setHospedagens(h); setClientes(c); })
      .catch(() => setErro("Backend não encontrado. Inicie o servidor na porta 3001."))
      .finally(() => setLoading(false));
  }, []);

  const quartosOcupados = acomodacoes.filter(a => a.status === "Ocupado").length;
  const hospedagensAtivas = hospedagens.filter(h => h.status === "Ativa").length;
  const taxaOcupacao = acomodacoes.length > 0 ? Math.round((quartosOcupados / acomodacoes.length) * 100) : 0;

  const stats = [
    { label: "Quartos Ocupados", value: loading ? "..." : `${quartosOcupados}/${acomodacoes.length}`, sub: `${taxaOcupacao}% de ocupação`, icon: "🏨", color: "#0ea5e9" },
    { label: "Hóspedes Ativos", value: loading ? "..." : hospedagensAtivas, sub: "hospedagens em andamento", icon: "🛏️", color: "#10b981" },
    { label: "Clientes Cadastrados", value: loading ? "..." : clientes.length, sub: "no sistema", icon: "👥", color: "#f0b429" },
    { label: "Acomodações", value: loading ? "..." : acomodacoes.length, sub: "cadastradas", icon: "🏠", color: "#8b5cf6" },
  ];

  const acoesRapidas = [
    { label: "Nova Hospedagem", href: "/pages/hospedagem/cadastro", icon: "🛏️", secao: "hospedagem" },
    { label: "Cadastrar Cliente", href: "/pages/cliente/cadastro", icon: "👤", secao: "cliente" },
    { label: "Novo Quarto", href: "/pages/acomodacao/cadastro", icon: "🏨", secao: "acomodacao" },
    { label: "Controle Financeiro", href: "/pages/financeiro/controle", icon: "💰", secao: "financeiro" },
  ].filter(a => temAcesso(perfil, a.secao));

  return (
    <PageLayout title="Painel Principal" subtitle="Visão geral do Atlantis Hotel & Resort">
      {erro && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#f87171", fontSize: 14 }}>
          ⚠️ {erro}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.sub}</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 10, fontSize: 22, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>Hospedagens Recentes</h2>
            <Link href="/pages/hospedagem/registro" style={{ fontSize: 12, color: "var(--ocean-accent)", textDecoration: "none" }}>Ver todas →</Link>
          </div>
          {loading ? (
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Carregando...</div>
          ) : hospedagens.length === 0 ? (
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Nenhuma hospedagem registrada ainda.</div>
          ) : (
            <table className="table-ocean">
              <thead><tr><th>Hóspede</th><th>Quarto</th><th>Check-out</th><th>Status</th></tr></thead>
              <tbody>
                {hospedagens.slice(0, 5).map((h, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{h.clienteNome ?? h.hospede?.nome ?? "—"}</td>
                    <td><span className="badge badge-info">{h.acomodacaoNumero ?? h.acomodacao?.numero ?? "—"}</span></td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{h.checkOut ? new Date(h.checkOut).toLocaleDateString("pt-BR") : "—"}</td>
                    <td><span className={`badge ${h.status === "Ativa" ? "badge-success" : h.status === "Reservada" ? "badge-warning" : "badge-info"}`}>{h.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {acoesRapidas.length > 0 && (
            <div className="card" style={{ padding: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Ações Rápidas</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {acoesRapidas.map(a => (
                  <Link key={a.href} href={a.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, textDecoration: "none", background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.1)", color: "var(--text-primary)", fontSize: 14, fontWeight: 500 }}>
                    <span>{a.icon}</span> {a.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Status dos Quartos</h2>
            {loading ? (
              <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Carregando...</div>
            ) : (
              [
                { label: "Disponíveis", count: acomodacoes.filter(a=>a.status==="Disponível").length, color: "#10b981" },
                { label: "Ocupados",    count: acomodacoes.filter(a=>a.status==="Ocupado").length,    color: "#0ea5e9" },
                { label: "Manutenção", count: acomodacoes.filter(a=>a.status==="Manutenção").length,  color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }}/><span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 80, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.05)" }}>
                      <div style={{ width: acomodacoes.length > 0 ? `${(s.count/acomodacoes.length)*100}%` : "0%", height: "100%", borderRadius: 2, background: s.color }}/>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.color, width: 16, textAlign: "right" }}>{s.count}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
