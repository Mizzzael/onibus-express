import {z} from "zod";
import type {TicketSchema} from "@/domains/Tickets/models/Ticket/ticket.schema";

type Ticket = z.infer<typeof TicketSchema>

export default Ticket;