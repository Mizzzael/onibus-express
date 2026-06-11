"use client"
import type Trip from "@/domains/Tickets/models/Ticket/trip";

export default function DurationItem({ route: { duracaoEstimada } }: Trip) {
    return (
        <div>
            <header>
                <p className={'text-sm'}>
                    Duração
                </p>
            </header>
            <section>
                <p className={"font-bold text-2xl font-title"}>
                    { duracaoEstimada }
                </p>
            </section>
        </div>
    )
}