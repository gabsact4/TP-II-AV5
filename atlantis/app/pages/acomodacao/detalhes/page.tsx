"use client";
import { useState, useEffect } from "react";
import PageLayout from "../../../component/PageLayout";
import { listarAcomodacoes } from "../../../lib/api";

export default function AcomodacaoDetalhesPage() {
  const [acomodacoes, setAcomodacoes] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [selecionado, setSelecionado] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarAcomodacoes()
      .then(setAcomodacoes)
      .catch(() => setErro("Não foi possível conectar ao backend."))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = acomodacoes.filter(a => {
    const matchBusca = a.numero?.includes(busca) || a.tipo?.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === "Todos" || a.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const statusClass: Record<string, string> = {
    "Disponível": "badge-success", "Ocupado": "badge-info", "Manutenção": "badge-warning",
  };
  const tipoColor: Record<string, string> = {
    "Standard": "#7eb8d4", "Luxo": "#0ea5e9", "Suite": "#f0b429", "Presidencial": "#8b5cf6"
  };

  return (
    <PageLayout title="Acomodações" subtitle="Visualize e gerencie os quartos e suítes">
      {erro && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#f87171", fontSize: 14 }}>{erro}</div>}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input className="input-ocean" style={{ maxWidth: 280 }} placeholder="Buscar por número ou tipo..." value={busca} onChange={e => setBusca(e.target.value)} />
        {["Todos","Disponível","Ocupado","Manutenção"].map(s => (
          <button key={s} onClick={() => setFiltroStatus(s)} className={filtroStatus === s ? "btn-primary" : "btn-secondary"} style={{ padding: "10px 16px", fontSize: 13 }}>{s}</button>
        ))}
      </div>

      {loading && <div style={{ color: "var(--text-muted)", padding: 20 }}>Carregando...</div>}

      {!loading && filtrados.length === 0 && !erro && (
        <div style={{ color: "var(--text-muted)", fontSize: 14, padding: "20px 0" }}>Nenhuma acomodação cadastrada ainda.</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtrados.map((a, idx) => (
          <div key={idx} className="card" style={{ padding: 20, cursor: "pointer" }} onClick={() => setSelecionado(a)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "var(--ocean-glow)" }}>Nº {a.numero ?? "—"}</div>
                <div style={{ fontSize: 13, color: tipoColor[a.tipo] ?? "#7eb8d4", fontWeight: 600, marginTop: 2 }}>{a.tipo}</div>
              </div>
              <span className={`badge ${statusClass[a.status] ?? "badge-info"}`}>{a.status ?? "—"}</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>{a.descricao ?? ""}</p>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(14,165,233,0.08)", paddingTop: 12 }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Andar {a.andar ?? "—"} · {a.capacidade ?? "?"} pessoas</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#10b981" }}>R$ {(a.precoDiaria ?? 0).toLocaleString("pt-BR")}/dia</div>
            </div>
          </div>
        ))}
      </div>

      {selecionado && (
        <div onClick={() => setSelecionado(null)} style={{
          position: "fixed", inset: 0, zIndex: 200, background: "rgba(5,12,24,0.85)",
          backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div onClick={e => e.stopPropagation()} className="card" style={{ width: 480, padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, color: "var(--ocean-glow)", fontSize: 20, fontWeight: 800 }}>Quarto {selecionado.numero}</h2>
              <button onClick={() => setSelecionado(null)} style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 8, color: "var(--text-secondary)", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>×</button>
            </div>
            {[["Tipo", selecionado.tipo],["Status", selecionado.status],["Andar", selecionado.andar],["Capacidade", `${selecionado.capacidade} pessoas`],["Diária", `R$ ${(selecionado.precoDiaria??0).toLocaleString("pt-BR")}`],["Descrição", selecionado.descricao]].map(([k,v]) => (
              <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(14,165,233,0.08)" }}>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{k}</span>
                <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>{String(v ?? "—")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
