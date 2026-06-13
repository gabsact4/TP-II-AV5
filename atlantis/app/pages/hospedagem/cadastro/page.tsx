"use client";
import { useState, useEffect } from "react";
import PageLayout from "../../../component/PageLayout";
import { listarClientes, listarAcomodacoes, criarHospedagem } from "../../../lib/api";

export default function HospedagemCadastroPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [acomodacoes, setAcomodacoes] = useState<any[]>([]);
  const [form, setForm] = useState({ clienteId: "", acomodacaoId: "", checkIn: "", checkOut: "", observacoes: "" });
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([listarClientes(), listarAcomodacoes()])
      .then(([c, a]) => { setClientes(c); setAcomodacoes(a); })
      .catch(() => setErro("Não foi possível conectar ao backend."));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function calcTotal() {
    if (!form.acomodacaoId || !form.checkIn || !form.checkOut) return 0;
    const a = acomodacoes.find(a => a.id === Number(form.acomodacaoId));
    if (!a) return 0;
    const dias = Math.max(0, (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000);
    return a.precoDiaria * dias;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    try {
      await criarHospedagem({ ...form, valorTotal: calcTotal() });
      setSucesso(true);
      setForm({ clienteId: "", acomodacaoId: "", checkIn: "", checkOut: "", observacoes: "" });
      // Recarregar acomodações para atualizar status
      const a = await listarAcomodacoes();
      setAcomodacoes(a);
      setTimeout(() => setSucesso(false), 3000);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  const disponiveis = acomodacoes.filter(a => a.status === "Disponível");
  const total = calcTotal();
  const clienteSelecionado = clientes.find(c => c.id === Number(form.clienteId));
  const acomodacaoSelecionada = acomodacoes.find(a => a.id === Number(form.acomodacaoId));

  return (
    <PageLayout title="Nova Hospedagem" subtitle="Realize o check-in de um novo hóspede">
      {erro && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#f87171", fontSize: 14 }}>{erro}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <div className="card" style={{ padding: 32 }}>
          {sucesso && <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 24, color: "#34d399", fontSize: 14 }}>✓ Hospedagem registrada com sucesso!</div>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label className="label-ocean">Cliente *</label>
              <select className="input-ocean" name="clienteId" value={form.clienteId} onChange={handleChange} required>
                <option value="">Selecione o cliente...</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="label-ocean">Acomodação *</label>
              <select className="input-ocean" name="acomodacaoId" value={form.acomodacaoId} onChange={handleChange} required>
                <option value="">Selecione o quarto...</option>
                {disponiveis.map(a => <option key={a.id} value={a.id}>Nº {a.numero} — {a.tipo} — R$ {a.precoDiaria}/dia</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label className="label-ocean">Check-in *</label><input className="input-ocean" name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required /></div>
              <div><label className="label-ocean">Check-out *</label><input className="input-ocean" name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required /></div>
            </div>
            <div>
              <label className="label-ocean">Observações</label>
              <textarea className="input-ocean" name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Preferências especiais..." style={{ minHeight: 80, resize: "vertical" }} />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: "13px 20px", fontSize: 15 }} disabled={loading}>{loading ? "Registrando..." : "Confirmar Check-in"}</button>
          </form>
        </div>

        <div className="card" style={{ padding: 24, alignSelf: "start" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ocean-glow)", marginBottom: 20 }}>Resumo da Reserva</h3>
          {clienteSelecionado && (
            <div style={{ marginBottom: 16, padding: "12px", borderRadius: 8, background: "rgba(14,165,233,0.06)" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>Hóspede</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{clienteSelecionado.nome}</div>
            </div>
          )}
          {acomodacaoSelecionada && (
            <div style={{ marginBottom: 16, padding: "12px", borderRadius: 8, background: "rgba(14,165,233,0.06)" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>Quarto</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>Nº {acomodacaoSelecionada.numero} — {acomodacaoSelecionada.tipo}</div>
            </div>
          )}
          {form.checkIn && form.checkOut && (
            <div style={{ marginBottom: 16, padding: "12px", borderRadius: 8, background: "rgba(14,165,233,0.06)" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>Período</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>
                {new Date(form.checkIn).toLocaleDateString("pt-BR")} → {new Date(form.checkOut).toLocaleDateString("pt-BR")}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                {Math.max(0, (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000)} diária(s)
              </div>
            </div>
          )}
          <div style={{ padding: "16px", borderRadius: 8, background: total > 0 ? "rgba(16,185,129,0.08)" : "rgba(14,165,233,0.04)", border: total > 0 ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(14,165,233,0.1)", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase" }}>Total Estimado</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: total > 0 ? "#10b981" : "var(--text-muted)", marginTop: 4 }}>
              {total > 0 ? `R$ ${total.toLocaleString("pt-BR")}` : "--"}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
