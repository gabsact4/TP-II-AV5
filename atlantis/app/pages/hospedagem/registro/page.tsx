"use client";
import { useState, useEffect } from "react";
import PageLayout from "../../../component/PageLayout";
import { listarHospedagens, encerrarHospedagem } from "../../../lib/api";

export default function HospedagemRegistroPage() {
  const [hospedagens, setHospedagens] = useState<any[]>([]);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const h = await listarHospedagens();
      setHospedagens(h);
    } catch {
      setErro("Não foi possível conectar ao backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function handleEncerrar(id: number) {
    try {
      await encerrarHospedagem(id);
      carregar();
    } catch (e: any) {
      setErro(e.message);
    }
  }

  const filtrados = hospedagens.filter(h => {
    const matchStatus = filtroStatus === "Todos" || h.status === filtroStatus;
    const matchBusca = (h.clienteNome ?? "").toLowerCase().includes(busca.toLowerCase()) ||
                       (h.acomodacaoNumero ?? "").includes(busca);
    return matchStatus && matchBusca;
  });

  const statusClass: Record<string, string> = { "Ativa": "badge-success", "Encerrada": "badge-info", "Reservada": "badge-warning" };

  return (
    <PageLayout title="Registros de Hospedagem" subtitle="Acompanhe todas as estadias do hotel">
      {erro && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#f87171", fontSize: 14 }}>{erro}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Ativas",     count: hospedagens.filter(h=>h.status==="Ativa").length,     color: "#10b981" },
          { label: "Reservadas", count: hospedagens.filter(h=>h.status==="Reservada").length, color: "#f59e0b" },
          { label: "Encerradas", count: hospedagens.filter(h=>h.status==="Encerrada").length, color: "#7eb8d4" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, marginTop: 6 }}>{s.count}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input className="input-ocean" style={{ maxWidth: 300 }} placeholder="Buscar por hóspede ou quarto..." value={busca} onChange={e => setBusca(e.target.value)} />
        {["Todos","Ativa","Reservada","Encerrada"].map(s => (
          <button key={s} onClick={() => setFiltroStatus(s)} className={filtroStatus === s ? "btn-primary" : "btn-secondary"} style={{ padding: "10px 16px", fontSize: 13 }}>{s}</button>
        ))}
      </div>

      {loading && <div style={{ color: "var(--text-muted)", padding: 20 }}>Carregando...</div>}
      {!loading && filtrados.length === 0 && !erro && (
        <div style={{ color: "var(--text-muted)", fontSize: 14, padding: "20px 0" }}>Nenhuma hospedagem encontrada.</div>
      )}

      {filtrados.length > 0 && (
        <div className="card" style={{ overflow: "hidden" }}>
          <table className="table-ocean">
            <thead><tr>
              <th>#</th><th>Hóspede</th><th>Quarto</th><th>Check-in</th><th>Check-out</th><th>Valor</th><th>Status</th><th>Ação</th>
            </tr></thead>
            <tbody>
              {filtrados.map(h => (
                <tr key={h.id}>
                  <td style={{ color: "var(--text-muted)", fontSize: 12 }}>#{h.id}</td>
                  <td style={{ fontWeight: 600 }}>{h.clienteNome}</td>
                  <td><span className="badge badge-info">{h.acomodacaoNumero}</span></td>
                  <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{h.checkIn ? new Date(h.checkIn).toLocaleDateString("pt-BR") : "—"}</td>
                  <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{h.checkOut ? new Date(h.checkOut).toLocaleDateString("pt-BR") : "—"}</td>
                  <td style={{ fontWeight: 600, color: "#10b981" }}>{h.valorTotal ? `R$ ${Number(h.valorTotal).toLocaleString("pt-BR")}` : "—"}</td>
                  <td><span className={`badge ${statusClass[h.status] ?? "badge-info"}`}>{h.status}</span></td>
                  <td>
                    {h.status === "Ativa" && (
                      <button className="btn-secondary" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => handleEncerrar(h.id)}>
                        Encerrar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageLayout>
  );
}
