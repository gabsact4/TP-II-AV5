"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/api";
import { setUsuario } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    try {
      const usuario = await login(email, senha);
      setUsuario(usuario);
      router.push("/pages/principal");
    } catch (err: any) {
      setErro(err.message || "Erro ao conectar com o servidor. Verifique se o backend está rodando na porta 3001.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "var(--ocean-deep)",
      overflow: "hidden",
      position: "relative"
    }}>
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "linear-gradient(145deg, var(--ocean-mid) 0%, var(--ocean-deep) 100%)",
        position: "relative", overflow: "hidden",
        borderRight: "1px solid rgba(14,165,233,0.1)"
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: "absolute",
            width: [400, 280, 160][i], height: [400, 280, 160][i],
            borderRadius: "50%",
            border: `1px solid rgba(14,165,233,${[0.06,0.1,0.15][i]})`,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)"
          }}/>
        ))}
        <div className="animate-float" style={{ textAlign: "center", zIndex: 1 }}>
          <div style={{
            width: 100, height: 100, borderRadius: 24,
            background: "linear-gradient(135deg, var(--ocean-blue), var(--ocean-accent))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 52, margin: "0 auto 24px",
            boxShadow: "0 12px 48px rgba(14,165,233,0.4)"
          }}>🌊</div>
          <h2 className="gold-text" style={{ fontSize: 40, fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>ATLANTIS</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginTop: 8, letterSpacing: "0.2em", textTransform: "uppercase" }}>Hotel & Resort</p>
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16, color: "var(--text-muted)", fontSize: 14 }}>
            {["Gestão completa do hotel", "Controle financeiro integrado", "Relatórios em tempo real"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ocean-accent)" }}/>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        width: 440, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 48,
        background: "var(--ocean-deep)"
      }}>
        <div className="animate-fade-in" style={{ width: "100%" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Bem-vindo de volta</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 36 }}>Faça login no sistema Atlantis</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label className="label-ocean">E-mail</label>
              <input
                className="input-ocean"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-ocean">Senha</label>
              <input
                className="input-ocean"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>

            {erro && (
              <div style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f87171"
              }}>{erro}</div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: 4, padding: "14px 20px", fontSize: 15 }}
            >
              {loading ? "Entrando..." : "Entrar no Sistema"}
            </button>
          </form>

          <div style={{
            marginTop: 28, padding: "14px", borderRadius: 8,
            background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.12)",
            fontSize: 12, color: "var(--text-muted)"
          }}>
            <strong style={{ color: "var(--text-secondary)" }}>Perfis de acesso:</strong>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
              <span>👤 cliente@atlantis.com / cliente123</span>
              <span>🏨 gerente@atlantis.com / gerente123</span>
              <span>💰 financeiro@atlantis.com / financeiro123</span>
              <span>⚙️ admin@atlantis.com / admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
