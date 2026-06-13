"use client";
import { useState } from "react";
import PageLayout from "../../../component/PageLayout";
import { criarCliente } from "../../../lib/api";

export default function ClienteCadastroPage() {
  const [form, setForm] = useState({
    nome: "", nomeSocial: "", dataNascimento: ""
  });
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    try {
      await criarCliente(form);
      setSucesso(true);
      setForm({ nome: "", nomeSocial: "", dataNascimento: "" });
      setTimeout(() => setSucesso(false), 3000);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout title="Cadastrar Cliente" subtitle="Registre um novo cliente no sistema Atlantis">
      <div className="card" style={{ maxWidth: 720, padding: 32 }}>
        {sucesso && (
          <div style={{
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#34d399", fontSize: 14
          }}>✓ Cliente cadastrado com sucesso!</div>
        )}
        {erro && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#f87171", fontSize: 14
          }}>{erro}</div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="label-ocean">Nome Completo *</label>
              <input className="input-ocean" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do hóspede" required />
            </div>
            <div>
              <label className="label-ocean">Nome Social</label>
              <input className="input-ocean" name="nomeSocial" value={form.nomeSocial} onChange={handleChange} placeholder="Nome social (opcional)" />
            </div>
          </div>
          <div>
            <label className="label-ocean">Data de Nascimento</label>
            <input className="input-ocean" name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: "13px 20px" }} disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Cliente"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setForm({ nome: "", nomeSocial: "", dataNascimento: "" })}>Limpar</button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
