"use client"
import type Ticket from "@/domains/Tickets/models/Ticket/ticket";
import {createStore} from "zustand/vanilla";

export type TTicketState = {
    cart: Ticket[]
    addItemIntoCart: (item: Ticket) => void,
    clearCart: () => void,
}

export type TicketStore = ReturnType<typeof createTicketStore>

const createTicketStore = () =>
    createStore<TTicketState>()((set) => ({
        cart: [],
        addItemIntoCart: (item: Ticket) => set((state) => {
            const cart: Ticket[] = state.cart;
            const trips: number[] = cart.map(({ viagemId }) => viagemId)
            if (trips.includes(item.viagemId)) {

                return {cart: cart.map((currentItem) => {
                    if (currentItem.viagemId === item.viagemId) {
                        return item;
                    }
                    return currentItem;
                })}
            }

            return {cart: [...cart, item]}
        }),
        clearCart: () => set({ cart: [] }),
    }))

export default createTicketStore;