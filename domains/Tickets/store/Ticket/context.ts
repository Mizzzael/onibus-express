"use client"

import {createContext} from "react";
import type {TicketStore} from "@/domains/Tickets/store/Ticket/store";

const ContextStoreTicket = createContext<TicketStore | null>(null)

export default ContextStoreTicket;