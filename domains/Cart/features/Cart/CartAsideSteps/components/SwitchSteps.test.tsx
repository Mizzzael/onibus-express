import { render, screen } from '@testing-library/react'
import SwitchSteps from './SwitchSteps'
import useCartStore from '@/domains/Cart/store/Cart/useCartStore'

// --- Mocks ---

jest.mock('@/domains/Cart/store/Cart/useCartStore')

jest.mock('@/domains/Cart/features/Cart/CartAsideSteps/components/PassengerForm', () => ({
    __esModule: true,
    default: () => <div data-testid="passenger-form" />,
}))

jest.mock('@/domains/Cart/features/Cart/CartAsideSteps/components/ConfirmTicket', () => ({
    __esModule: true,
    default: () => <div data-testid="confirm-ticket" />,
}))

jest.mock('@/domains/Cart/features/Cart/CartAsideSteps/components/PaymentStep', () => ({
    __esModule: true,
    default: () => <div data-testid="payment-step" />,
}))

jest.mock('react-icons/fa6', () => ({
    FaCircle: ({ className }: { className: string }) => (
        <span data-testid="step-indicator" className={className} />
    ),
}))

const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>

const renderWithStep = (step: number) => {
    mockUseCartStore.mockReturnValue(step)
    return render(<SwitchSteps />)
}

// --- Testes ---

describe('SwitchSteps', () => {
    describe('renderização dos steps', () => {
        it('renderiza PassengerForm no step 0 (padrão)', () => {
            renderWithStep(0)
            expect(screen.getByTestId('passenger-form')).toBeInTheDocument()
            expect(screen.queryByTestId('confirm-ticket')).not.toBeInTheDocument()
            expect(screen.queryByTestId('payment-step')).not.toBeInTheDocument()
        })

        it('renderiza ConfirmTicket no step 1', () => {
            renderWithStep(1)
            expect(screen.getByTestId('confirm-ticket')).toBeInTheDocument()
            expect(screen.queryByTestId('passenger-form')).not.toBeInTheDocument()
            expect(screen.queryByTestId('payment-step')).not.toBeInTheDocument()
        })

        it('renderiza PaymentStep no step 2', () => {
            renderWithStep(2)
            expect(screen.getByTestId('payment-step')).toBeInTheDocument()
            expect(screen.queryByTestId('passenger-form')).not.toBeInTheDocument()
            expect(screen.queryByTestId('confirm-ticket')).not.toBeInTheDocument()
        })

        it('renderiza PassengerForm para step desconhecido (default)', () => {
            renderWithStep(99)
            expect(screen.getByTestId('passenger-form')).toBeInTheDocument()
        })
    })

    describe('indicadores de progresso', () => {
        it('renderiza 3 indicadores de step', () => {
            renderWithStep(0)
            expect(screen.getAllByTestId('step-indicator')).toHaveLength(3)
        })

        it('step 0: primeiro indicador é azul, demais são cinza', () => {
            renderWithStep(0)
            const indicators = screen.getAllByTestId('step-indicator')
            expect(indicators[0].className).toContain('text-blue-400')
            expect(indicators[1].className).toContain('text-gray-300')
            expect(indicators[2].className).toContain('text-gray-300')
        })

        it('step 1: primeiro é verde, segundo é azul, terceiro é cinza', () => {
            renderWithStep(1)
            const indicators = screen.getAllByTestId('step-indicator')
            expect(indicators[0].className).toContain('text-green-500')
            expect(indicators[1].className).toContain('text-blue-400')
            expect(indicators[2].className).toContain('text-gray-300')
        })

        it('step 2: primeiro e segundo são verdes, terceiro é azul', () => {
            renderWithStep(2)
            const indicators = screen.getAllByTestId('step-indicator')
            expect(indicators[0].className).toContain('text-green-500')
            expect(indicators[1].className).toContain('text-green-500')
            expect(indicators[2].className).toContain('text-blue-400')
        })
    })
})