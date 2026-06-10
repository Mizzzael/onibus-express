"use client"
import ProviderStoreTicket from "@/domains/Tickets/store/Ticket/provider";
import Container from "@/commons/components/Container";
import CartAsideSteps from "@/domains/Cart/features/Cart/CartAsideSteps";
import CartListItems from "@/domains/Cart/features/Cart/CartListItems";

export default function Cart() {
    return (
        <ProviderStoreTicket>
            <Container>
                <section className={"w-full flex md:flex-nowrap flex-wrap gap-2 md:flex-row-reverse"}>
                    <aside className={"md:w-1/3 w-full py-4"}>
                        <CartAsideSteps />
                    </aside>
                    <div className={"md:w-2/3 w-full py-4"}>
                        <CartListItems />
                    </div>
                </section>
            </Container>
        </ProviderStoreTicket>
    )
}