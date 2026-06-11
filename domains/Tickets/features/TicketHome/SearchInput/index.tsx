"use client"
import Container from "@/commons/components/Container";
import type {TimeValue} from "@heroui/react";
import ThemeSwitch from "@/commons/components/ThemeSwitch";
import {Button} from "@heroui/react";
import {HiMagnifyingGlass} from "react-icons/hi2";
import logo from "@/assets/images/logo.svg"
import Image from "next/image";
import {Checkbox} from "@heroui/react";
import {Label} from "@heroui/react";
import {useState} from "react";
import {DatePicker} from "@heroui/react";
import {DateField} from "@heroui/react";
import {Calendar} from "@heroui/react";
import {InputGroup} from "@heroui/react";
import {TimeField} from "@heroui/react";
import {TextField} from "@heroui/react";
import useDarkMode from "@/commons/hooks/useDarkMode";
import clsx from "clsx";
import {HiMapPin} from "react-icons/hi2";
import type {TTripsFilters} from "@/domains/Tickets/hooks/API/useGetTrips";
import {useCallback} from "react";
import {HiMiniTrash} from "react-icons/hi2";
import DatePickerInput from "@/commons/components/DatePickerInput";
import type {DateValue} from "@heroui/react";
import {Chip} from "@heroui/react";
import formatDate from "@/commons/helpers/formatDate";

type SearchInputProps = {
    filters: TTripsFilters;
    onChange?: (filters: TTripsFilters) => void;
}

export default function SearchInput({ filters, onChange }: SearchInputProps) {
    const isDarkMode = useDarkMode();
    const [ origin, setOrigin ] = useState<string | null>(null)
    const [ destiny, setDestiny ] = useState<string | null>(null)
    const [ timeForTravel, setTimeForTravel ] = useState<DateValue | null>(null)

    const resetFilters = () => {
        onChange?.({
            page: 1,
            size: 20,
            origem: undefined,
            destino: undefined,
            dataHoraPartida: undefined,
        })
    }

    const sendFilters = useCallback(() => {
        onChange?.({
            ...filters,
            page: 1,
            origem: origin || filters.origem || undefined,
            destino: destiny || filters.destino || undefined,
            dataHoraPartida: timeForTravel || undefined,
        })
    }, [ filters, origin, destiny, onChange, timeForTravel ])

    return (
        <section className="w-full">
            <Container>
                <Image className={"mx-auto max-w-50"} alt={'Onibus'} src={logo}/>
                <section className={clsx({
                    'rounded-xl shadow-xs p-4 mx-auto': true,
                    'bg-white': !isDarkMode,
                    'bg-(--dark-gray)': isDarkMode,
                })}>
                    <section className={'w-full grid md:grid-cols-[1fr_1fr_1fr] grid-cols-[1fr] gap-3 items-center justify-end'}>
                        <div>
                            <TextField
                                value={origin || undefined}
                                onChange={(value) => {
                                    setOrigin(value);
                                }}
                            >
                                <Label>Origem:</Label>
                                <InputGroup
                                    className={clsx({
                                        "rounded-xl ring-1": true,
                                        "ring-gray-200": !isDarkMode,
                                        "ring-(--dark-ring-color)": isDarkMode,
                                    })}
                                >
                                    <InputGroup.Prefix
                                        className={clsx({
                                            "text-black": !isDarkMode,
                                            "text-white": isDarkMode,
                                        })}
                                    >
                                        <HiMapPin size={'1.4em'} />
                                    </InputGroup.Prefix>
                                    <InputGroup.Input className={'w-full bg-transparent'} placeholder={filters.origem || 'Origem'} />
                                </InputGroup>
                            </TextField>
                        </div>
                        <TextField
                            value={destiny || undefined}
                            onChange={(value) => {
                                setDestiny(value);
                            }}
                        >
                            <Label>Destino:</Label>
                            <InputGroup className={clsx({
                                "rounded-xl ring-1": true,
                                "ring-gray-200": !isDarkMode,
                                "ring-(--dark-ring-color)": isDarkMode,
                            })}>
                                <InputGroup.Prefix className={clsx({
                                    "text-black": !isDarkMode,
                                    "text-white": isDarkMode,
                                })}>
                                    <HiMapPin size={'1.4em'} />
                                </InputGroup.Prefix>
                                <InputGroup.Input className={'w-full bg-transparent'} placeholder={filters.destino || 'Destino'} />
                            </InputGroup>
                        </TextField>
                        <div className={"grid grid-cols-[1fr] gap-3 items-center"}>
                            <DatePickerInput
                                label={"Data de ida:"}
                                granularity={'minute'}
                                classDateFieldGroup={clsx({
                                    "rounded-xl ring-1": true,
                                    "ring-gray-200": !isDarkMode,
                                    "ring-(--dark-ring-color)": isDarkMode,
                                })}
                                value={timeForTravel || undefined}
                                onChange={(value) => {
                                    setTimeForTravel(value);
                                }}
                                placeholder={filters.dataHoraPartida}
                            />
                        </div>
                    </section>
                    <section className={"grid grid-cols-1 items-center pt-4 gap-3"}>
                        <div className={"flex items-center justify-end gap-3"}>
                            {(filters.destino || filters.origem || filters.dataHoraPartida) && (
                                <Button isIconOnly variant={"danger"} onPress={() => {
                                    resetFilters();
                                }}>
                                    <HiMiniTrash />
                                </Button>
                            )}
                            <Button
                                isIconOnly
                                variant={"ghost"}
                                size={"sm"}
                                className={'ring ring-success my-0'}
                                onClick={() => {
                                    sendFilters();
                                }}
                            >
                                <HiMagnifyingGlass className="text-success" />
                            </Button>
                        </div>
                    </section>
                </section>
                <footer className={"mx-auto mt-2 flex justify-end gap-3 flex-wrap items-center"}>
                    {
                        filters.origem && (
                            <Chip variant={'soft'}>
                                Origem: { filters.origem }
                            </Chip>
                        )
                    }

                    {
                        filters.destino && (
                            <Chip variant={'soft'}>
                                Destino: { filters.destino }
                            </Chip>
                        )
                    }

                    {
                        filters.dataHoraPartida && (
                            <Chip variant={'soft'}>
                                Data de ida: { formatDate(filters.dataHoraPartida.toString()) }
                            </Chip>
                        )
                    }

                    <ThemeSwitch />
                </footer>
            </Container>
        </section>
    )
}