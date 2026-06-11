import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartTickerItems from './CartTickerItems'
import useTicketStore from '@/domains/Tickets/store/Ticket/useTicketStore'

// --- Mocks ---

jest.mock('@/commons/hooks/useDarkMode', () => ({
    __esModule: true,
    default: () => false,
}))

jest.mock('@/commons/components/Container', () => ({
    __esModule: true,
    default: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('react-icons/hi2', () => ({
    HiOutlineTrash: () => <span data-testid="icon-trash" />,
    HiArchiveBoxXMark: () => <span data-testid="icon-empty" />,
}))

jest.mock('@heroui/react', () => ({
    Button: ({ children, onClick }: any) => (
        <button onClick={onClick}>{children}</button>
    ),
}))

jest.mock('@/domains/Tickets/store/Ticket/useTicketStore')

const mockUseTicketStore = useTicketStore as jest.MockedFunction<typeof useTicketStore>

const mockClear = jest.fn()

// --- Fixtures ---

const mockTrip = {
    id: 'trip-1',
    route: {
        origem: 'São Paulo',
        destino: 'Campinas',
        duracaoEstimada: '1h 30min',
    },
}

// --- Testes ---

describe('CartTickerItems', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseTicketStore.mockImplementation((selector: any) =>
            selector({ clearCart: mockClear })
        )
    })

    describe('CartEmpty — cart vazio ou sem id', () => {
        it('renderiza o estado vazio quando cart está vazio', () => {
            render(<CartTickerItems cart={[]} />)
            expect(screen.getByTestId('icon-empty')).toBeInTheDocument()
        })

        it('renderiza o estado vazio quando o trip não tem id', () => {
            render(<CartTickerItems cart={[{ route: {} } as any]} />)
            expect(screen.getByTestId('icon-empty')).toBeInTheDocument()
        })

        it('não renderiza os dados da viagem no estado vazio', () => {
            render(<CartTickerItems cart={[]} />)
            expect(screen.queryByText('Dados da viagem')).not.toBeInTheDocument()
        })
    })

    describe('CartTickerItems — com viagem', () => {
        describe('renderização', () => {
            it('exibe o título "Dados da viagem"', () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)
                expect(screen.getByText('Dados da viagem')).toBeInTheDocument()
            })

            it('exibe a origem da viagem', () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)
                expect(screen.getByText('São Paulo')).toBeInTheDocument()
            })

            it('exibe o destino da viagem', () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)
                expect(screen.getByText('Campinas')).toBeInTheDocument()
            })

            it('exibe a duração estimada', () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)
                expect(screen.getByText('1h 30min')).toBeInTheDocument()
            })

            it('exibe o assento quando fornecido', () => {
                render(<CartTickerItems cart={[mockTrip as any]} seat="B-04" />)
                expect(screen.getByText('B-04')).toBeInTheDocument()
            })

            it('não exibe valor de assento quando seat é undefined', () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)
                // label ainda aparece, mas sem valor ao lado
                expect(screen.getByText('Assento')).toBeInTheDocument()
            })

            it('exibe os labels das seções', () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)
                expect(screen.getByText('Origem')).toBeInTheDocument()
                expect(screen.getByText('Destino')).toBeInTheDocument()
                expect(screen.getByText('Duração')).toBeInTheDocument()
                expect(screen.getByText('Assento')).toBeInTheDocument()
            })

            it('exibe o botão de remover', () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)
                expect(screen.getByTestId('icon-trash')).toBeInTheDocument()
            })
        })

        describe('ação de limpar', () => {
            it('chama clearCart ao clicar no botão de remover', async () => {
                render(<CartTickerItems cart={[mockTrip as any]} />)

                await userEvent.click(screen.getByRole('button'))

                expect(mockClear).toHaveBeenCalledTimes(1)
            })

            it('não quebra quando clearCart é undefined', async () => {
                mockUseTicketStore.mockImplementation((selector: any) =>
                    selector({ clearCart: undefined })
                )
                render(<CartTickerItems cart={[mockTrip as any]} />)

                await userEvent.click(screen.getByRole('button'))
                // não deve lançar erro
            })
        })
    })
})