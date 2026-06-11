import { fakeDelay } from './fakeDelay';

describe('fakeDelay', () => {
    // Teste básico para verificar que a função retorna uma Promise
    it('deve retornar uma Promise', () => {
        const result = fakeDelay(100);
        expect(result).toBeInstanceOf(Promise);
    });

    // Teste para delay de 0 milissegundos
    it('deve resolver imediatamente com delay de 0', async () => {
        const start = Date.now();
        await fakeDelay(0);
        const end = Date.now();
        expect(end - start).toBeLessThan(10); // Deve ser quase instantâneo
    });

    // Teste para um delay pequeno
    it('deve esperar o tempo especificado (10ms)', async () => {
        const start = Date.now();
        await fakeDelay(10);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(10);
        expect(end - start).toBeLessThan(20); // Pode levar um pouco mais de tempo
    });

    // Teste para delay médio
    it('deve esperar o tempo especificado (50ms)', async () => {
        const start = Date.now();
        await fakeDelay(50);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(50);
        expect(end - start).toBeLessThan(70); // Pode levar um pouco mais de tempo
    });

    // Teste para delay maior
    it('deve esperar o tempo especificado (100ms)', async () => {
        const start = Date.now();
        await fakeDelay(100);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(100);
        expect(end - start).toBeLessThan(120); // Pode levar um pouco mais de tempo
    });

    // Teste para delay maior ainda (500ms)
    it('deve esperar o tempo especificado (500ms)', async () => {
        const start = Date.now();
        await fakeDelay(500);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(500);
        expect(end - start).toBeLessThan(550); // Pode levar um pouco mais de tempo
    });

    // Teste para verificar que a Promise resolve corretamente (não lança erro)
    it('deve resolver sem erros', async () => {
        await expect(fakeDelay(10)).resolves.toBeUndefined();
    });

    // Teste com valores negativos (deveria funcionar como delay de 0)
    it('deve tratar valores negativos como delay de 0', async () => {
        const start = Date.now();
        await fakeDelay(-10);
        const end = Date.now();
        expect(end - start).toBeLessThan(10); // Deve ser quase instantâneo
    });

    // Teste para garantir que múltiplas chamadas funcionam corretamente
    it('deve permitir múltiplas chamadas consecutivas', async () => {
        const start = Date.now();

        await fakeDelay(10);
        await fakeDelay(20);
        await fakeDelay(30);

        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(60); // Total mínimo de 60ms
        expect(end - start).toBeLessThan(80); // Pode levar um pouco mais de tempo
    });

    // Teste para verificar que a função é assíncrona e não bloqueia o evento loop
    it('deve ser não-blocking (assíncrono)', async () => {
        const start = Date.now();

        // Chamada assíncrona imediata
        fakeDelay(100);

        // Verificação rápida do tempo após a chamada
        expect(Date.now() - start).toBeLessThan(5); // Deve ser quase instantâneo

        await new Promise(resolve => setTimeout(resolve, 150)); // Espera para garantir que o delay terminou
    });
});
