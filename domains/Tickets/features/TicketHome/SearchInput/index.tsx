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
import {HiMap} from "react-icons/hi2";
import {TimeField} from "@heroui/react";
import {TextField} from "@heroui/react";
import useDarkMode from "@/commons/hooks/useDarkMode";
import clsx from "clsx";

export default function SearchInput() {
    const [ onlyOrigin, setOnlyOrigin ] = useState<boolean>(false)
    const isDarkMode = useDarkMode();

    return (
        <section className="w-full">
            <Container>
                <Image className={"mx-auto max-w-50"} alt={'Onibus'} src={logo}/>
                <section className={clsx({
                    //(--dark-ring-color)
                    'rounded-xl shadow-xs p-4 mx-auto': true,
                    'bg-white': !isDarkMode,
                    'bg-(--dark-gray)': isDarkMode,
                })}>
                    <section className={'w-full grid md:grid-cols-[1fr_1fr_1fr] grid-cols-[1fr] gap-3 items-center justify-end'}>
                        <TextField>
                            <Label>Origem:</Label>
                            <InputGroup className={clsx({
                                "rounded-xl ring-1": true,
                                "ring-gray-200": !isDarkMode,
                                "ring-(--dark-ring-color)": isDarkMode,
                            })}>
                                <InputGroup.Prefix>
                                    <HiMap size={'1.4em'} />
                                </InputGroup.Prefix>
                                <InputGroup.Input className={'w-full bg-transparent'} placeholder={'Origem'} />
                            </InputGroup>
                        </TextField>
                        <TextField>
                            <Label>Destino:</Label>
                            <InputGroup className={clsx({
                                "rounded-xl ring-1": true,
                                "ring-gray-200": !isDarkMode,
                                "ring-(--dark-ring-color)": isDarkMode,
                            })}>
                                <InputGroup.Prefix>
                                    <HiMap size={'1.4em'} />
                                </InputGroup.Prefix>
                                <InputGroup.Input disabled={onlyOrigin} className={'w-full bg-transparent'} placeholder={'Destino'} />
                            </InputGroup>
                        </TextField>
                        <div className={"grid grid-cols-[1fr] gap-3 items-center"}>
                            <DatePicker aria-label={"Data de ida"} granularity={"minute"} className="w-full" name="date">
                                {({ state }) => (
                                    <>
                                        <Label>Data de ida:</Label>
                                        <DateField.Group className={clsx({
                                            "rounded-xl ring-1": true,
                                            "ring-gray-200": !isDarkMode,
                                            "ring-(--dark-ring-color)": isDarkMode,
                                        })} fullWidth>
                                            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                            <DateField.Suffix>
                                                <DatePicker.Trigger>
                                                    <DatePicker.TriggerIndicator />
                                                </DatePicker.Trigger>
                                            </DateField.Suffix>
                                        </DateField.Group>
                                        <DatePicker.Popover>
                                            <Calendar aria-label="Event date">
                                                <Calendar.Header>
                                                    <Calendar.YearPickerTrigger>
                                                        <Calendar.YearPickerTriggerHeading />
                                                        <Calendar.YearPickerTriggerIndicator />
                                                    </Calendar.YearPickerTrigger>
                                                    <Calendar.NavButton slot="previous" />
                                                    <Calendar.NavButton slot="next" />
                                                </Calendar.Header>
                                                <Calendar.Grid>
                                                    <Calendar.GridHeader>
                                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                    </Calendar.GridHeader>
                                                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                                </Calendar.Grid>
                                                <Calendar.YearPickerGrid>
                                                    <Calendar.YearPickerGridBody>
                                                        {({year}) => <Calendar.YearPickerCell year={year} />}
                                                    </Calendar.YearPickerGridBody>
                                                </Calendar.YearPickerGrid>
                                            </Calendar>
                                            <div className="flex items-center justify-between">
                                                <Label>Time</Label>
                                                <TimeField
                                                    aria-label="Time"
                                                    granularity={"minute"}
                                                    hideTimeZone={true}
                                                    name="time"
                                                    onChange={(v) => state.setTimeValue(v as TimeValue)}
                                                    value={state.timeValue}
                                                >
                                                    <TimeField.Group variant="secondary">
                                                        <TimeField.Input>
                                                            {(segment) => <TimeField.Segment segment={segment} />}
                                                        </TimeField.Input>
                                                    </TimeField.Group>
                                                </TimeField>
                                            </div>
                                        </DatePicker.Popover>
                                    </>
                                )}
                            </DatePicker>
                        </div>
                    </section>
                    <section className={"grid grid-cols-1 items-center pt-4 gap-3"}>
                        <div className={"flex items-center justify-end gap-3"}>
                            <Checkbox className={"gap-1"} id="only-origin" onPress={() => setOnlyOrigin(!onlyOrigin)}>
                                <Checkbox.Control>
                                    <Checkbox.Indicator />
                                </Checkbox.Control>
                                <Checkbox.Content>
                                    <Label htmlFor="only-origin">Somente ida?</Label>
                                </Checkbox.Content>
                            </Checkbox>
                            <Button
                                isIconOnly
                                variant={"ghost"}
                                size={"sm"}
                                className={'ring ring-success my-0'}
                            >
                                <HiMagnifyingGlass className="text-success" />
                            </Button>
                        </div>
                    </section>
                </section>
                <footer className={"mx-auto mt-2 flex justify-end"}>
                    <ThemeSwitch />
                </footer>
            </Container>
        </section>
    )
}