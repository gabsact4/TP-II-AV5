"use client";
import { useState, useEffect } from "react";
import PageLayout from "../../../component/PageLayout";
import { listarClientes, listarHospedagens } from "../../../lib/api";

export default function ClientePerfilPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [hospedagens, setHospedagens] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const [c, h] = await Promise.all([listarClientes(), listarHospedagens()]);
        setClientes(c);
        setHospedagens(h);
      } catch (e: any) {
        setErro("Não foi possível conectar ao backend. Verifique se está rodando na porta 3001.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const filtrados = clientes.filter(c =>
    c.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  function hospedagensDoCliente(idx: number) {
    return hospedagens.filter((h: any) => h.hospede?.nome === clientes[idx]?.nome);
  }

  return (
    <PageLayout title="Perfil de Clientes" subtitle="Consulte e gerencie o cadastro dos hóspedes">
      {loading && <div style={{ color: "var(--text-muted)", padding: 20 }}>Carregando...</div>}
      {erro && (
        <div style={{
          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#f87171", fontSize: 14
        }}>{erro}</div>
      )}
      {!loading && (
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <input
              className="input-ocean"
              placeholder="Buscar cliente por nome..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            {filtrados.length === 0 && !erro && (
              <div style={{ color: "var(--text-muted)", fontSize: 14, padding: "20px 0" }}>
                Nenhum cliente cadastrado ainda.
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtrados.map((c, idx) => (
                <div
                  key={idx} className="card"
                  style={{ padding: "16px 20px", cursor: "pointer", border: selecionado === idx ? "1px solid var(--ocean-accent)" : undefined }}
                  onClick={() => setSelecionado(idx)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--ocean-blue), var(--ocean-accent))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, fontWeight: 700, color: "white", flexShrink: 0
                    }}>{c.nome?.[0] ?? "?"}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15 }}>{c.nome}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                        {c.nomeSocial ? `Nome social: ${c.nomeSocial}` : "Sem nome social"}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{hospedagensDoCliente(idx).length} hospedagem(ns)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selecionado !== null && clientes[selecionado] && (
            <div style={{ width: 340 }}>
              <div className="card" style={{ padding: 24, position: "sticky", top: 24 }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%", margin: "0 auto 12px",
                    background: "linear-gradient(135deg, var(--ocean-blue), var(--ocean-accent))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, fontWeight: 700, color: "white",
                    boxShadow: "0 8px 24px rgba(14,165,233,0.35)"
                  }}>{clientes[selecionado].nome?.[0]}</div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: "var(--text-primary)" }}>{clientes[selecionado].nome}</div>
                  {clientes[selecionado].nomeSocial && (
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Nome social: {clientes[selecionado].nomeSocial}</div>
                  )}
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Cliente #{selecionado + 1}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    ["Data de Nascimento", clientes[selecionado].dataNascimento ? new Date(clientes[selecionado].dataNascimento).toLocaleDateString("pt-BR") : "—"],
                    ["Cadastro", clientes[selecionado].dataCadastro ? new Date(clientes[selecionado].dataCadastro).toLocaleDateString("pt-BR") : "—"],
                  ].map(([k, v]) => (
                    <div key={String(k)} style={{ display: "flex", flexDirection: "column", padding: "8px 0", borderBottom: "1px solid rgba(14,165,233,0.08)" }}>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</span>
                      <span style={{ fontSize: 14, color: "var(--text-primary)", marginTop: 2 }}>{String(v)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Histórico de Hospedagens</div>
                  {hospedagensDoCliente(selecionado).length === 0
                    ? <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Sem hospedagens registradas</p>
                    : hospedagensDoCliente(selecionado).map((h: any, i: number) => (
                      <div key={i} style={{ padding: "8px 12px", borderRadius: 6, background: "rgba(14,165,233,0.06)", marginBottom: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>Quarto {h.acomodacaoNumero ?? h.acomodacao?.numero}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                          {h.checkIn ? new Date(h.checkIn).toLocaleDateString("pt-BR") : "?"} →{" "}
                          {h.checkOut ? new Date(h.checkOut).toLocaleDateString("pt-BR") : "?"}
                        </div>
                        <span style={{ fontSize: 11, color: h.status === "Ativa" ? "#10b981" : "var(--text-muted)" }}>{h.status}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
}
