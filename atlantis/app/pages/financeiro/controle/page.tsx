"use client";
import { useState } from "react";
import PageLayout from "../../../component/PageLayout";
import { mockFinanceiro } from "../../../data/mock";

export default function FinanceiroControlePage() {
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ descricao: "", tipo: "Receita", categoria: "", valor: "", data: "", status: "Pendente" });

  const totalReceitas = mockFinanceiro.filter(f => f.tipo === "Receita").reduce((a, b) => a + b.valor, 0);
  const totalDespesas = mockFinanceiro.filter(f => f.tipo === "Despesa").reduce((a, b) => a + b.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const filtrados = mockFinanceiro.filter(f => {
    const matchTipo = filtroTipo === "Todos" || f.tipo === filtroTipo;
    const matchBusca = f.descricao.toLowerCase().includes(busca.toLowerCase()) || f.categoria.toLowerCase().includes(busca.toLowerCase());
    return matchTipo && matchBusca;
  });

  const statusClass: Record<string, string> = { "Pago": "badge-success", "Pendente": "badge-warning", "Cancelado": "badge-danger" };

  return (
    <PageLayout title="Controle Financeiro" subtitle="Gerencie receitas e despesas do hotel">
      {/* Cards de resumo */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="stat-card">
          <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Total Receitas</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#10b981" }}>R$ {totalReceitas.toLocaleString("pt-BR")}</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Total Despesas</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#ef4444" }}>R$ {totalDespesas.toLocaleString("pt-BR")}</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Saldo Líquido</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: saldo >= 0 ? "#10b981" : "#ef4444" }}>R$ {saldo.toLocaleString("pt-BR")}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
        <input className="input-ocean" style={{ maxWidth: 280 }} placeholder="Buscar lançamento..." value={busca} onChange={e => setBusca(e.target.value)} />
        {["Todos","Receita","Despesa"].map(t => (
          <button key={t} onClick={() => setFiltroTipo(t)} className={filtroTipo === t ? "btn-primary" : "btn-secondary"} style={{ padding: "10px 16px", fontSize: 13 }}>{t}</button>
        ))}
        <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ marginLeft: "auto", padding: "10px 18px" }}>+ Novo Lançamento</button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--ocean-glow)" }}>Novo Lançamento</h3>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 12 }}>
            <div><label className="label-ocean">Descrição</label><input className="input-ocean" value={form.descricao} onChange={e => setForm(p=>({...p, descricao: e.target.value}))} placeholder="Descrição" /></div>
            <div><label className="label-ocean">Tipo</label><select className="input-ocean" value={form.tipo} onChange={e => setForm(p=>({...p, tipo: e.target.value}))}><option>Receita</option><option>Despesa</option></select></div>
            <div><label className="label-ocean">Categoria</label><input className="input-ocean" value={form.categoria} onChange={e => setForm(p=>({...p, categoria: e.target.value}))} placeholder="Ex: Hospedagem" /></div>
            <div><label className="label-ocean">Valor (R$)</label><input className="input-ocean" type="number" value={form.valor} onChange={e => setForm(p=>({...p, valor: e.target.value}))} placeholder="0,00" /></div>
            <div><label className="label-ocean">Data</label><input className="input-ocean" type="date" value={form.data} onChange={e => setForm(p=>({...p, data: e.target.value}))} /></div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="btn-primary" style={{ padding: "10px 20px" }}>Salvar</button>
            <button className="btn-secondary" onClick={() => setShowForm(false)} style={{ padding: "10px 16px" }}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="card" style={{ overflow: "hidden" }}>
        <table className="table-ocean">
          <thead><tr><th>Referência</th><th>Descrição</th><th>Tipo</th><th>Categoria</th><th>Data</th><th>Valor</th><th>Status</th></tr></thead>
          <tbody>
            {filtrados.map(f => (
              <tr key={f.id}>
                <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{f.referencia}</td>
                <td style={{ fontWeight: 500, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.descricao}</td>
                <td><span className={`badge ${f.tipo === "Receita" ? "badge-success" : "badge-danger"}`}>{f.tipo}</span></td>
                <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{f.categoria}</td>
                <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{new Date(f.data).toLocaleDateString("pt-BR")}</td>
                <td style={{ fontWeight: 700, color: f.tipo === "Receita" ? "#10b981" : "#ef4444" }}>
                  {f.tipo === "Despesa" ? "- " : ""}R$ {f.valor.toLocaleString("pt-BR")}
                </td>
                <td><span className={`badge ${statusClass[f.status]}`}>{f.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
