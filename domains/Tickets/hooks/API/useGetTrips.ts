import type TApiHooks from "@/commons/types/TApiHooks";
import {useState} from "react";
import {useCallback} from "react";
import GetAxiosClient from "@/commons/clients/api";
import type Trip from "@/domains/Tickets/models/Ticket/trip";
import type {DateValue} from "@heroui/react";
import convertDataStringToDbFormat from "@/commons/helpers/convertDataStringToDbFormat";

export type TTripsFilters = {
    page: number;
    size: number;
    origem?: string;
    destino?: string;
    dataHoraPartida?: DateValue;
}

const useGetTrips = (): TApiHooks<TPaginated<Trip>, TTripsFilters> => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [ response, setResponse ] = useState<TPaginated<Trip> | undefined>(undefined);

    const fetchData = useCallback((params: TTripsFilters) => {
        if (loading)
            return;
        setLoading(true);
        const client = GetAxiosClient();
        setError(undefined);
        let paramsList: {[key: string]: string | number} = {
            "_page": params.page,
            "_per_page": params.size || 20,
        }

        if (params.origem) {
            paramsList = {
                ...paramsList,
                "route.origem:eq": params.origem,
            }
        }

        if (params.destino) {
            paramsList = {
                ...paramsList,
                "route.destino:eq": params.destino,
            }
        }

        if (params.dataHoraPartida) {
            paramsList = {
                ...paramsList,
                "dataHoraPartida:eq": convertDataStringToDbFormat(params.dataHoraPartida.toDate("America/Sao_Paulo").toISOString()),
            }
        }

        client
            .get<TPaginated<Trip>>('/viagens', {
                params: paramsList,
            })
            .then(response => {
                setResponse(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [ loading ]);

    return {
        loading,
        error,
        response,
        request: fetchData
    }
}

export default useGetTrips;