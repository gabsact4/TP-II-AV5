"use client";
import PageLayout from "../../component/PageLayout";

export default function SobrePage() {
  const equipe = [
    { nome: "Marcos Alves", cargo: "Gerente Geral", avatar: "M" },
    { nome: "Juliana Ramos", cargo: "Recepcionista Chefe", avatar: "J" },
    { nome: "Cláudia Ferreira", cargo: "Chef Executiva", avatar: "C" },
  ];

  const features = [
    { icon: "", label: "Gestão de Hospedagens", desc: "Controle completo de check-in e check-out" },
    { icon: "", label: "Acomodações", desc: "Cadastro e monitoramento de quartos e suítes" },
    { icon: "", label: "Clientes", desc: "Perfis detalhados e histórico de estadias" },
    { icon: "", label: "Financeiro", desc: "Controle de receitas, despesas e relatórios" },
    { icon: "", label: "Recursos Humanos", desc: "Gestão da equipe e folha de pagamento" },
    { icon: "", label: "Relatórios", desc: "Dados analíticos para tomada de decisão" },
  ];

  return (
    <PageLayout title="Sobre o Sistema" subtitle="Conheça o Atlantis Hotel Management System">
      <div style={{ maxWidth: 820 }}>
        {/* Hero */}
        <div className="card" style={{ padding: 32, marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: -40, right: -40, width: 200, height: 200,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)"
          }}/>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: "linear-gradient(135deg, var(--ocean-blue), var(--ocean-accent))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 40, flexShrink: 0, boxShadow: "0 12px 40px rgba(14,165,233,0.4)"
            }}>🌊</div>
            <div>
              <h2 className="gold-text" style={{ fontSize: 32, fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>ATLANTIS</h2>
              <div style={{ fontSize: 16, color: "var(--text-secondary)", marginTop: 4 }}>Hotel Management System · v1.0</div>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.6 }}>
                Sistema completo de gestão hoteleira desenvolvido para o Atlantis Hotel & Resort.
                Gerencie hospedagens, clientes, acomodações, financeiro e RH em um único lugar.
              </p>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ocean-glow)", marginBottom: 20 }}>Funcionalidades do Sistema</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, padding: "14px 16px", borderRadius: 8,
                background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.1)"
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ocean-glow)", marginBottom: 20 }}>Equipe Principal</h3>
          <div style={{ display: "flex", gap: 14 }}>
            {equipe.map((m, i) => (
              <div key={i} style={{
                flex: 1, padding: "20px 16px", borderRadius: 10, textAlign: "center",
                background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.1)"
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%", margin: "0 auto 12px",
                  background: "linear-gradient(135deg, var(--ocean-blue), var(--ocean-accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 700, color: "white"
                }}>{m.avatar}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{m.nome}</div>
                <div style={{ fontSize: 12, color: "var(--ocean-accent)", marginTop: 4 }}>{m.cargo}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ocean-glow)", marginBottom: 16 }}>Informações Técnicas</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              ["Framework", "Next.js 16"],
              ["Linguagem", "TypeScript"],
              ["Estilização", "Tailwind CSS 4"],
              ["UI", "Custom Ocean Design System"],
              ["Versão", "1.0.0"],
              ["Licença", "Proprietária — Atlantis Hotel"],
            ].map(([k, v]) => (
              <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderRadius: 6, background: "rgba(14,165,233,0.04)" }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{k}</span>
                <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
