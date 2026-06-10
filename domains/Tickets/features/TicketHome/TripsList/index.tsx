"use client"
import Container from "@/commons/components/Container";
import Item from "@/domains/Tickets/features/TicketHome/TripsList/Item";

export default function TripsList() {
    return (
        <section className={'pt-4 w-full'}>
            <Container>
                <section className={"bg-white dark:bg-[var(--dark-gray)] rounded-xl shadow-sm p-4"}>
                    <Item id={1} />
                    {/*<Item id={2} />*/}
                </section>
            </Container>
        </section>
    )
}