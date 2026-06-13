import { Router } from "express";
import prisma from "../prisma/client";

const router = Router();

// GET /clientes — lista todos
router.get("/", async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            orderBy: { dataCadastro: "desc" },
        });
        res.json(clientes);
    } catch (e: any) {
        res.status(500).json({ erro: e.message });
    }
});

// POST /clientes — cria novo
router.post("/", async (req, res) => {
    try {
        const { nome, nomeSocial, dataNascimento } = req.body;
        const cliente = await prisma.cliente.create({
            data: {
                nome,
                nomeSocial: nomeSocial || null,
                dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
            },
        });
        res.status(201).json(cliente);
    } catch (e: any) {
        res.status(500).json({ erro: e.message });
    }
});

// PUT /clientes/:id — atualiza
router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, nomeSocial } = req.body;
        const cliente = await prisma.cliente.update({
            where: { id },
            data: { nome, nomeSocial: nomeSocial || null },
        });
        res.json(cliente);
    } catch (e: any) {
        res.status(404).json({ erro: "Cliente não encontrado" });
    }
});

// DELETE /clientes/:id — remove
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.cliente.delete({ where: { id } });
        res.sendStatus(204);
    } catch (e: any) {
        res.status(404).json({ erro: "Cliente não encontrado" });
    }
});

export default router;
