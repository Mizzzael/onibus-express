"use client"
import Layout from "@/domains/Tickets/layouts/TicketHome";
import SearchInput from "@/domains/Tickets/features/TicketHome/SearchInput";
import TripsList from "@/domains/Tickets/features/TicketHome/TripsList";
import ProviderStoreTicket from "@/domains/Tickets/store/Ticket/provider";
import useGetTrips from "@/domains/Tickets/hooks/API/useGetTrips";
import LoadingBus from "@/commons/components/LoadingBus";
import {useEffect} from "react";
import PaginationComponent from "@/commons/components/Pagination";
import {useState} from "react";
import type {TTripsFilters} from "@/domains/Tickets/hooks/API/useGetTrips";

export default function TicketHome() {
    const [ filter, setFilter ] = useState<TTripsFilters>({
        destino: undefined,
        origem: undefined,
        size: 20,
        page: 1,
        dataHoraPartida: undefined,
    })

    const {
        response,
        loading,
        request
    } = useGetTrips();

    useEffect(() => {
        request({
            ...filter
        })
    }, [ filter ]);

    return (
        <Layout>
            <ProviderStoreTicket>
                {(!loading) && (
                    <main className={'w-full'}>
                        <SearchInput onChange={(newFilter) => {
                            setFilter({ ...newFilter });
                        }} filters={filter} />
                        <TripsList items={response?.data} page={filter.page} />
                    </main>
                ) || <LoadingBus /> }
                <footer className="w-full py-6">
                    <PaginationComponent
                        page={filter.page || 1}
                        totalPages={response?.pages || 0}
                        onChangePage={(nPage) => {
                            setFilter({ ...filter, page: nPage });
                        }}
                    />
                </footer>
            </ProviderStoreTicket>
        </Layout>
    )
}