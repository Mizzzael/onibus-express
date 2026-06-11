import useDarkMode from "@/commons/hooks/useDarkMode";
import clsx from "clsx";
import {Button} from "@heroui/react";
import useCartStore from "@/domains/Cart/store/Cart/useCartStore";
import ServiceContract from "@/domains/Cart/features/Cart/CartAsideSteps/components/ServiceContract";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {fakeDelay} from "@/commons/helpers/fakeDelay";
import LoadingCart from "@/domains/Cart/features/Cart/CartAsideSteps/components/LoadingCart";

export default function PaymentStep() {
    const isDarkMode = useDarkMode();
    const [ isOpen, setOpen ] = useState<boolean>(false);
    const backSteps = useCartStore((state) => state.prevStep)
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(false);

    const loadingFake = async () => {
        setLoading(true);
        await fakeDelay(3000);
        router.push("/cart/success?code=ABC-123");
    }

    return (
    <>
        <section className={"w-full"}>
            <header>
                <h3 className={"font-title font-bold text-xl my-0"}>
                    Pagamentos
                </h3>
            </header>

            <section className="w-full py-4 px-0">
                <section className={clsx({
                    "w-full min-h-[230px] rounded-xl flex items-center justify-center ring-1": true,
                    "ring-gray-200 text-gray-400": !isDarkMode,
                    "text-(--dark-ring-color) ring-(--dark-ring-color)": isDarkMode,
                })}>
                    <p className={clsx({
                        "text-center": true,
                    })}>
                        Aqui seria o Gateway de pagamento
                    </p>
                </section>
            </section>

            <footer className={'w-full pt-4'}>
                <Button size={"lg"} onPress={() => {
                    setOpen(true);
                }} className={"w-full bg-success text-white uppercase mb-4 rounded-xl"}>
                    Seguinte
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
                >
                    Voltar
                </Button>
            </footer>
        </section>
        <ServiceContract
            isOpen={isOpen}
            cancel={() => setOpen(false)}
            confirm={() => {
                setOpen(false)
                loadingFake();
            }}
        />
        { loading && (
            <LoadingCart />
        )}
    </>)
}