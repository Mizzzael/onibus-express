import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PassengerForm from './PassengerForm'

// --- Mocks ---

jest.mock('@/commons/hooks/useDarkMode', () => ({
    __esModule: true,
    default: () => false,
}))

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

const mockNextStep = jest.fn()
const mockAddUser = jest.fn()
jest.mock('@/domains/Cart/store/Cart/useCartStore', () => ({
    __esModule: true,
    default: (selector: any) =>
        selector({ nextStep: mockNextStep, setUser: mockAddUser }),
}))

jest.mock('@/domains/Tickets/store/Ticket/useTicketStore', () => ({
    __esModule: true,
    default: (selector: any) => selector({ cart: [{ id: '1' }] }), // cart com 1 item
}))

jest.mock('@internationalized/date', () => ({
    getLocalTimeZone: () => 'America/Sao_Paulo',
    today: () => ({
        add: () => ({ day: 1, month: 1, year: 2008, compare: () => -1 }),
    }),
}))

jest.mock('@/domains/User/models/User/user.schema', () => ({
    __esModule: true,
    default: {
        safeParse: ({ nome, email, cpf, dataDeNascimento }: any) => ({
            success: !!(nome && email && cpf && dataDeNascimento),
        }),
    },
}))

jest.mock('cpf-cnpj-validator', () => ({
    cpf: {
        isValid: (value: string) => value === '668.272.290-76' || value === '66827229076',
    },
}))

jest.mock('@/commons/components/DatePickerInput', () => ({
    __esModule: true,
    default: ({ label, onChange, validate }: any) => (
        <div>
            <label>{label}</label>
            <input
                data-testid="date-picker-input"
                onChange={(e) => {
                    const val = e.target.value
                        ? { day: 1, month: 6, year: 1990, compare: () => -1 }
                        : null
                    onChange?.(val)
                }}
            />
            {validate && (
                <span data-testid="date-error">{validate(null)}</span>
            )}
        </div>
    ),
}))

jest.mock('@/commons/components/MaskInput', () => ({
    MaskInputGroup: ({ placeholder, onChange }: any) => (
        <input
            data-testid="cpf-input"
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
        />
    ),
}))

jest.mock('react-icons/hi2', () => ({
    HiMiniUserCircle: () => null,
    HiAtSymbol: () => null,
    HiIdentification: () => null,
}))

jest.mock('@heroui/react', () => {
    const TextField = ({ children, onChange, value, validate }: any) => (
        <div data-testid="heroui-TextField">
            {children}
            <input
                data-testid="textfield-input"
                value={value ?? ''}
                onChange={(e) => onChange?.(e.target.value)}
            />
            {validate && <span>{validate(value)}</span>}
        </div>
    )

    const InputGroup = ({ children }: any) => <div>{children}</div>
    InputGroup.Prefix = ({ children }: any) => <span>{children}</span>
    InputGroup.Input = ({ placeholder }: any) => <input placeholder={placeholder} />

    const Form = ({ children, onSubmit }: any) => (
        <form onSubmit={onSubmit}>{children}</form>
    )

    const Button = ({ children, onPress, type, isDisabled, onClick }: any) => (
        <button
            type={type ?? 'button'}
            disabled={isDisabled}
            onClick={onPress ?? onClick}
        >
            {children}
        </button>
    )

    return {
        Form,
        TextField,
        Label: ({ children }: any) => <label>{children}</label>,
        InputGroup,
        FieldError: () => null,
        Button,
    }
})

// --- Helpers ---

const fillForm = async () => {
    const textfields = screen.getAllByTestId('textfield-input')
    await userEvent.type(textfields[0], 'Bjorn Ironsides')   // nome
    await userEvent.type(textfields[1], 'bjorn@fenris.com')  // email
    await userEvent.type(textfields[2], '668.272.290-76')    // cpf

    const datePicker = screen.getByTestId('date-picker-input')
    await userEvent.type(datePicker, '1990-06-01')
}

// --- Testes ---

describe('PassengerForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('renderização', () => {
        it('exibe o título "Dados do Passageiro"', () => {
            render(<PassengerForm />)
            expect(screen.getByText('Dados do Passageiro')).toBeInTheDocument()
        })

        it('exibe os campos de nome, email, cpf e aniversário', () => {
            render(<PassengerForm />)
            expect(screen.getByText('Nome:')).toBeInTheDocument()
            expect(screen.getByText('Email:')).toBeInTheDocument()
            expect(screen.getByText('CPF:')).toBeInTheDocument()
            expect(screen.getByText('Aniversário')).toBeInTheDocument()
        })

        it('exibe os botões Seguinte e Voltar', () => {
            render(<PassengerForm />)
            expect(screen.getByRole('button', { name: /seguinte/i })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
        })
    })

    describe('botão Seguinte', () => {
        it('está desabilitado quando o formulário está vazio', () => {
            render(<PassengerForm />)
            expect(screen.getByRole('button', { name: /seguinte/i })).toBeDisabled()
        })

        it('está desabilitado quando o cart está vazio', () => {
            jest.resetModules()
            jest.mock('@/domains/Tickets/store/Ticket/useTicketStore', () => ({
                __esModule: true,
                default: (selector: any) => selector({ cart: [] }),
            }))
            render(<PassengerForm />)
            expect(screen.getByRole('button', { name: /seguinte/i })).toBeDisabled()
        })

        it('está habilitado quando o formulário é válido', async () => {
            render(<PassengerForm />)
            await fillForm()
            await waitFor(() => {
                expect(screen.getByRole('button', { name: /seguinte/i })).not.toBeDisabled()
            })
        })
    })

    describe('submit do formulário', () => {
        it('chama addUser com os dados do passageiro ao submeter', async () => {
            render(<PassengerForm />)
            await fillForm()

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))

            await waitFor(() => {
                expect(mockAddUser).toHaveBeenCalledWith(expect.objectContaining({
                    nome: 'Bjorn Ironsides',
                    email: 'bjorn@fenris.com',
                }))
            })
        })

        it('chama nextStep ao submeter o formulário', async () => {
            render(<PassengerForm />)
            await fillForm()

            await userEvent.click(screen.getByRole('button', { name: /seguinte/i }))

            await waitFor(() => {
                expect(mockNextStep).toHaveBeenCalledTimes(1)
            })
        })
    })

    describe('botão Voltar', () => {
        it('redireciona para "/" ao clicar em Voltar', async () => {
            render(<PassengerForm />)

            await userEvent.click(screen.getByRole('button', { name: /voltar/i }))

            expect(mockPush).toHaveBeenCalledWith('/')
        })
    })

    describe('validações', () => {
        it('exibe erro de data de nascimento obrigatória', () => {
            render(<PassengerForm />)
            expect(screen.getByTestId('date-error')).toHaveTextContent(
                'A data de nascimento é obrigatória!'
            )
        })

        it('exibe placeholder correto no campo de CPF', () => {
            render(<PassengerForm />)
            expect(screen.getByPlaceholderText('ex: 668.272.290-76')).toBeInTheDocument()
        })

        it('exibe placeholder correto no campo de nome', () => {
            render(<PassengerForm />)
            expect(screen.getByPlaceholderText('ex: Laufey, Byorn')).toBeInTheDocument()
        })
    })
})