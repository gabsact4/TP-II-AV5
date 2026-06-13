import { Router } from "express";
import prisma from "../prisma/client";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const acomodacoes = await prisma.acomodacao.findMany({
            orderBy: { numero: "asc" },
        });
        res.json(acomodacoes);
    } catch (e: any) {
        res.status(500).json({ erro: e.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { numero, tipo, capacidade, precoDiaria, andar, descricao, status } = req.body;
        const acomodacao = await prisma.acomodacao.create({
            data: {
                numero,
                tipo,
                capacidade: Number(capacidade),
                precoDiaria: Number(precoDiaria),
                andar: Number(andar),
                descricao: descricao || null,
                status: status || "Disponível",
            },
        });
        res.status(201).json(acomodacao);
    } catch (e: any) {
        res.status(500).json({ erro: e.message });
    }
});

router.put("/:id/status", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        const acomodacao = await prisma.acomodacao.update({
            where: { id },
            data: { status },
        });
        res.json(acomodacao);
    } catch (e: any) {
        res.status(404).json({ erro: "Acomodação não encontrada" });
    }
});

export default router;
