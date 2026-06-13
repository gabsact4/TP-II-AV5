"use client";
import { useState } from "react";
import PageLayout from "../../../component/PageLayout";
import { mockFuncionarios } from "../../../data/mock";

export default function RHCadastrarFuncionarioPage() {
  const [form, setForm] = useState({ nome: "", cpf: "", cargo: "", departamento: "", salario: "", dataAdmissao: "", email: "", telefone: "" });
  const [sucesso, setSucesso] = useState(false);
  const [aba, setAba] = useState<"lista"|"cadastro">("lista");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSucesso(true);
    setTimeout(() => {
      setForm({ nome: "", cpf: "", cargo: "", departamento: "", salario: "", dataAdmissao: "", email: "", telefone: "" });
      setSucesso(false);
      setAba("lista");
    }, 2500);
  }

  const departamentos = ["Administração","Recepção","Hospedagem","Gastronomia","Manutenção","Segurança","Financeiro","RH"];

  return (
    <PageLayout title="Recursos Humanos" subtitle="Gestão de funcionários do Atlantis">
      <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid rgba(14,165,233,0.12)", paddingBottom: 0 }}>
        {[["lista"," Equipe"],["cadastro"," Cadastrar"]].map(([id, label]) => (
          <button key={id} onClick={() => setAba(id as "lista"|"cadastro")} style={{
            background: aba === id ? "rgba(14,165,233,0.12)" : "transparent",
            border: "none",
            borderBottom: aba === id ? "2px solid var(--ocean-accent)" : "2px solid transparent",
            color: aba === id ? "var(--ocean-glow)" : "var(--text-muted)",
            padding: "10px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600,
            borderRadius: "6px 6px 0 0", transition: "all 0.15s"
          }}>{label}</button>
        ))}
      </div>

      {aba === "lista" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
            {[
              { label: "Total Funcionários", value: mockFuncionarios.length, color: "#0ea5e9" },
              { label: "Ativos", value: mockFuncionarios.filter(f=>f.status==="Ativo").length, color: "#10b981" },
              { label: "Folha Mensal", value: `R$ ${mockFuncionarios.reduce((a,b)=>a+b.salario,0).toLocaleString("pt-BR")}`, color: "#f0b429" },
            ].map(s => (
              <div key={s.label} className="stat-card" style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                <div style={{ fontSize: typeof s.value === "string" ? 18 : 26, fontWeight: 800, color: s.color, marginTop: 6 }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {mockFuncionarios.map(f => (
              <div key={f.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--ocean-blue), var(--ocean-accent))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 700, color: "white", flexShrink: 0
                  }}>{f.nome[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{f.nome}</div>
                    <div style={{ fontSize: 13, color: "var(--ocean-accent)", fontWeight: 500 }}>{f.cargo}</div>
                  </div>
                  <span className="badge badge-success" style={{ marginLeft: "auto" }}>{f.status}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    ["Depto.", f.departamento],
                    ["Salário", `R$ ${f.salario.toLocaleString("pt-BR")}`],
                    ["E-mail", f.email],
                    ["Admissão", new Date(f.dataAdmissao).toLocaleDateString("pt-BR")],
                  ].map(([k,v]) => (
                    <div key={String(k)}>
                      <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{String(v)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {aba === "cadastro" && (
        <div className="card" style={{ maxWidth: 680, padding: 32 }}>
          {sucesso && (
            <div style={{
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#34d399", fontSize: 14
            }}>✓ Funcionário cadastrado com sucesso!</div>
          )}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <div><label className="label-ocean">Nome Completo *</label><input className="input-ocean" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do funcionário" required /></div>
              <div><label className="label-ocean">CPF *</label><input className="input-ocean" name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" required /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label className="label-ocean">Cargo *</label><input className="input-ocean" name="cargo" value={form.cargo} onChange={handleChange} placeholder="Ex: Recepcionista" required /></div>
              <div><label className="label-ocean">Departamento *</label>
                <select className="input-ocean" name="departamento" value={form.departamento} onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  {departamentos.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label className="label-ocean">Salário (R$) *</label><input className="input-ocean" name="salario" type="number" value={form.salario} onChange={handleChange} placeholder="Ex: 3500" required /></div>
              <div><label className="label-ocean">Data de Admissão *</label><input className="input-ocean" name="dataAdmissao" type="date" value={form.dataAdmissao} onChange={handleChange} required /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label className="label-ocean">E-mail *</label><input className="input-ocean" name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@atlantis.com" required /></div>
              <div><label className="label-ocean">Telefone</label><input className="input-ocean" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 99999-0000" /></div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: "13px 20px" }}>Cadastrar Funcionário</button>
              <button type="button" className="btn-secondary" onClick={() => setAba("lista")} style={{ padding: "13px 16px" }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </PageLayout>
  );
}
