import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PaymentStep from './PaymentStep'

// --- Mocks ---

jest.mock('@/commons/hooks/useDarkMode', () => ({
    __esModule: true,
    default: () => false,
}))

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

const mockPrevStep = jest.fn()
jest.mock('@/domains/Cart/store/Cart/useCartStore', () => ({
    __esModule: true,
    default: (selector: any) => selector({ prevStep: mockPrevStep }),
}))

jest.mock('@/commons/helpers/fakeDelay', () => ({
    fakeDelay: () => Promise.resolve(),
}))

jest.mock('@/domains/Cart/features/Cart/CartAsideSteps/components/LoadingCart', () => ({
    __esModule: true,
    default: () => <div data-testid="loading-cart" />,
}))

jest.mock('@/domains/Cart/features/Cart/CartAsideSteps/components/ServiceContract', () => ({
    __esModule: true,
    default: ({ isOpen, cancel, confirm }: any) => (
        isOpen ? (
            <div data-testid="service-contract">
                <button onClick={cancel}>Cancelar</button>
                <button onClick={confirm}>Aceito</button>
            </div>
        ) : null
    ),
}))

jest.mock('@heroui/react', () => ({
    Button: ({ children, onPress }: any) => (
        <button onClick={onPress}>{children}</button>
    ),
}))

// --- Testes ---

describe('PaymentStep', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('renderização', () => {
        it('renderiza o título "Pagamentos"', () => {
            render(<PaymentStep />)
            expect(screen.getByText('Pagamentos')).toBeInTheDocument()
        })

        it('renderiza o placeholder do gateway de pagamento', () => {
            render(<PaymentStep />)
            expect(screen.getByText(/Gateway de pagamento/)).toBeInTheDocument()
        })

        it('renderiza os botões de Seguinte e Voltar', () => {
            render(<PaymentStep />)
            expect(screen.getByRole('button', { name: /seguinte/i })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
        })

        it('não exibe o contrato inicialmente', () => {
            render(<PaymentStep />)
            expect(screen.queryByTestId('service-contract')).not.toBeInTheDocument()
        })

        it('não exibe o loading inicialmente', () => {
            render(<PaymentStep />)
            expect(screen.queryByTestId('loading-cart')).not.toBeInTheDocument()
        })
    })

    describe('botão Seguinte', () => {
        it('abre o ServiceContract ao clicar em Seguinte', async () => {
            render(<PaymentStep />)

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))

            expect(screen.getByTestId('service-contract')).toBeInTheDocument()
        })
    })

    describe('botão Voltar', () => {
        it('chama prevStep ao clicar em Voltar', async () => {
            render(<PaymentStep />)

            await userEvent.click(screen.getByRole('button', { name: /voltar/i }))

            expect(mockPrevStep).toHaveBeenCalledTimes(1)
        })
    })

    describe('ServiceContract — cancelar', () => {
        it('fecha o contrato ao clicar em Cancelar', async () => {
            render(<PaymentStep />)

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))
            expect(screen.getByTestId('service-contract')).toBeInTheDocument()

            await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))
            expect(screen.queryByTestId('service-contract')).not.toBeInTheDocument()
        })

        it('não inicia o loading ao cancelar', async () => {
            render(<PaymentStep />)

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))
            await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

            expect(screen.queryByTestId('loading-cart')).not.toBeInTheDocument()
        })
    })

    describe('ServiceContract — confirmar', () => {
        it('fecha o contrato ao confirmar', async () => {
            render(<PaymentStep />)

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))
            await userEvent.click(screen.getByRole('button', { name: /aceito/i }))

            expect(screen.queryByTestId('service-contract')).not.toBeInTheDocument()
        })

        it('exibe o LoadingCart ao confirmar', async () => {
            render(<PaymentStep />)

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))
            await userEvent.click(screen.getByRole('button', { name: /aceito/i }))

            expect(screen.getByTestId('loading-cart')).toBeInTheDocument()
        })

        it('redireciona para a página de sucesso após confirmar', async () => {
            render(<PaymentStep />)

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))
            await userEvent.click(screen.getByRole('button', { name: /aceito/i }))

            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith('/cart/success?code=ABC-123')
            })
        })
    })
})