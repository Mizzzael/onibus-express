'use client'
import type {TTicketState} from "@/domains/Tickets/store/Ticket/store";
import {useContext} from "react";
import ContextStoreTicket from "@/domains/Tickets/store/Ticket/context";
import {useStore} from "zustand";

export default function useTicketStore<T>(selecter: (state: TTicketState) => T) {
    const store = useContext(ContextStoreTicket);
    if (!store)
        throw new Error("useTicketStore must be used within TicketStore");
    return useStore(store, selecter);
}