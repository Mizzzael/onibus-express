import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PriceItem from './PriceItem'

jest.mock('@/commons/helpers/formatPrice', () => ({
    __esModule: true,
    default: (price: number) => `R$ ${price.toFixed(2)}`,
}))

jest.mock('@heroui/react')

describe('PriceItem', () => {
    it('exibe o preço formatado', () => {
        render(<PriceItem price={50} />)
        expect(screen.getByText('R$ 50.00')).toBeInTheDocument()
    })

    it('renderiza o botão "Comprar"', () => {
        render(<PriceItem price={50} />)
        expect(screen.getByRole('button', { name: /comprar/i })).toBeInTheDocument()
    })

    it('chama onPress ao clicar no botão', async () => {
        const handlePress = jest.fn()
        render(<PriceItem price={50} onPress={handlePress} />)

        await userEvent.click(screen.getByRole('button', { name: /comprar/i }))

        expect(handlePress).toHaveBeenCalledTimes(1)
    })

    it('não chama onPress quando isDisabled é true', async () => {
        const handlePress = jest.fn()
        render(<PriceItem price={50} onPress={handlePress} isDisabled />)

        await userEvent.click(screen.getByRole('button', { name: /comprar/i }))

        expect(handlePress).not.toHaveBeenCalled()
    })

    it('não quebra sem onPress', async () => {
        render(<PriceItem price={100} />)
        await userEvent.click(screen.getByRole('button', { name: /comprar/i }))
    })
})