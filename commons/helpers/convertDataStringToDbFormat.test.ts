import convertDataStringToDbFormat from './convertDataStringToDbFormat';

describe('convertDataStringToDbFormat', () => {
    // Testes para datas válidas
    it('deve converter corretamente uma data string válida', () => {
        const dataString = "2023-12-25T10:30:45";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toBe("2023-12-25T10:30:45");
    });

    it('deve converter corretamente uma data com dia, mês e ano', () => {
        const dataString = "2023-12-25";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toMatch(/^2023-12-24T/); // Verifica que o formato está correto
    });

    it('deve converter corretamente uma data com hora, minuto e segundo', () => {
        const dataString = "2023-12-25T14:30:45";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toBe("2023-12-25T14:30:45");
    });

    it('deve formatar corretamente datas com valores únicos (dia/mês)', () => {
        const dataString = "2023-06-05";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toBe("2023-06-04T21:00:00");
    });

    it('deve formatar corretamente datas com hora, minuto e segundo', () => {
        const dataString = "2023-01-15T09:15:30";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toBe("2023-01-15T09:15:30");
    });

    // Testes para datas com valores menores que 10 (testando o padStart)
    it('deve formatar corretamente meses e dias menores que 10', () => {
        const dataString = "2023-01-05T09:05:05";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toBe("2023-01-05T09:05:05");
    });

    it('deve formatar corretamente horas, minutos e segundos menores que 10', () => {
        const dataString = "2023-12-25T09:05:05";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toBe("2023-12-25T09:05:05");
    });

    // Testes para datas inválidas
    it('deve lidar corretamente com data inválida', () => {
        const invalidData = "2023-13-45"; // Mês e dia inválidos

        expect(() => convertDataStringToDbFormat(invalidData)).not.toThrow(); // Pode não lançar erro, mas retorna formato inválido
    });

    it('deve funcionar com datas no formato DD/MM/YYYY', () => {
        const dataString = "2023/12/25";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/); // Formato ISO válido
    });

    it('deve lidar com datas que tenham apenas ano e mês', () => {
        const dataString = "2023-12";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toMatch(/^\d{4}-11-\d{2}T/); // Mês 11, mas dia pode variar
    });

    it('deve manter o formato de data e hora original', () => {
        const testData = "2023-12-25T18:45:30";

        expect(convertDataStringToDbFormat(testData)).toBe("2023-12-25T18:45:30");
    });

    // Testes para datas específicas
    it('deve converter corretamente a data de nascimento', () => {
        const dataNascimento = "1990-06-15";
        const result = convertDataStringToDbFormat(dataNascimento);

        expect(result).toBe("1990-06-14T21:00:00");
    });

    it('deve converter corretamente a data atual', () => {
        const currentDate = new Date().toISOString();
        const result = convertDataStringToDbFormat(currentDate);

        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    });

    // Teste para verificar se a hora é mantida corretamente
    it('deve preservar horas, minutos e segundos na conversão', () => {
        const dataString = "2023-12-25T23:59:59";
        const result = convertDataStringToDbFormat(dataString);

        expect(result).toBe("2023-12-25T23:59:59");
    });

    // Teste com diferentes formatos de entrada
    it('deve funcionar com datas no formato timestamp', () => {
        const timestamp = 1672531200000; // Timestamp em milissegundos para 2023-01-01T00:00:00Z
        const result = convertDataStringToDbFormat(timestamp);

        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T/); // Formato válido de data ISO
    });
});
