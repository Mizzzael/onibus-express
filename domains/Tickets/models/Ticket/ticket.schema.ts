import {z} from "zod";

export const TicketSchema = z.object({
    id: z.number().int(),
    viagemId: z.number().int(),
    passageiroId: z.number().int(),
    numeroAssento: z.string(),
    status: z.string(),
    codigoReserva: z.string()
});