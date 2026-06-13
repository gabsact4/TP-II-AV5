import { Router } from "express";

const router = Router();

// Usuários hardcoded para o sistema
const usuarios = [
    { email: "admin@atlantis.com",      senha: "admin123",      nome: "Administrador", perfil: "admin" },
    { email: "gerente@atlantis.com",    senha: "gerente123",    nome: "Marcos Alves",  perfil: "gerente" },
    { email: "financeiro@atlantis.com", senha: "financeiro123", nome: "Cláudia Ferreira", perfil: "financeiro" },
    { email: "cliente@atlantis.com",    senha: "cliente123",    nome: "Ana Carolina",  perfil: "cliente" },
];

router.post("/login", (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
        return res.status(401).json({ erro: "E-mail ou senha inválidos" });
    }
    res.json({ nome: usuario.nome, email: usuario.email, perfil: usuario.perfil });
});

export default router;
