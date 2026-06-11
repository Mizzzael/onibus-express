"use client"

import {createStore} from "zustand/vanilla";
import type Trip from "@/domains/Tickets/models/Ticket/trip";
import {persist} from "zustand/middleware";

export type TTicketState = {
    cart: Trip[],
    seat?: string,
    addItemIntoCart: (item: Trip) => void,
    clearCart: () => void,
    addSeat: (seat: string) => void,
}

export type TicketStore = ReturnType<typeof createTicketStore>

const createTicketStore = () =>
    createStore<TTicketState>()(
        persist(
            (set) => ({
                cart: [],
                addItemIntoCart: (item: Trip) => set((state) => {
                    return {cart: [...state.cart, item]}
                }),
                clearCart: () => set({ cart: [], seat: undefined }),
                addSeat: (seat: string) => set({ seat }),
            }),
            {
                name: 'ticket-storage',
                partialize: (state) => ({
                    cart: state.cart,
                    seat: state.seat
                })
            }
        )
    )

export default createTicketStore;