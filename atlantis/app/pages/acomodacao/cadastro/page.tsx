"use client";
import { useState } from "react";
import PageLayout from "../../../component/PageLayout";
import { criarAcomodacao } from "../../../lib/api";

export default function AcomodacaoCadastroPage() {
  const [form, setForm] = useState({
    numero: "", tipo: "Standard", capacidade: "", precoDiaria: "", andar: "", descricao: "", status: "Disponível"
  });
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    try {
      await criarAcomodacao(form);
      setSucesso(true);
      setForm({ numero: "", tipo: "Standard", capacidade: "", precoDiaria: "", andar: "", descricao: "", status: "Disponível" });
      setTimeout(() => setSucesso(false), 3000);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout title="Cadastrar Acomodação" subtitle="Adicione um novo quarto ou suíte ao sistema">
      <div className="card" style={{ maxWidth: 680, padding: 32 }}>
        {sucesso && <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#34d399", fontSize: 14 }}>✓ Acomodação cadastrada com sucesso!</div>}
        {erro && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#f87171", fontSize: 14 }}>{erro}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label className="label-ocean">Número do Quarto *</label><input className="input-ocean" name="numero" value={form.numero} onChange={handleChange} placeholder="Ex: 101" required /></div>
            <div><label className="label-ocean">Andar *</label><input className="input-ocean" name="andar" type="number" value={form.andar} onChange={handleChange} placeholder="Ex: 1" required /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label className="label-ocean">Tipo *</label><select className="input-ocean" name="tipo" value={form.tipo} onChange={handleChange}><option>Standard</option><option>Luxo</option><option>Suite</option><option>Presidencial</option></select></div>
            <div><label className="label-ocean">Capacidade (pessoas) *</label><input className="input-ocean" name="capacidade" type="number" value={form.capacidade} onChange={handleChange} placeholder="Ex: 2" required /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label className="label-ocean">Preço por Diária (R$) *</label><input className="input-ocean" name="precoDiaria" type="number" value={form.precoDiaria} onChange={handleChange} placeholder="Ex: 350" required /></div>
            <div><label className="label-ocean">Status Inicial</label><select className="input-ocean" name="status" value={form.status} onChange={handleChange}><option>Disponível</option><option>Manutenção</option></select></div>
          </div>
          <div><label className="label-ocean">Descrição</label><textarea className="input-ocean" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descreva as comodidades..." style={{ minHeight: 80, resize: "vertical" }} /></div>
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: "13px 20px" }} disabled={loading}>{loading ? "Cadastrando..." : "Cadastrar Acomodação"}</button>
            <button type="button" className="btn-secondary" onClick={() => setForm({ numero: "", tipo: "Standard", capacidade: "", precoDiaria: "", andar: "", descricao: "", status: "Disponível" })}>Limpar</button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
