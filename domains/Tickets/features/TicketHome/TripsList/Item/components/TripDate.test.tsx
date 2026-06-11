// TripDate.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TripDate from './TripDate';
import type Trip from '@/domains/Tickets/models/Ticket/trip';

// Mock do formatDate
jest.mock('@/commons/helpers/formatDate', () => ({
    __esModule: true,
    default: jest.fn((date) => `Data formatada: ${date}`)
}));

describe('TripDate Component', () => {
    const mockTrip: Trip = {
        dataHoraPartida: '2023-12-25T10:00:00Z',
        "id": 58,
        "precoBase": 235.00,
        "assentosDisponiveis": 31,
        "route": {
            "id": 58,
            "origem": "Linköping",
            "destino": "Kalmar",
            "duracaoEstimada": "3h30m"
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar corretamente com a data formatada', () => {
        render(<TripDate trip={mockTrip} />);

        // Verifica se o texto "Data da viagem" está presente
        expect(screen.getByText(/data da viagem/i)).toBeInTheDocument();

        // Verifica se a data formatada está presente
        expect(screen.getByText(/Data formatada: 2023-12-25T10:00:00Z/i)).toBeInTheDocument();
    });

    it('deve aplicar os estilos corretos', () => {
        render(<TripDate trip={mockTrip} />);

        const smallElement = screen.getByText(/data da viagem/i);
        expect(smallElement).toHaveClass('text-sm', 'block');

        const pElement = screen.getByText(/Data formatada: 2023-12-25T10:00:00Z/i);
        expect(pElement).toHaveClass('text-lg', 'font-bold');
    });

    it('deve renderizar com diferentes datas', () => {
        const tripWithDifferentDate: Trip = {
            dataHoraPartida: '2024-01-15T14:30:00Z',
            "id": 58,
            "precoBase": 235.00,
            "assentosDisponiveis": 31,
            "route": {
                "id": 58,
                "origem": "Linköping",
                "destino": "Kalmar",
                "duracaoEstimada": "3h30m"
            }
        };

        render(<TripDate trip={tripWithDifferentDate} />);

        expect(screen.getByText(/Data formatada: 2024-01-15T14:30:00Z/i)).toBeInTheDocument();
    });

    it('deve lidar com datas vazias ou nulas', () => {
        const tripWithNullDate: Trip = {
            dataHoraPartida: null,
            "id": 58,
            "precoBase": 235.00,
            "assentosDisponiveis": 31,
            "route": {
                "id": 58,
                "origem": "Linköping",
                "destino": "Kalmar",
                "duracaoEstimada": "3h30m"
            }
        };

        render(<TripDate trip={tripWithNullDate} />);

        expect(screen.getByText(/Data formatada: null/i)).toBeInTheDocument();
    });
});
