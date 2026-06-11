import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmTicket from './ConfirmTicket'
import useCartStore from '@/domains/Cart/store/Cart/useCartStore'
import useTicketStore from '@/domains/Tickets/store/Ticket/useTicketStore'

// --- Mocks ---

jest.mock('@/commons/hooks/useDarkMode', () => ({
    __esModule: true,
    default: () => false,
}))

jest.mock('@/commons/helpers/formatPrice', () => ({
    __esModule: true,
    default: (value: number) => `R$ ${value.toFixed(2)}`,
}))

jest.mock('@/commons/helpers/calcAgeByString', () => ({
    __esModule: true,
    default: (birthdate: string) => {
        if (birthdate === '1/1/1990') return 35
        if (birthdate === '1/1/2015') return 10
        return 0
    },
}))

const mockNextStep = jest.fn()
const mockPrevStep = jest.fn()

jest.mock('@/domains/Cart/store/Cart/useCartStore')
jest.mock('@/domains/Tickets/store/Ticket/useTicketStore')

const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>
const mockUseTicketStore = useTicketStore as jest.MockedFunction<typeof useTicketStore>

jest.mock('@heroui/react', () => ({
    Button: ({ children, onPress, isPending }: any) => (
        <button onClick={onPress} disabled={isPending}>
            {children}
        </button>
    ),
}))

// --- Setup padrão ---

const defaultUser = {
    nome: 'Bjorn Ironsides',
    email: 'bjorn@fenris.com',
    cpf: '668.272.290-76',
    dataDeNascimento: '1/1/1990',
}

const setupMocks = (
    user = defaultUser,
    cart: any[] = [{ id: '1' }]
) => {
    mockUseCartStore.mockImplementation((selector: any) =>
        selector({ user, nextStep: mockNextStep, prevStep: mockPrevStep })
    )
    mockUseTicketStore.mockImplementation((selector: any) =>
        selector({ cart })
    )
}

// --- Testes ---

describe('ConfirmTicket', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        setupMocks()
    })

    describe('renderização', () => {
        it('exibe o título "Confirme seu pedido."', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('Confirme seu pedido.')).toBeInTheDocument()
        })

        it('exibe os labels de dados do passageiro', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('Passageiro:')).toBeInTheDocument()
            expect(screen.getByText('Nome')).toBeInTheDocument()
            expect(screen.getByText('E-mail')).toBeInTheDocument()
            expect(screen.getByText('CPF')).toBeInTheDocument()
            expect(screen.getByText('Idade')).toBeInTheDocument()
        })

        it('exibe os botões Confirmar e Voltar', () => {
            render(<ConfirmTicket />)
            expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
        })
    })

    describe('dados do passageiro', () => {
        it('exibe o nome do passageiro', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('Bjorn Ironsides')).toBeInTheDocument()
        })

        it('exibe o email do passageiro', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('bjorn@fenris.com')).toBeInTheDocument()
        })

        it('exibe o CPF do passageiro', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('668.272.290-76')).toBeInTheDocument()
        })

        it('exibe a idade calculada do passageiro', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('35 anos')).toBeInTheDocument()
        })

        it('não exibe idade quando birthdate é undefined', () => {
            setupMocks({ ...defaultUser, dataDeNascimento: undefined as any })
            render(<ConfirmTicket />)
            expect(screen.getByText('anos')).toBeInTheDocument()
        })
    })

    describe('preço total', () => {
        it('exibe o texto "por apenas"', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('por apenas')).toBeInTheDocument()
        })

        it('exibe R$ 300.00 quando o cart tem itens', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('R$ 300.00')).toBeInTheDocument()
        })

        it('exibe R$ 100.00 quando o cart está vazio', () => {
            setupMocks(defaultUser, [])
            render(<ConfirmTicket />)
            expect(screen.getByText('R$ 100.00')).toBeInTheDocument()
        })
    })

    describe('callbacks', () => {
        it('chama nextStep ao clicar em Confirmar', async () => {
            render(<ConfirmTicket />)
            await userEvent.click(screen.getByRole('button', { name: /confirmar/i }))
            expect(mockNextStep).toHaveBeenCalledTimes(1)
        })

        it('chama prevStep ao clicar em Voltar', async () => {
            render(<ConfirmTicket />)
            await userEvent.click(screen.getByRole('button', { name: /voltar/i }))
            expect(mockPrevStep).toHaveBeenCalledTimes(1)
        })
    })

    describe('cor condicional da idade', () => {
        it('exibe a idade em verde quando passageiro tem 16 anos ou mais', () => {
            render(<ConfirmTicket />)
            expect(screen.getByText('35 anos').className).toContain('text-green-300')
        })

        it('exibe a idade em vermelho quando passageiro tem menos de 16 anos', () => {
            setupMocks({ ...defaultUser, dataDeNascimento: '1/1/2015' })
            render(<ConfirmTicket />)
            expect(screen.getByText('10 anos').className).toContain('text-red-300')
        })

        it('exibe a idade em vermelho quando birthdate é undefined', () => {
            setupMocks({ ...defaultUser, dataDeNascimento: undefined as any })
            render(<ConfirmTicket />)
            expect(screen.getByText('anos').className).toContain('text-red-300')
        })
    })
})