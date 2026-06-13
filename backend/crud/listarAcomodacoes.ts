import Menu from "../teste/menu";
import Armazem from "../armazem/armazem";

export default class ListarAcomodacoes implements Menu {
    executar(): void {
        console.log("------ ACOMODAÇÕES CADASTRADAS -------");

        const acomodacoes = Armazem.getInstancia().getAcomodacoes();

        if (acomodacoes.length === 0) {
            console.log("Nenhuma acomodação cadastrada.");
            return;
        }

        acomodacoes.forEach((acomodacao, index) => {
            console.log(`\n[${index + 1}] Tipo: ${acomodacao.tipo}`);
            console.log(`    Capacidade: ${acomodacao.capacidade} pessoa(s)`);
            console.log(`    Preço: R$ ${acomodacao.preco.toFixed(2)}/diária`);
        });
    }
}
