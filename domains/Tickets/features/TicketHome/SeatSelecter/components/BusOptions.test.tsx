import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BusOptions from './BusOptions'

jest.mock('@/commons/hooks/useDarkMode', () => ({
    __esModule: true,
    default: () => false,
}))

const OCCUPIED_SEATS = ['C-04', 'B-03', 'B-05', 'A-01', 'B-01']

describe('BusOptions', () => {
    describe('renderização', () => {
        it('renderiza as seções A, B, C e D', () => {
            render(<BusOptions />)
            expect(screen.getByText('A')).toBeInTheDocument()
            expect(screen.getByText('B')).toBeInTheDocument()
            expect(screen.getByText('C')).toBeInTheDocument()
            expect(screen.getByText('D')).toBeInTheDocument()
        })

        it('renderiza 24 assentos no total (4 seções x 6)', () => {
            render(<BusOptions />)
            expect(screen.getAllByRole('button')).toHaveLength(24)
        })
    })

    describe('assentos ocupados', () => {
        it.each(OCCUPIED_SEATS)('assento %s está ocupado e não pode ser clicado', async (seatId) => {
            const onChange = jest.fn()
            render(<BusOptions onChange={onChange} />)

            await userEvent.click(screen.getByTestId(seatId))

            expect(onChange).not.toHaveBeenCalled()
        })
    })

    describe('seleção de assento', () => {
        it('chama onChange ao clicar em um assento livre', async () => {
            const onChange = jest.fn()
            render(<BusOptions onChange={onChange} />)

            await userEvent.click(screen.getByTestId('A-02'))

            expect(onChange).toHaveBeenCalledWith('A-02')
        })

        it('chama onChange com o último assento clicado', async () => {
            const onChange = jest.fn()
            render(<BusOptions onChange={onChange} />)

            await userEvent.click(screen.getByTestId('A-02'))
            await userEvent.click(screen.getByTestId('D-03'))

            expect(onChange).toHaveBeenLastCalledWith('D-03')
        })

        it('não chama onChange sem interação', () => {
            const onChange = jest.fn()
            render(<BusOptions onChange={onChange} />)
            expect(onChange).not.toHaveBeenCalled()
        })

        it('funciona sem onChange (não quebra)', async () => {
            render(<BusOptions />)
            await userEvent.click(screen.getByTestId('A-02'))
            // só garante que não lança erro
        })
    })

    describe('prop value', () => {
        it('respeita o assento pré-selecionado via prop value', () => {
            render(<BusOptions value="D-06" />)
            // assento D-06 deve ter a classe de selecionado (bg-blue-500)
            expect(screen.getByTestId('D-06').className).toContain('bg-blue-500')
        })
    })
})