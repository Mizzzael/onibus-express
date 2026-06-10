"use client"
import LocationItem from "@/domains/Tickets/features/TicketHome/TripsList/Item/components/LocationItem";
import {HiOutlineArrowsRightLeft} from "react-icons/hi2";
import DurationItem from "@/domains/Tickets/features/TicketHome/TripsList/Item/components/DurationItem";
import PriceItem from "@/domains/Tickets/features/TicketHome/TripsList/Item/components/PriceItem";
import SeatSelecter from "@/domains/Tickets/features/TicketHome/SeatSelecter";
import {useState} from "react";
import useDarkMode from "@/commons/hooks/useDarkMode";
import clsx from "clsx";

export type TItemProps = {
    id: number;
}

export default function Item({ id }: TItemProps)
{
    const [ selectTheSeat, setSelectTheSeat ] = useState<boolean>(false)
    const isDarkMode = useDarkMode();

    const handleSelectTheSeat = () =>{
        setSelectTheSeat(true)
    }

    const handleUnselectTheSeat = () =>{
        setSelectTheSeat(false)
    }

    return (
        <>
            <section className={clsx({
                'mb-4 p-4 w-full ring-1 rounded-xl': true,
                'ring-gray-200': !isDarkMode,
                'ring-(--dark-ring-color)': isDarkMode,
            })}>
                <section className={"grid md:grid-cols-[1fr_4fr_auto] grid-cols-1 gap-4 items-center w-full"}>
                    <div className={"md:block"}>
                        <DurationItem />
                    </div>
                    <section className={"grid md:grid-cols-3 grid-cols-[1fr_auto_1fr] items-center gap-3"}>
                        <div><LocationItem topTag={"Origem"} cityName={"São Paulo"} /></div>
                        <div className={"flex md:justify-between justify-center"}>
                            <HiOutlineArrowsRightLeft size={"2em"} />
                        </div>
                        <div className={'md:text-left text-right'}><LocationItem topTag={"Destino"} cityName={"Salvador"} /></div>
                    </section>
                    <div className={"md:block"}>
                        <PriceItem onPress={handleSelectTheSeat} />
                    </div>
                </section>
            </section>
            <SeatSelecter
                id={id}
                isOpen={selectTheSeat}
                close={handleUnselectTheSeat}
            />
        </>
    )
}