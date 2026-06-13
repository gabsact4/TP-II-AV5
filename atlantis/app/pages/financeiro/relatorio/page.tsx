"use client";
import PageLayout from "../../../component/PageLayout";
import { mockFinanceiro } from "../../../data/mock";

export default function FinanceiroRelatorioPage() {
  const receitas = mockFinanceiro.filter(f => f.tipo === "Receita");
  const despesas = mockFinanceiro.filter(f => f.tipo === "Despesa");
  const totalR = receitas.reduce((a, b) => a + b.valor, 0);
  const totalD = despesas.reduce((a, b) => a + b.valor, 0);
  const saldo = totalR - totalD;
  const margem = totalR > 0 ? Math.round((saldo / totalR) * 100) : 0;

  const catMap: Record<string, number> = {};
  mockFinanceiro.forEach(f => {
    catMap[f.categoria] = (catMap[f.categoria] || 0) + (f.tipo === "Receita" ? f.valor : -f.valor);
  });

  const receitasPagas = receitas.filter(f => f.status === "Pago").reduce((a, b) => a + b.valor, 0);
  const receitasPendentes = receitas.filter(f => f.status === "Pendente").reduce((a, b) => a + b.valor, 0);

  return (
    <PageLayout title="Relatório Financeiro" subtitle="Análise completa das finanças — Maio 2026">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Receita Total", value: `R$ ${totalR.toLocaleString("pt-BR")}`, color: "#10b981", icon: "" },
          { label: "Despesa Total", value: `R$ ${totalD.toLocaleString("pt-BR")}`, color: "#ef4444", icon: "" },
          { label: "Saldo Líquido", value: `R$ ${saldo.toLocaleString("pt-BR")}`, color: saldo >= 0 ? "#10b981" : "#ef4444", icon: "" },
          { label: "Margem de Lucro", value: `${margem}%`, color: "#f0b429", icon: "" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Receitas vs Despesas</h3>
          {[
            { label: "Receitas", value: totalR, color: "#10b981" },
            { label: "Despesas", value: totalD, color: "#ef4444" },
            { label: "Saldo", value: Math.abs(saldo), color: "#0ea5e9" },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>R$ {item.value.toLocaleString("pt-BR")}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.05)" }}>
                <div style={{
                  height: "100%", borderRadius: 3, background: item.color,
                  width: `${Math.min(100, (item.value / Math.max(totalR, totalD)) * 100)}%`,
                  transition: "width 0.5s ease"
                }}/>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Resultado por Categoria</h3>
          {Object.entries(catMap).map(([cat, val]) => (
            <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(14,165,233,0.06)" }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{cat}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: val >= 0 ? "#10b981" : "#ef4444" }}>
                {val >= 0 ? "+" : ""}R$ {Math.abs(val).toLocaleString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Status de Recebimentos</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: 16, borderRadius: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <div style={{ fontSize: 11, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.06em" }}>Receitas Confirmadas</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#10b981", marginTop: 6 }}>R$ {receitasPagas.toLocaleString("pt-BR")}</div>
          </div>
          <div style={{ padding: 16, borderRadius: 8, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
            <div style={{ fontSize: 11, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.06em" }}>Receitas Pendentes</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b", marginTop: 6 }}>R$ {receitasPendentes.toLocaleString("pt-BR")}</div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <table className="table-ocean">
            <thead><tr><th>Descrição</th><th>Categoria</th><th>Data</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              {receitas.map(f => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 500 }}>{f.descricao}</td>
                  <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{f.categoria}</td>
                  <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{new Date(f.data).toLocaleDateString("pt-BR")}</td>
                  <td style={{ fontWeight: 700, color: "#10b981" }}>R$ {f.valor.toLocaleString("pt-BR")}</td>
                  <td><span className={`badge ${f.status === "Pago" ? "badge-success" : "badge-warning"}`}>{f.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
