import { renderHook, act, waitFor } from '@testing-library/react'
import useGetTrips from './useGetTrips'
import GetAxiosClient from '@/commons/clients/api'

// --- Mocks ---

jest.mock('@/commons/clients/api')
jest.mock('@/commons/helpers/convertDataStringToDbFormat', () => ({
    __esModule: true,
    default: (value: string) => value,
}))

const mockGet = jest.fn()
;(GetAxiosClient as jest.Mock).mockReturnValue({ get: mockGet })

// --- Fixtures ---

const basePaginatedResponse = {
    data: {
        data: [{ id: '1', route: { origem: 'SP', destino: 'RJ' } }],
        total: 1,
        page: 1,
    },
}

const baseFilters = { page: 1, size: 20 }

const mockDateValue = {
    toDate: () => ({ toISOString: () => '2025-06-01T08:00:00.000Z' }),
}

// --- Testes ---

describe('useGetTrips', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(GetAxiosClient as jest.Mock).mockReturnValue({ get: mockGet })
    })

    describe('estado inicial', () => {
        it('inicia com loading false', () => {
            const { result } = renderHook(() => useGetTrips())
            expect(result.current.loading).toBe(false)
        })

        it('inicia sem response', () => {
            const { result } = renderHook(() => useGetTrips())
            expect(result.current.response).toBeUndefined()
        })

        it('inicia sem erro', () => {
            const { result } = renderHook(() => useGetTrips())
            expect(result.current.error).toBeUndefined()
        })
    })

    describe('requisição bem-sucedida', () => {
        beforeEach(() => {
            mockGet.mockResolvedValue(basePaginatedResponse)
        })

        it('define loading true durante a requisição', async () => {
            mockGet.mockReturnValue(new Promise(() => {})) // nunca resolve
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })

            expect(result.current.loading).toBe(true)
        })

        it('define loading false após a requisição', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })

            await waitFor(() => expect(result.current.loading).toBe(false))
        })

        it('preenche response com os dados retornados', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })

            await waitFor(() => {
                expect(result.current.response).toEqual(basePaginatedResponse.data)
            })
        })

        it('chama o endpoint /viagens', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })

            await waitFor(() => expect(mockGet).toHaveBeenCalledWith(
                '/viagens',
                expect.objectContaining({ params: expect.any(Object) })
            ))
        })
    })

    describe('parâmetros da requisição', () => {
        beforeEach(() => {
            mockGet.mockResolvedValue(basePaginatedResponse)
        })

        it('envia _page e _per_page corretamente', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request({ page: 2, size: 10 }) })

            await waitFor(() => expect(mockGet).toHaveBeenCalledWith('/viagens', {
                params: expect.objectContaining({ _page: 2, '_per_page': 10 }),
            }))
        })

        it('envia filtro de origem quando fornecido', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request({ ...baseFilters, origem: 'São Paulo' }) })

            await waitFor(() => expect(mockGet).toHaveBeenCalledWith('/viagens', {
                params: expect.objectContaining({ 'route.origem:eq': 'São Paulo' }),
            }))
        })

        it('envia filtro de destino quando fornecido', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request({ ...baseFilters, destino: 'Campinas' }) })

            await waitFor(() => expect(mockGet).toHaveBeenCalledWith('/viagens', {
                params: expect.objectContaining({ 'route.destino:eq': 'Campinas' }),
            }))
        })

        it('envia filtro de data quando fornecido', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request({ ...baseFilters, dataHoraPartida: mockDateValue as any }) })

            await waitFor(() => expect(mockGet).toHaveBeenCalledWith('/viagens', {
                params: expect.objectContaining({ 'dataHoraPartida:eq': expect.any(String) }),
            }))
        })

        it('não envia filtros opcionais quando ausentes', async () => {
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })

            await waitFor(() => {
                const params = mockGet.mock.calls[0][1].params
                expect(params).not.toHaveProperty('route.origem:eq')
                expect(params).not.toHaveProperty('route.destino:eq')
                expect(params).not.toHaveProperty('dataHoraPartida:eq')
            })
        })
    })

    describe('erro na requisição', () => {
        it('define error quando a requisição falha', async () => {
            const apiError = new Error('Network error')
            mockGet.mockRejectedValue(apiError)
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })

            await waitFor(() => expect(result.current.error).toEqual(apiError))
        })

        it('define loading false após erro', async () => {
            mockGet.mockRejectedValue(new Error('fail'))
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })

            await waitFor(() => expect(result.current.loading).toBe(false))
        })

        it('limpa o erro antes de uma nova requisição', async () => {
            mockGet.mockRejectedValueOnce(new Error('primeiro erro'))
            mockGet.mockResolvedValueOnce(basePaginatedResponse)
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })
            await waitFor(() => expect(result.current.error).toBeDefined())

            act(() => { result.current.request(baseFilters) })
            await waitFor(() => expect(result.current.error).toBeUndefined())
        })
    })

    describe('guard de loading', () => {
        it('ignora chamadas enquanto loading é true', async () => {
            mockGet.mockReturnValue(new Promise(() => {})) // nunca resolve
            const { result } = renderHook(() => useGetTrips())

            act(() => { result.current.request(baseFilters) })
            act(() => { result.current.request(baseFilters) })
            act(() => { result.current.request(baseFilters) })

            expect(mockGet).toHaveBeenCalledTimes(1)
        })
    })
})