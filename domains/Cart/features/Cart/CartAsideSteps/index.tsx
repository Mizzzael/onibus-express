"use client"
import Container from "@/commons/components/Container";
import SwitchSteps from "@/domains/Cart/features/Cart/CartAsideSteps/components/SwitchSteps";
import CartProvider from "@/domains/Cart/store/Cart/provider";
import clsx from "clsx";
import useDarkMode from "@/commons/hooks/useDarkMode";

export default function CartAsideSteps() {
    const isDarkMode = useDarkMode();
    return (
        <CartProvider>
            <Container>
                <section className={clsx({
                    "w-full ring ring-1 rounded-xl p-4": true,
                    "bg-white ring-gray-300": !isDarkMode,
                    "bg-(--dark-gray) ring-(--dark-ring-color)": isDarkMode,
                })}>
                    <SwitchSteps />
                </section>
            </Container>
        </CartProvider>
    )
}