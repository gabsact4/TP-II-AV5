import { Router } from "express";
import prisma from "../prisma/client";

const router = Router();

// GET /hospedagens
router.get("/", async (req, res) => {
    try {
        const hospedagens = await prisma.hospedagem.findMany({
            include: {
                cliente: true,
                acomodacao: true,
            },
            orderBy: { id: "desc" },
        });

        // Formatar para o frontend espera
        const formatadas = hospedagens.map(h => ({
            ...h,
            clienteNome: h.cliente.nome,
            acomodacaoNumero: h.acomodacao.numero,
            checkIn: h.checkIn.toISOString().split("T")[0],
            checkOut: h.checkOut.toISOString().split("T")[0],
        }));

        res.json(formatadas);
    } catch (e: any) {
        res.status(500).json({ erro: e.message });
    }
});

// POST /hospedagens
router.post("/", async (req, res) => {
    try {
        const { clienteId, acomodacaoId, checkIn, checkOut, observacoes, valorTotal } = req.body;

        const hospedagem = await prisma.hospedagem.create({
            data: {
                clienteId: Number(clienteId),
                acomodacaoId: Number(acomodacaoId),
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                observacoes: observacoes || null,
                valorTotal: Number(valorTotal) || 0,
                status: "Ativa",
            },
            include: { cliente: true, acomodacao: true },
        });

        // Marcar acomodação como Ocupada
        await prisma.acomodacao.update({
            where: { id: Number(acomodacaoId) },
            data: { status: "Ocupado" },
        });

        res.status(201).json({
            ...hospedagem,
            clienteNome: hospedagem.cliente.nome,
            acomodacaoNumero: hospedagem.acomodacao.numero,
            checkIn: hospedagem.checkIn.toISOString().split("T")[0],
            checkOut: hospedagem.checkOut.toISOString().split("T")[0],
        });
    } catch (e: any) {
        res.status(500).json({ erro: e.message });
    }
});

// PUT /hospedagens/:id/encerrar
router.put("/:id/encerrar", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const hospedagem = await prisma.hospedagem.update({
            where: { id },
            data: { status: "Encerrada" },
            include: { acomodacao: true },
        });

        // Liberar acomodação
        await prisma.acomodacao.update({
            where: { id: hospedagem.acomodacaoId },
            data: { status: "Disponível" },
        });

        res.json(hospedagem);
    } catch (e: any) {
        res.status(404).json({ erro: "Hospedagem não encontrada" });
    }
});

export default router;
