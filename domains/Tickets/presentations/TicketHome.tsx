"use client"
import Layout from "@/domains/Tickets/layouts/TicketHome";
import SearchInput from "@/domains/Tickets/features/TicketHome/SearchInput";
import TripsList from "@/domains/Tickets/features/TicketHome/TripsList";
import ProviderStoreTicket from "@/domains/Tickets/store/Ticket/provider";

export default function TicketHome() {
    return (
        <Layout>
            <ProviderStoreTicket>
                <main className={'w-full'}>
                    <SearchInput />
                    <TripsList />
                </main>
            </ProviderStoreTicket>
        </Layout>
    )
}