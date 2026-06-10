import clsx from "clsx";
import {useState, useEffect} from "react";
import useDarkMode from "@/commons/hooks/useDarkMode";

export type TBusOptionsProps = {
    onChange?: (value: string) => void;
    value?: string;
}

export default function BusOptions({ onChange, value }: TBusOptionsProps) {
    const [ selectedSeat, setSelectedSeat ] = useState<string|null>(null)
    const isDarkMode = useDarkMode();

    const occupedSeats = [
        "C-04",
        "B-03",
        "B-05",
        "A-01",
        "B-01"
    ]
    const CreateSeats = (section: string) => {
        const seats: React.ReactElement[] = [];
        for (let i: number = 0; i < 6; i++) {
            const id = `${section}-${i < 10? `0${i + 1}` : i}`;
            seats.push(
                <div
                    role={`button`}
                    id={id}
                    className={clsx({
                        'w-[16px] h-[16px] rounded-sm mb-4': true,
                        "cursor-pointer": !occupedSeats.includes(id),
                        "bg-success/60 hover:bg-success/90": (selectedSeat || value) != id && !occupedSeats.includes(id),
                        "bg-danger cursor-not-allowed": occupedSeats.includes(id),
                        "bg-blue-500 shadow-sm shadow-success hover: shadow-mg": (selectedSeat || value) == id,
                    })}
                    key={`${section}${i}`}
                    onClick={() => {
                        if (occupedSeats.includes(id)) return;
                        setSelectedSeat(id);
                    }}
                />
            )
        }

        return seats;
    }

    useEffect(() => {
        if (selectedSeat) {
            onChange?.(selectedSeat);
        }
    }, [ selectedSeat ]);

    return (
        <div className={"py-4 flex items-center justify-center"}>
            <section className={clsx({
                "w-[210px] ring ring-1 rounded-lg": true,
                "ring-gray-300": !isDarkMode,
                "ring-(--dark-ring-color)": isDarkMode,
            })}>
                <header className={"w-full px-4 py-4"}>
                    <div className={"w-6 h-6 rounded-full bg-gray-300"} />
                </header>
                <div className={"w-full items-center px-2 grid grid-cols-[2fr_1fr_2fr] gap-2 pb-6"}>
                    <div className={"grid grid-cols-2 gap-2"}>
                        <div className={"text-center"}>
                            <header className={"pb-2 pt-2"}>
                                <p className={"text-center text-md font-title font-bold text-gray-400"}>
                                    A
                                </p>
                            </header>
                            <section className={'w-full flex flex-wrap justify-center'}>
                                {
                                    CreateSeats("A")
                                }
                            </section>
                        </div>
                        <div className={"text-center"}>
                            <header className={"pb-2 pt-2"}>
                                <p className={"text-center text-md font-title font-bold text-gray-400"}>
                                    B
                                </p>
                            </header>
                            <section className={'w-full flex flex-wrap justify-center'}>
                                {
                                    CreateSeats("B")
                                }
                            </section>
                        </div>
                    </div>
                    <div className={'text-center flex justify-center bg-gray-100 dark:bg-gray-900 py-2 rounded-lg'}>
                        <div className={"h-[120px] w-[1px] bg-gray-200"} />
                    </div>
                    <div className={"grid grid-cols-2 gap-2"}>
                        <div className={"text-center"}>
                            <header className={"pb-2 pt-2"}>
                                <p className={"text-center text-md font-title font-bold text-gray-400"}>
                                    C
                                </p>
                            </header>
                            <section className={'w-full flex flex-wrap justify-center'}>
                                {
                                    CreateSeats("C")
                                }
                            </section>
                        </div>
                        <div className={"text-center"}>
                            <header className={"pb-2 pt-2"}>
                                <p className={"text-center text-md font-title font-bold text-gray-400"}>
                                    D
                                </p>
                            </header>
                            <section className={'w-full flex flex-wrap justify-center'}>
                                {
                                    CreateSeats("D")
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}