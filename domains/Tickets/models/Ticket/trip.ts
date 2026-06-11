import type {TripSchema} from "@/domains/Tickets/models/Ticket/trip.schema";
import {z} from "zod";

type Trip = z.infer<typeof TripSchema>

export default Trip;