"use client"
import {useSearchParams} from "next/navigation";
import clsx from "clsx";
import useDarkMode from "@/commons/hooks/useDarkMode";
import Lottie from 'react-lottie';
import * as successData from '@/assets/animations/success.json'
import {useState} from "react";
import {useEffect} from "react";
import Container from "@/commons/components/Container";
import {Button} from "@heroui/react";
import {useRouter} from "next/navigation";

export default function Success() {
    const [ isReady, setIsReady ] = useState<boolean>(false);
    const query = useSearchParams();
    const code = query.get("code");
    const isDarkMode = useDarkMode()

    const router = useRouter();

    useEffect(() => {
        /* eslint-disable */
        setIsReady(true);
    }, [])

    return (
        <section className={'flex items-center justify-center w-full h-screen bg-background'}>
            <Container>
            <div className={"w-full grid md:grid-cols-[auto_auto] grid-cols-1 justify-center items-center"}>
                <div className={"w-full flex justify-center"}>
                    { isReady && (
                        <Lottie
                            options={{
                                loop: false,
                                autoplay: true,
                                animationData: {...successData},
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }}
                            width="260px"
                            height="260px"
                            isClickToPauseDisabled={true}
                        />
                    ) || null }
                </div>
                <div>
                    <h3 className={clsx({
                        "text-2xl font-title md:text-left text-center": true,
                        "text-(--dark-gray)": !isDarkMode,
                        "text-gray-200": isDarkMode
                    })}>
                        Reserva feita! Segue seu código da reserva! <b className={"text-success"}>{ code || '' }</b>
                    </h3>
                    <Button
                        className={clsx({
                            "my-2 ring-1 uppercase block mx-auto md:mx-0": true,
                            "ring-gray-200 text-gray-400": !isDarkMode,
                            "ring-white text-white": isDarkMode,
                        })}
                        variant={'ghost'}
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        Voltar a home
                    </Button>
                </div>
            </div>
            </Container>
        </section>
    )
}