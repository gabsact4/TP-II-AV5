import express from "express";
import cors from "cors";

import authRouter from "./routes/auth";
import clientesRouter from "./routes/clientes";
import acomodacoesRouter from "./routes/acomodacoes";
import hospedagensRouter from "./routes/hospedagens";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/clientes", clientesRouter);
app.use("/acomodacoes", acomodacoesRouter);
app.use("/hospedagens", hospedagensRouter);

app.listen(3001, () => {
    console.log("Servidor iniciado na porta 3001");
});
