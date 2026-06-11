import { render, screen } from '@testing-library/react'
import DurationItem from './DurationItem'
import type Trip from '@/domains/Tickets/models/Ticket/trip'

const mockTrip: Trip = {
    "id": 58,
    "dataHoraPartida": "2026-08-12T16:30:00",
    "precoBase": 235.00,
    "assentosDisponiveis": 31,
    "route": {
        "id": 58,
        "origem": "Linköping",
        "destino": "Kalmar",
        "duracaoEstimada": "3h30m"
    }
}

describe('DurationItem', () => {
    it('renderiza o label "Duração"', () => {
        render(<DurationItem {...mockTrip} />)
        expect(screen.getByText('Duração')).toBeInTheDocument()
    })

    it('exibe a duração estimada corretamente', () => {
        render(<DurationItem {...mockTrip} />)
        expect(screen.getByText('3h30m')).toBeInTheDocument()
    })

    it('exibe duração diferente quando a prop muda', () => {
        const trip: Trip = {
            ...mockTrip,
        }

        trip.route.duracaoEstimada = "45min";
        render(<DurationItem {...trip} />)
        expect(screen.getByText('45min')).toBeInTheDocument()
    })
})