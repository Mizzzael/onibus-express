import Container from "@/commons/components/Container";
import clsx from "clsx";
import useDarkMode from "@/commons/hooks/useDarkMode";
import {Button} from "@heroui/react";
import {HiOutlineTrash} from "react-icons/hi2";

export default function CartTickerItems({}) {
    const isDarkMode = useDarkMode()
    return (
        <div className={'w-full mb-4'}>
            <Container>
                <section className={clsx({
                    "w-full rounded-xl ring-1 p-4": true,
                    "ring-gray-300 bg-white": !isDarkMode,
                })}>
                    <header className="w-full pb-4">
                        <h2 className={clsx({
                            "font-bold font-title text-xl": true,
                        })}>
                            Dados da viagem
                        </h2>
                    </header>
                    <section className="py-4">
                        <section className="grid grid-cols-[auto_1fr] gap-2 border-b border-gray-200 pb-6">
                            <div>
                                <p className="text-lg text-light">
                                    Origem
                                </p>
                            </div>
                            <div>
                                <p className="text-lg font-title font-bold text-right">
                                    São Paulo
                                </p>
                            </div>
                        </section>
                        <section className="grid grid-cols-[auto_1fr] gap-2 border-b border-gray-200 py-6">
                            <div>
                                <p className="text-lg text-light">
                                    Destino
                                </p>
                            </div>
                            <div>
                                <p className="text-lg font-title font-bold text-right">
                                    Recife
                                </p>
                            </div>
                        </section>
                        <section className="grid grid-cols-[auto_1fr] gap-2 border-b border-gray-200 py-6">
                            <div>
                                <p className="text-lg text-light">
                                    Duração
                                </p>
                            </div>
                            <div>
                                <p className="text-lg font-title font-bold text-right">
                                    10h40m
                                </p>
                            </div>
                        </section>
                        <section className="grid grid-cols-[auto_1fr] gap-2 py-6">
                            <div>
                                <p className="text-lg text-light">
                                    Assento
                                </p>
                            </div>
                            <div>
                                <p className="text-lg font-title font-bold text-right">
                                    D-01
                                </p>
                            </div>
                        </section>
                    </section>
                    <footer className="w-full flex justify-end">
                        <Button
                            variant={"danger"}
                            isIconOnly={true}
                            size={"lg"}
                        >
                            <HiOutlineTrash />
                        </Button>
                    </footer>
                </section>
            </Container>
        </div>
    )
}