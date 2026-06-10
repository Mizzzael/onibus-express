"use client"
import clsx from "clsx";
import useDarkMode from "@/commons/hooks/useDarkMode";
import useCartStore from "@/domains/Cart/store/Cart/useCartStore";
import calcAgeByString from "@/commons/helpers/calcAgeByString";
import useTicketStore from "@/domains/Tickets/store/Ticket/useTicketStore";
import formatPrice from "@/commons/helpers/formatPrice";
import {useCallback} from "react";
import {Button} from "@heroui/react";
import {useState} from "react";

export default function ConfirmTicket() {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const isDarkMode = useDarkMode()
    const name = useCartStore<string|undefined>((state) => state.user?.nome)
    const email = useCartStore<string|undefined>((state) => state.user?.email)
    const cpf = useCartStore<string|undefined>((state) => state.user?.cpf)
    const birthdate = useCartStore<string|undefined>((state) => state.user?.dataDeNascimento)
    const tickets = useTicketStore((state) => state.cart)
    const backSteps = useCartStore((state) => state.prevStep)
    const nextSteps = useCartStore((state) => state.nextStep)

    const totalPrice = useCallback((): number => {
        if (!tickets || !tickets.length)
            return 100
        return 300
    }, [ tickets ])

    return (
        <>
            <section className="w-full">
                <header className={"w-full pb-4"}>
                    <h4 className={"font-title font-bold text-xl my-0"}>
                        Confirme seu pedido.
                    </h4>
                </header>
                <section className={"w-full pb-4"}>
                    <div className={clsx({
                        'ring-1 w-full rounded-xl p-4': true,
                        'ring-gray-200': !isDarkMode,
                        'ring-(--dark-ring-color)': isDarkMode,
                    })}>
                        <div className="w-full">
                            <h5 className={'font-title font-bold text-xl my-0 pb-4'}>
                                Passageiro:
                            </h5>
                        </div>
                        <div className={'grid grid-cols-2 gap-2 items-center pt-2 pb-4'}>
                            <div>
                                <p className={clsx({
                                    "text-sm font-bold": true,
                                    "text-gray-300": !isDarkMode,
                                    "text-(--dark-ring-color)": isDarkMode,
                                })}>
                                    Nome
                                </p>
                            </div>
                            <div>
                                <p className={clsx({
                                    "text-sm text-right": true,
                                })}>
                                    { name }
                                </p>
                            </div>
                        </div>
                        <div className={'grid grid-cols-2 gap-2 items-center pt-2 pb-4'}>
                            <div>
                                <p className={clsx({
                                    "text-sm font-bold": true,
                                    "text-gray-300": !isDarkMode,
                                    "text-(--dark-ring-color)": isDarkMode,
                                })}>
                                    E-mail
                                </p>
                            </div>
                            <div>
                                <p className={clsx({
                                    "text-sm text-right": true,
                                })}>
                                    { email }
                                </p>
                            </div>
                        </div>
                        <div className={'grid grid-cols-2 gap-2 items-center pt-2 pb-4'}>
                            <div>
                                <p className={clsx({
                                    "text-sm font-bold": true,
                                    "text-gray-300": !isDarkMode,
                                    "text-(--dark-ring-color)": isDarkMode,
                                })}>
                                    CPF
                                </p>
                            </div>
                            <div>
                                <p className={clsx({
                                    "text-sm text-right": true,
                                })}>
                                    { cpf }
                                </p>
                            </div>
                        </div>
                        <div className={'grid grid-cols-2 gap-2 items-center pt-2 pb-4'}>
                            <div>
                                <p className={clsx({
                                    "text-sm font-bold": true,
                                    "text-gray-300": !isDarkMode,
                                    "text-(--dark-ring-color)": isDarkMode,
                                })}>
                                    Idade
                                </p>
                            </div>
                            <div>
                                <p className={clsx({
                                    "text-sm text-right": true,
                                    "text-green-300": birthdate && calcAgeByString(birthdate) >= 16,
                                    "text-red-300": !birthdate || calcAgeByString(birthdate) < 16,
                                })}>
                                    { birthdate && calcAgeByString(birthdate) } anos
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full pb-4">
                    <small className={"text-right block text-sm text-success"}>
                        por apenas
                    </small>
                    <p className={clsx({
                        "text-4xl font-bold font-title text-right text-success": true
                    })}>
                        { formatPrice(totalPrice()) }
                    </p>
                </section>
                <footer className={"w-full pb-4"}>
                    <Button
                        onPress={() => {
                            nextSteps?.()
                        }}
                        className={'w-full uppercase bg-success text-white rounded-xl mb-2'}
                        isPending={isLoading}
                    >
                        Confirmar
                    </Button>
                    <Button
                        size={'sm'}
                        className={clsx({
                            'w-full uppercase ring-1 bg-transparent  rounded-xl mb-4 text-xs': true,
                            "text-(--dark-ring-color) ring-(--dark-ring-color)": isDarkMode,
                            "text-gray-400 ring-gray-200": !isDarkMode,
                        })}
                        onPress={() => {
                            backSteps?.();
                        }}
                        isPending={isLoading}
                    >
                        Voltar
                    </Button>
                </footer>
            </section>
        </>
    )
}