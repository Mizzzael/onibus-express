import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ServiceContract from './ServiceContract'

// --- Mocks ---

jest.mock('@/commons/hooks/useDarkMode', () => ({
    __esModule: true,
    default: () => false,
}))

jest.mock('react-icons/hi2', () => ({
    HiAcademicCap: () => <span data-testid="icon-academic-cap" />,
}))

jest.mock('@heroui/react', () => {
    const Backdrop = ({ children, isOpen }: any) =>
        isOpen ? <div data-testid="modal-backdrop">{children}</div> : null

    const Container = ({ children }: any) => <div>{children}</div>

    const Dialog = ({ children }: any) => <div data-testid="modal-dialog">{children}</div>

    const Header = ({ children }: any) => <div data-testid="modal-header">{children}</div>

    const Icon = ({ children }: any) => <div data-testid="modal-icon">{children}</div>

    const Heading = ({ children }: any) => <div>{children}</div>

    const Body = ({ children }: any) => <div data-testid="modal-body">{children}</div>

    const Footer = ({ children }: any) => <div data-testid="modal-footer">{children}</div>

    const Modal: any = () => null
    Modal.Backdrop = Backdrop
    Modal.Container = Container
    Modal.Dialog = Dialog
    Modal.Header = Header
    Modal.Icon = Icon
    Modal.Heading = Heading
    Modal.Body = Body
    Modal.Footer = Footer

    const Button = ({ children, onPress }: any) => (
        <button onClick={onPress}>{children}</button>
    )

    return { Modal, Button }
})

// --- Testes ---

describe('ServiceContract', () => {
    describe('visibilidade', () => {
        it('renderiza o modal quando isOpen é true', () => {
            render(<ServiceContract isOpen={true} />)
            expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument()
        })

        it('não renderiza o modal quando isOpen é false', () => {
            render(<ServiceContract isOpen={false} />)
            expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument()
        })
    })

    describe('conteúdo', () => {
        beforeEach(() => {
            render(<ServiceContract isOpen={true} />)
        })

        it('exibe o texto de introdução do contrato', () => {
            expect(screen.getByText(/Contrato - Logo abaixo segue seu contrato/)).toBeInTheDocument()
        })

        it('exibe o título "Pacto de Fang"', () => {
            expect(screen.getByText('Pacto de Fang')).toBeInTheDocument()
        })

        it('exibe o subtítulo dos termos de uso', () => {
            expect(screen.getByText(/Termos de Uso — Selados pela Lei de Fenris/)).toBeInTheDocument()
        })

        it('exibe todas as cláusulas', () => {
            expect(screen.getByText(/Kyn ok Nafn/)).toBeInTheDocument()
            expect(screen.getByText(/Verk ok Skylda/)).toBeInTheDocument()
            expect(screen.getByText(/Leynd ok Traust/)).toBeInTheDocument()
            expect(screen.getByText(/Lög ok Dóm/)).toBeInTheDocument()
            expect(screen.getByText(/Breyta ok Nýr Eið/)).toBeInTheDocument()
            expect(screen.getByText(/Deilur ok Dóm/)).toBeInTheDocument()
        })

        it('exibe o juramento final', () => {
            expect(screen.getByText(/Eið Lokaorð/)).toBeInTheDocument()
        })

        it('exibe os botões de cancelar e aceitar', () => {
            expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /aceito/i })).toBeInTheDocument()
        })

        it('renderiza o ícone do cabeçalho', () => {
            expect(screen.getByTestId('icon-academic-cap')).toBeInTheDocument()
        })
    })

    describe('callbacks', () => {
        it('chama cancel ao clicar em Cancelar', async () => {
            const cancel = jest.fn()
            render(<ServiceContract isOpen={true} cancel={cancel} />)

            await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

            expect(cancel).toHaveBeenCalledTimes(1)
        })

        it('chama confirm ao clicar em Aceito', async () => {
            const confirm = jest.fn()
            render(<ServiceContract isOpen={true} confirm={confirm} />)

            await userEvent.click(screen.getByRole('button', { name: /aceito/i }))

            expect(confirm).toHaveBeenCalledTimes(1)
        })

        it('não quebra sem cancel ao clicar em Cancelar', async () => {
            render(<ServiceContract isOpen={true} />)
            await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))
        })

        it('não quebra sem confirm ao clicar em Aceito', async () => {
            render(<ServiceContract isOpen={true} />)
            await userEvent.click(screen.getByRole('button', { name: /aceito/i }))
        })
    })
})