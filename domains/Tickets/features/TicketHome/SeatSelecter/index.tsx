'use client'
import {Modal} from "@heroui/react";
import Container from "@/commons/components/Container";
import {HiOutlineArrowsRightLeft} from "react-icons/hi2";
import PriceItem from "@/domains/Tickets/features/TicketHome/TripsList/Item/components/PriceItem";
import {HiMapPin} from "react-icons/hi2";
import {HiOutlineTicket} from "react-icons/hi2";
import BusOptions from "@/domains/Tickets/features/TicketHome/SeatSelecter/components/BusOptions";
import {Button} from "@heroui/react";
import {HiXMark} from "react-icons/hi2";
import {useState} from "react";
import useTicketStore from "@/domains/Tickets/store/Ticket/useTicketStore";
import type Ticket from "@/domains/Tickets/models/Ticket/ticket";
import {useEffect} from "react";
import {useCallback} from "react";
import {useRouter} from "next/navigation";
import useDarkMode from "@/commons/hooks/useDarkMode";
import clsx from "clsx";
import type Trip from "@/domains/Tickets/models/Ticket/trip";

export type TSeatSelecterProps = {
    isOpen: boolean;
    close: () => void;
    trip: Trip;
}

export default function SeatSelecter({ isOpen, close, trip }: TSeatSelecterProps) {
    const [ seatSelected, setSeatSelected ] = useState<string|null>(null);
    const cart = useTicketStore((state) => state.cart);
    const addSeat = useTicketStore((state) => state.addSeat)
    const seat = useTicketStore((state) => state.seat);
    const add = useTicketStore((state) => state.addItemIntoCart);
    const router = useRouter();
    const isDarkMode = useDarkMode();

    const addIntoCart = useCallback(() => {
        if (!seatSelected) {
            return;
        }

        add(trip);
        addSeat(seatSelected);
    }, [ seatSelected, trip]);

    const startComponent = useCallback(() => {
        if (cart && cart.length) {
            const items = cart.filter(({ id: _id }) => trip.id === _id );
            if (items.length && seat) {
                /* eslint-disable */
                setSeatSelected(seat);
            }
        }
    }, [ cart, trip ])

    useEffect(() => {
        if (isOpen) startComponent();
    }, [isOpen])

    return (
        <Modal.Backdrop isOpen={isOpen} variant={"transparent"}>
            <Modal.Container size={"full"} className={"bg-white/10 backdrop-blur"}>
                <Modal.Dialog className={"w-full bg-transparent p-0"}>
                    <Modal.Body className={"bg-transparent p-0"}>
                        <Container>
                            <section className="w-full mx-auto max-w-xl min-h-[95vh] flex items-center justify-center">
                                <div className={clsx({
                                    "w-full max-h-[95vh] rounded-lg": true,
                                    "bg-white": !isDarkMode,
                                    "bg-(--dark-gray)": isDarkMode,
                                })}>
                                    <section className={
                                        clsx({
                                            "w-full grid md:grid-cols-[1fr_1fr] ring-1 rounded-xl": true,
                                            "ring-gray-100": !isDarkMode,
                                            "ring-(--dark-ring-color)": isDarkMode,
                                        })
                                    }>
                                        <div className={clsx({
                                            "ring-1 rounded-xl": true,
                                            "ring-gray-200": !isDarkMode,
                                            "ring-(--dark-ring-color)": isDarkMode,
                                        })}>
                                            <BusOptions
                                                onChange={setSeatSelected}
                                                value={seatSelected || undefined}
                                            />
                                        </div>
                                        <aside>
                                            <div className="px-4 pt-4 text-danger grid grid-cols-2 gap-2 items-center">
                                                <div>
                                                    <HiOutlineTicket size={"2em"} />
                                                </div>
                                                <div className={"flex justify-end"}>
                                                    <Button
                                                        onPress={() => {
                                                            setSeatSelected(null);
                                                            close();
                                                        }}
                                                        size={"sm"}
                                                        variant={"outline"}
                                                        className={clsx({
                                                            "text-foreground ring-foreground border-foreground": !isDarkMode,
                                                            "text-(--dark-ring-color) ring-(--dark-ring-color) border-(--dark-ring-color)": isDarkMode,
                                                        })}
                                                        isIconOnly
                                                    >
                                                        <HiXMark size={"2em"} />
                                                    </Button>
                                                </div>
                                            </div>
                                            <header className={"p-4 grid grid-cols-[2fr_1fr_2fr] justify-start gap-2"}>
                                                <div>
                                                    <p className={"text-md text-foreground font-bold"}>
                                                        <span className={"text-xs font-light flex items-center gap-1 block"}>
                                                            <HiMapPin size={"1em"} /> Origem
                                                        </span>
                                                        { trip.route.origem }
                                                    </p>
                                                </div>
                                                <div className={"flex items-center justify-end"}>
                                                    <HiOutlineArrowsRightLeft size={"1.5em"} />
                                                </div>
                                                <div>
                                                    <p className={"text-md text-success font-bold text-right"}>
                                                        <span className={"text-xs font-light flex items-center gap-1 justify-end block"}>
                                                            <HiMapPin size={"1em"} /> Destino
                                                        </span>
                                                        { trip.route.destino }
                                                    </p>
                                                </div>
                                            </header>
                                            <section className="px-4">
                                                <p className={"text-md text-primary text-success"}>
                                                    <b className={"text-foreground"}>Duração:</b> { trip.route.duracaoEstimada }
                                                </p>
                                            </section>
                                            {(seatSelected) && (
                                                <>
                                                    <section className="px-4">
                                                        <p className={"text-md text-primary text-success"}>
                                                            <b className={"text-foreground"}>Cadeira:</b> { seatSelected }
                                                        </p>
                                                    </section>
                                                </>
                                            ) || null}
                                            <section className={"p-4"}>
                                                <PriceItem
                                                    price={trip.precoBase}
                                                    onPress={() => {
                                                        addIntoCart();
                                                        close();
                                                        router.push("/cart");
                                                    }}
                                                    isDisabled={!seatSelected}
                                                />
                                                <section className="px-4">
                                                    <p className={"text-xs text-primary text-center"}>
                                                        <b>{ trip.assentosDisponiveis }</b> ascento restantes
                                                    </p>
                                                </section>
                                            </section>
                                        </aside>
                                    </section>
                                </div>
                            </section>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer />
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    )
}