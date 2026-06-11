import { render, screen } from '@testing-library/react'
import LocationItem from './LocationItem'

describe('LocationItem', () => {
    it('renderiza o topTag corretamente', () => {
        render(<LocationItem topTag="Origem" cityName="São Paulo" />)
        expect(screen.getByText('Origem')).toBeInTheDocument()
    })

    it('renderiza o cityName corretamente', () => {
        render(<LocationItem topTag="Origem" cityName="São Paulo" />)
        expect(screen.getByText('São Paulo')).toBeInTheDocument()
    })

    it('cityName é renderizado como heading', () => {
        render(<LocationItem topTag="Destino" cityName="Campinas" />)
        expect(screen.getByRole('heading', { name: 'Campinas' })).toBeInTheDocument()
    })

    it('renderiza props diferentes corretamente', () => {
        render(<LocationItem topTag="Destino" cityName="Rio de Janeiro" />)
        expect(screen.getByText('Destino')).toBeInTheDocument()
        expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument()
    })
})