"use client"
import ContextStoreTicket from "@/domains/Tickets/store/Ticket/context";
import type TChildren from "@/commons/components/types/TChildren";
import {useRef} from "react";
import type {TicketStore} from "@/domains/Tickets/store/Ticket/store";
import createTicketStore from "@/domains/Tickets/store/Ticket/store";
import {useEffect} from "react";
import {useState} from "react";
import LoadingBus from "@/commons/components/LoadingBus";

export default function     ProviderStoreTicket({ children }: TChildren<unknown>) {
    const storeRef = useRef<TicketStore | null>(null)
    const [ value, setValue ] = useState<TicketStore | null>(null)

    useEffect(() => {
        if (!storeRef.current) {
            storeRef.current = createTicketStore();
            setValue(storeRef.current);
        }
    }, [storeRef])

    return (
        <>
            {value && (
                <ContextStoreTicket.Provider value={value}>
                    {children}
                </ContextStoreTicket.Provider>
            ) || <LoadingBus />}
        </>
    )
}