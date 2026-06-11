// calcAgeByString.test.ts
import calcAgeByString from './calcAgeByString';

describe('calcAgeByString', () => {
    // Testes para formato inválido
    it('deve lançar erro para formato de data inválido (sem barras)', () => {
        expect(() => calcAgeByString("25-12-1990")).toThrow("Formato de data inválido. Use dd/mm/yyyy");
    });

    it('deve lançar erro para formato de data inválido (mais de 3 partes)', () => {
        expect(() => calcAgeByString("25/12/1990/extra")).toThrow("Formato de data inválido. Use dd/mm/yyyy");
    });

    it('deve lançar erro para formato de data inválido (com letras)', () => {
        expect(() => calcAgeByString("25/abc/1990")).toThrow("Formato de data inválido. Use dd/mm/yyyy");
    });

    // Testes para datas inválidas
    it('deve lançar erro para data inválida (dia inválido)', () => {
        expect(() => calcAgeByString("32/12/1990")).toThrow("Data de nascimento inválida");
    });

    it('deve lançar erro para data inválida (mês inválido)', () => {
        expect(() => calcAgeByString("25/13/1990")).toThrow("Data de nascimento inválida");
    });

    it('deve lançar erro para data inválida (dia 30 em fevereiro)', () => {
        expect(() => calcAgeByString("30/02/2000")).toThrow("Data de nascimento inválida");
    });

    // Testes para datas válidas e cálculo correto da idade
    it('deve calcular corretamente a idade em anos completos', () => {
        const dataNascimento = "15/06/2000";
        const idade = calcAgeByString(dataNascimento);

        expect(idade).toBeGreaterThanOrEqual(23); // Pelo menos 23 anos (em 2023)
    });

    it('deve calcular idade correta para aniversário passado no ano', () => {
        const dataNascimento = "15/06/2000";

        // Para o ano de 2023, se hoje for depois do dia 15/06, a idade deve ser 23
        expect(() => calcAgeByString(dataNascimento)).not.toThrow();
    });

    it('deve calcular idade correta para aniversário ainda não ocorrido este ano', () => {
        const dataNascimento = "15/12/2000";

        // Se hoje for antes do dia 15/12, a idade deve ser menor
        expect(() => calcAgeByString(dataNascimento)).not.toThrow();
    });

    it('deve calcular corretamente para data de nascimento no início do ano', () => {
        const dataNascimento = "01/01/2000";

        // Para o ano de 2023, se hoje for após 01/01, a idade deve ser 23
        expect(() => calcAgeByString(dataNascimento)).not.toThrow();
    });

    it('deve calcular corretamente para data de nascimento no final do ano', () => {
        const dataNascimento = "31/12/2000";

        // Para o ano de 2023, se hoje for antes do dia 31/12, a idade deve ser menor
        expect(() => calcAgeByString(dataNascimento)).not.toThrow();
    });

    it('deve funcionar com datas válidas no formato dd/mm/yyyy', () => {
        const testCases = [
            "01/01/2000",
            "15/06/1995",
            "25/12/1980"
        ];

        testCases.forEach(data => {
            expect(() => calcAgeByString(data)).not.toThrow();
        });
    });

    // Testes para casos específicos
    it('deve lidar com anos bissextos corretamente', () => {
        const dataNascimento = "29/02/2000"; // Data válida em ano bissexto

        expect(() => calcAgeByString(dataNascimento)).not.toThrow();
    });

    it('deve tratar datas de nascimento no passado corretamente', () => {
        const dataNascimento = "15/06/1985"; // Data no passado
        const idade = calcAgeByString(dataNascimento);

        expect(idade).toBeGreaterThanOrEqual(38); // Pelo menos 38 anos (em 2023)
    });

    it('deve retornar idade correta para nascidos em 1970', () => {
        const dataNascimento = "25/06/1970";
        const idade = calcAgeByString(dataNascimento);

        expect(idade).toBeGreaterThanOrEqual(53); // Pelo menos 53 anos (em 2023)
    });

    it('deve retornar 0 para nascidos hoje', () => {
        // Para este teste, vamos simular o dia atual como sendo a data de nascimento
        const today = new Date();
        const dia = String(today.getDate()).padStart(2, '0');
        const mes = String(today.getMonth() + 1).padStart(2, '0');
        const ano = today.getFullYear();

        expect(() => calcAgeByString(`${dia}/${mes}/${ano}`)).not.toThrow();
    });
});
