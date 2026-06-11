import CartTickerItems from "@/domains/Cart/features/Cart/CartListItems/components/CartTickerItems";
import useTicketStore from "@/domains/Tickets/store/Ticket/useTicketStore";
import type Trip from "@/domains/Tickets/models/Ticket/trip";

export default function CartListItems() {
    const cart = useTicketStore<Trip[]>((state) => state.cart)
    const seat = useTicketStore<string|undefined>((state) => state.seat)

    return (
        <section className="w-full">
            <CartTickerItems seat={seat} cart={cart} />
        </section>
    )
}