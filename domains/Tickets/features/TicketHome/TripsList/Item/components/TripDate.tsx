import type Trip from "@/domains/Tickets/models/Ticket/trip";
import formatDate from "@/commons/helpers/formatDate";

export default function TripDate({ trip }: { trip: Trip }) {
    return (
        <>
            <small className={"text-sm block"}>
                Data da viagem
            </small>
            <p className={"text-lg font-bold"}>
            { formatDate( trip.dataHoraPartida ) }
            </p>
        </>
    )
}