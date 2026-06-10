export default function calcAgeByString(dataNascimento: string): number {
    // Valida o formato da data
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = dataNascimento.match(regex);

    if (!match) {
        throw new Error("Formato de data inválido. Use dd/mm/yyyy");
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1; // Mês começa em 0 no JavaScript
    const ano = parseInt(match[3], 10);

    // Cria a data de nascimento
    const dataNasc = new Date(ano, mes, dia);

    // Verifica se a data é válida
    if (dataNasc.getFullYear() !== ano ||
        dataNasc.getMonth() !== mes ||
        dataNasc.getDate() !== dia) {
        throw new Error("Data de nascimento inválida");
    }

    // Calcula a idade
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();

    // Ajusta se o aniversário ainda não ocorreu este ano
    if (hoje.getMonth() < dataNasc.getMonth() ||
        (hoje.getMonth() === dataNasc.getMonth() && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }

    return idade;
}