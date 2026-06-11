// SearchInput.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from './index'
import type { TTripsFilters } from '@/domains/Tickets/hooks/API/useGetTrips'

// --- Mocks ---

jest.mock('@/commons/hooks/useDarkMode', () => ({
    __esModule: true,
    default: () => false,
}))

jest.mock('@/commons/helpers/formatDate', () => ({
    __esModule: true,
    default: (value: string) => `formatted:${value}`,
}))

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

jest.mock('@/commons/components/Container', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/commons/components/ThemeSwitch', () => ({
    __esModule: true,
    default: () => <div data-testid="theme-switch" />,
}))

jest.mock('@/commons/components/DatePickerInput', () => ({
    __esModule: true,
    default: ({ label, onChange }: { label: string; onChange: (v: any) => void }) => (
        <div>
            <label>{label}</label>
            <input
                data-testid="date-picker-input"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    ),
}))

// Expande o mock do HeroUI com os componentes usados aqui
jest.mock('@heroui/react', () => {
    const mock = (name: string) => {
        const C = ({ children, onPress, onClick, isIconOnly, ...props }: any) => (
            <div
                data-testid={`heroui-${name}`}
                onClick={onPress ?? onClick}
                {...props}
            >
                {children}
            </div>
        )
        C.displayName = name
        return C
    }

    const TextField = ({ children, onChange, value }: any) => (
        <div data-testid="heroui-TextField">
            {children}
            {/* Expõe um input oculto para simular digitação */}
            <input data-testid={`textfield-input`} onChange={(e) => onChange?.(e.target.value)} value={value ?? ''} />
        </div>
    )

    const InputGroup = ({ children }: any) => <div>{children}</div>
    InputGroup.Prefix = ({ children }: any) => <div>{children}</div>
    InputGroup.Input = ({ placeholder, ...props }: any) => (
        <input placeholder={placeholder} {...props} />
    )

    return {
        Button: mock('Button'),
        Chip: mock('Chip'),
        Label: ({ children }: any) => <label>{children}</label>,
        TextField,
        InputGroup,
    }
})

// --- Fixtures ---

const baseFilters: TTripsFilters = {
    page: 1,
    size: 20,
    origem: undefined,
    destino: undefined,
    dataHoraPartida: undefined,
}

const filtersWithData: TTripsFilters = {
    page: 1,
    size: 20,
    origem: 'São Paulo',
    destino: 'Campinas',
    dataHoraPartida: '2025-06-01T08:00' as any,
}

// --- Testes ---

describe('SearchInput', () => {
    describe('renderização', () => {
        it('renderiza os campos de origem e destino', () => {
            render(<SearchInput filters={baseFilters} />)
            expect(screen.getByText('Origem:')).toBeInTheDocument()
            expect(screen.getByText('Destino:')).toBeInTheDocument()
        })

        it('renderiza o campo de data', () => {
            render(<SearchInput filters={baseFilters} />)
            expect(screen.getByText('Data de ida:')).toBeInTheDocument()
        })

        it('renderiza o botão de busca', () => {
            render(<SearchInput filters={baseFilters} />)
            expect(screen.getByTestId('heroui-Button')).toBeInTheDocument()
        })
    })

    describe('chips de filtros ativos', () => {
        it('exibe chip de origem quando filters.origem está definido', () => {
            render(<SearchInput filters={filtersWithData} />)
            expect(screen.getByText(/Origem: São Paulo/)).toBeInTheDocument()
        })

        it('exibe chip de destino quando filters.destino está definido', () => {
            render(<SearchInput filters={filtersWithData} />)
            expect(screen.getByText(/Destino: Campinas/)).toBeInTheDocument()
        })

        it('exibe chip de data formatada quando filters.dataHoraPartida está definido', () => {
            render(<SearchInput filters={filtersWithData} />)
            expect(screen.getByText(/Data de ida: /)).toBeInTheDocument()
        })

        it('não exibe chips quando filters está vazio', () => {
            render(<SearchInput filters={baseFilters} />)
            expect(screen.queryByText(/Origem: /)).not.toBeInTheDocument()
            expect(screen.queryByText(/Destino: /)).not.toBeInTheDocument()
            expect(screen.queryByText(/Data de ida: /)).not.toBeInTheDocument()
        })
    })

    describe('botão de limpar filtros', () => {
        it('exibe o botão de limpar quando há filtros ativos', () => {
            render(<SearchInput filters={filtersWithData} />)
            // São 2 buttons: lixeira + busca
            expect(screen.getAllByTestId('heroui-Button')).toHaveLength(2)
        })

        it('não exibe o botão de limpar quando não há filtros', () => {
            render(<SearchInput filters={baseFilters} />)
            expect(screen.getAllByTestId('heroui-Button')).toHaveLength(1)
        })

        it('chama onChange com filtros resetados ao clicar em limpar', async () => {
            const onChange = jest.fn()
            render(<SearchInput filters={filtersWithData} onChange={onChange} />)

            const buttons = screen.getAllByTestId('heroui-Button')
            await userEvent.click(buttons[0]) // primeiro botão = lixeira

            expect(onChange).toHaveBeenCalledWith({
                page: 1,
                size: 20,
                origem: undefined,
                destino: undefined,
                dataHoraPartida: undefined,
            })
        })
    })

    describe('busca', () => {
        it('chama onChange com origem digitada ao clicar em buscar', async () => {
            const onChange = jest.fn()
            render(<SearchInput filters={baseFilters} onChange={onChange} />)

            const textfields = screen.getAllByTestId('textfield-input')
            await userEvent.type(textfields[0], 'Santos')

            const searchButton = screen.getByTestId('heroui-Button')
            await userEvent.click(searchButton)

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
                origem: 'Santos',
                page: 1,
            }))
        })

        it('chama onChange com destino digitado ao clicar em buscar', async () => {
            const onChange = jest.fn()
            render(<SearchInput filters={baseFilters} onChange={onChange} />)

            const textfields = screen.getAllByTestId('textfield-input')
            await userEvent.type(textfields[1], 'Guarulhos')

            const searchButton = screen.getByTestId('heroui-Button')
            await userEvent.click(searchButton)

            expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
                destino: 'Guarulhos',
                page: 1,
            }))
        })

        it('não quebra sem onChange ao buscar', async () => {
            render(<SearchInput filters={baseFilters} />)
            await userEvent.click(screen.getByTestId('heroui-Button'))
        })
    })
})