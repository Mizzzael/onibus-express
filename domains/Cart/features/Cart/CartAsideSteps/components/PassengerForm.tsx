import {Form} from "@heroui/react";
import {TextField} from "@heroui/react";
import {Label} from "@heroui/react";
import {InputGroup} from "@heroui/react";
import {HiMiniUserCircle} from "react-icons/hi2";
import {FieldError} from "@heroui/react";
import {HiAtSymbol} from "react-icons/hi2";
import DatePickerInput from "@/commons/components/DatePickerInput";
import {HiIdentification} from "react-icons/hi2";
import {MaskInputGroup} from "@/commons/components/MaskInput";
import {useState} from "react";
import type User from "@/domains/User/models/User/user";
import { cpf } from 'cpf-cnpj-validator'
import type {DateValue} from "@heroui/react";
import {useEffect} from "react";
import {useCallback} from "react";
import {Button} from "@heroui/react";
import UserSchema from "@/domains/User/models/User/user.schema";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useRouter} from "next/navigation";
import clsx from "clsx";
import useDarkMode from "@/commons/hooks/useDarkMode";
import useCartStore from "@/domains/Cart/store/Cart/useCartStore";
import useTicketStore from "@/domains/Tickets/store/Ticket/useTicketStore";
import type Trip from "@/domains/Tickets/models/Ticket/trip";

export default function PassengerForm() {
    let minDate = today(getLocalTimeZone());
    minDate = minDate.add({ years: -16 })
    const isDarkMode = useDarkMode();
    const nextStep = useCartStore((state) => state.nextStep);
    const addUser = useCartStore((state) => state.setUser);
    const cart = useTicketStore<Trip[]>(( state ) => state.cart);

    const [ birthday, setBirthday ] = useState<DateValue | null>(null);
    const [ passenger, setPassenger ] = useState<User>({
        dataDeNascimento: "",
        cpf: "",
        email: "",
        nome: ""
    });

    const router = useRouter();

    const isValid = useCallback(() => {
        const validate = UserSchema.safeParse(passenger);
        return validate.success;
    }, [ passenger ])

    const setPassengerValue = useCallback((index: "dataDeNascimento" | "cpf" | "email" | "nome", value: string) => {
        const currentValue = {...passenger}
        if (currentValue[index] !== undefined) {
            currentValue[index] = value;
            setPassenger(currentValue);
        }
    }, [ passenger ]);

    useEffect(() => {
        /* eslint-disable */
        if (!birthday) {
            setPassengerValue("dataDeNascimento", "");
        } else {
            const dataDeNascimento = `${birthday.day.toString(10)}/${birthday.month.toString(10)}/${birthday.year.toString(10)}`
            setPassengerValue("dataDeNascimento", dataDeNascimento);
        }
    }, [ birthday ])

    return (
        <>
            <section className="w-full">
                <header className={"w-full"}>
                    <h3 className={"font-title font-bold text-xl my-0"}>
                        Dados do Passageiro
                    </h3>
                    <small className={'text-xs'}>
                        Digite os dados de quem fara essa viagem.
                    </small>
                </header>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    addUser(passenger)
                    nextStep();
                }} className={"w-full"}>
                    <TextField
                        className={"w-full pt-4"}
                        isRequired
                        value={passenger.nome}
                        onChange={(value: string) => {
                            setPassengerValue("nome", value);
                        }}
                        validate={(value: string) => {
                            if (!value)
                                return `O campo Nome é obrigatório!`
                            return null;
                        }}
                    >
                        <Label>
                            Nome:
                        </Label>
                        <InputGroup className={clsx({
                            "rounded-xl ring-1 text-foreground": true,
                            "ring-gray-200": !isDarkMode,
                            "ring-(--dark-ring-color)": isDarkMode,
                        })}>
                            <InputGroup.Prefix className={"text-foreground"}>
                                <HiMiniUserCircle size={"1.4em"} />
                            </InputGroup.Prefix>
                            <InputGroup.Input className={"text-foreground"} placeholder={"ex: Laufey, Byorn"} />
                        </InputGroup>
                        <FieldError className={"w-full"} />
                    </TextField>
                    <TextField
                        name={"email"}
                        isRequired
                        type={"email"}
                        className={"w-full pt-4"}
                        value={passenger.email}
                        onChange={(value: string) => {
                            setPassengerValue("email", value);
                        }}
                    >
                        <Label>
                            Email:
                        </Label>
                        <InputGroup className={clsx({
                            "rounded-xl ring-1 text-foreground": true,
                            "ring-gray-200": !isDarkMode,
                            "ring-(--dark-ring-color)": isDarkMode,
                        })}>
                            <InputGroup.Prefix className={"text-foreground"}>
                                <HiAtSymbol size={"1.4em"} />
                            </InputGroup.Prefix>
                            <InputGroup.Input className={"text-foreground"} placeholder={"ex: sven.viking@provedor.com"} />
                        </InputGroup>
                        <FieldError className={"w-full"} />
                    </TextField>
                    <TextField
                        isRequired
                        name={"cpf"}
                        className={"w-full pt-4"}
                        value={passenger.cpf}
                        onChange={(value: string) => {
                            setPassengerValue("cpf", value);
                        }}
                        validate={(value: string) => {
                            if (!cpf.isValid(value))
                                return `Este CPF é invalído!`;
                            return null;
                        }}
                    >
                        <Label>
                            CPF:
                        </Label>
                        <InputGroup className={clsx({
                            "rounded-xl ring-1 text-foreground": true,
                            "ring-gray-200": !isDarkMode,
                            "ring-(--dark-ring-color)": isDarkMode,
                        })}>
                            <InputGroup.Prefix className={"text-foreground"}>
                                <HiIdentification size={"1.4em"} />
                            </InputGroup.Prefix>
                            <MaskInputGroup
                                className={"text-foreground"}
                                placeholder={"ex: 668.272.290-76"}
                                mask="000.000.000-00"
                                unmask={true}
                            />
                        </InputGroup>
                        <FieldError className={"w-full"} />
                    </TextField>
                    <DatePickerInput
                        isInvalid={!!birthday && birthday.compare(minDate) >= 0}
                        label={"Aniversário"}
                        classDatePicker={"mt-4 w-full"}
                        classDateFieldGroup={clsx({
                            "rounded-xl ring-1 text-foreground": true,
                            "ring-gray-200": !isDarkMode,
                            "ring-(--dark-ring-color)": isDarkMode,
                        })}
                        granularity={"day"}
                        name={"dataDeNascimento"}
                        value={birthday || undefined}
                        minDate={minDate}
                        onChange={(value) => {
                            setBirthday(value);
                        }}
                        validate={(value) => {
                            if (!value) {
                                return "A data de nascimento é obrigatória!"
                            }
                        }}
                    />
                    <footer className={'py-4'}>
                        <Button size={"lg"} type={"submit"} isDisabled={!isValid() || !cart.length} className={"w-full bg-success text-white uppercase mb-4 rounded-xl"}>
                            Seguinte
                        </Button>
                        <Button onPress={() => {
                            router.push("/");
                        }} size={"sm"} className={clsx({
                            "w-full bg-transparent rounded-xl ring-1 text-gray-300 uppercase": true,
                            "ring-gray-200": !isDarkMode,
                            "ring-(--dark-ring-color)": isDarkMode,
                        })} variant={"ghost"}>
                            Voltar
                        </Button>
                    </footer>
                </Form>
            </section>
        </>
    )
}