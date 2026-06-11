import {z} from "zod";
import RouteSchema from "@/domains/Tickets/models/Ticket/route.schema";

export const TripSchema = z.object({
    "id": z.number(),
    "dataHoraPartida": z.string(),
    "precoBase": z.number(),
    "assentosDisponiveis": z.number(),
    "route": RouteSchema,
});