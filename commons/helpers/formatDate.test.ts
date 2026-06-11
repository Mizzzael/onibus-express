import formatDate from './formatDate'

describe('formatDate', () => {
    it('formata uma data completa no padrão pt-BR', () => {
        expect(formatDate('2025-06-01T08:30:00')).toBe('01/06/2025, 08:30')
    })

    it('formata mês e dia com zero à esquerda', () => {
        expect(formatDate('2025-01-05T09:05:00')).toBe('05/01/2025, 09:05')
    })

    it('formata horário de meia-noite', () => {
        expect(formatDate('2025-06-01T00:00:00')).toBe('01/06/2025, 00:00')
    })

    it('formata horário de fim do dia', () => {
        expect(formatDate('2025-12-31T23:59:00')).toBe('31/12/2025, 23:59')
    })

    it('usa formato de 24h (não usa AM/PM)', () => {
        const result = formatDate('2025-06-01T15:00:00')
        expect(result).not.toMatch(/AM|PM/)
        expect(result).toContain('15:00')
    })
})