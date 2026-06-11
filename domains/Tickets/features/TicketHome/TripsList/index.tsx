"use client"
import Container from "@/commons/components/Container";
import Item from "@/domains/Tickets/features/TicketHome/TripsList/Item";
import {HiArchiveBoxXMark} from "react-icons/hi2";
import type Trip from "@/domains/Tickets/models/Ticket/trip";

type TTripListProps = {
    items?: Trip[],
    page: number,
}

function EmptyList() {
    return (
        <>
            <section className={'pt-4 w-full'}>
                <Container>
                    <section className={"bg-white dark:bg-[var(--dark-gray)] dark:text-white text-gray-300 rounded-xl shadow-sm p-4 flex items-center justify-center"}>
                        <HiArchiveBoxXMark size={'6rem'} />
                    </section>
                </Container>
            </section>
        </>
    )
}

export default function TripsList({ items, page }: TTripListProps) {
    if (!items || !items.length) return <EmptyList />;
    return (
        <section className={'pt-4 w-full'}>
            <Container>
                <section className={"bg-white dark:bg-[var(--dark-gray)] rounded-xl shadow-sm p-4"}>
                    {
                        items.map((item) => (<Item key={`${page}-${item.id}`} id={item.id} trip={item} />))
                    }
                </section>
            </Container>
        </section>
    )
}