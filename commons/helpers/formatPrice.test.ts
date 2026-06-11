import formatPrice from './formatPrice'

describe('formatPrice', () => {
    it('formata um valor inteiro em BRL', () => {
        expect(formatPrice(50)).toMatch(/50,00/)
    })

    it('formata um valor com centavos', () => {
        expect(formatPrice(99.90)).toMatch(/99,90/)
    })

    it('formata um valor com centavos ímpares', () => {
        expect(formatPrice(10.05)).toMatch(/10,05/)
    })

    it('formata zero', () => {
        expect(formatPrice(0)).toMatch(/0,00/)
    })

    it('formata valores grandes com separador de milhar', () => {
        const result = formatPrice(1000)
        expect(result).toMatch(/1\.000/)
    })

    it('contém o símbolo de real', () => {
        expect(formatPrice(100)).toMatch(/R\$/)
    })

    it('não usa formato de dólar', () => {
        expect(formatPrice(100)).not.toMatch(/\$\d/)
    })
})