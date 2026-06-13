import Menu from "../teste/menu";
import Armazem from "../armazem/armazem";

export default class ListarHospedagens implements Menu {
    executar(): void {
        console.log("------ HOSPEDAGENS ATIVAS -------");

        const hospedagens = Armazem.getInstancia().getHospedagens();

        if (hospedagens.length === 0) {
            console.log("Nenhuma hospedagem registrada.");
            return;
        }

        hospedagens.forEach((hospedagem, index) => {
            console.log(`\n[${index + 1}] Hóspede: ${hospedagem.hospede.nome} (${hospedagem.hospede.nomeSocial})`);
            console.log(`    Acomodação: ${hospedagem.acomodacao.tipo}`);
            console.log(`    Capacidade: ${hospedagem.acomodacao.capacidade} pessoa(s)`);
            console.log(`    Preço: R$ ${hospedagem.acomodacao.preco.toFixed(2)}/diária`);
            console.log(`    Entrada: ${hospedagem.dataEntrada.toLocaleDateString("pt-BR")}`);
            console.log(`    Saída: ${hospedagem.dataSaida.toLocaleDateString("pt-BR")}`);
        });
    }
}
