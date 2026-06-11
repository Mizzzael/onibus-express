import {z} from "zod";

export const RouteSchema = z.object({
    destino: z.string(),
    duracaoEstimada: z.string(),
    id: z.number(),
    origem: z.string(),
})

export default RouteSchema;