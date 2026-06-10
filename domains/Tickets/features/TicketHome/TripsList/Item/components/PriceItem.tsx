"use client"
import {Button} from "@heroui/react";

export type TPriceItemProps = {
    onPress?: () => void;
    isDisabled?: boolean;
}

export default function PriceItem({ onPress, isDisabled }: TPriceItemProps) {

    return (
        <div>
            <div>
                <p className={"font-bold font-title text-xl text-success"}>
                    <sup className={"font-light text-xs"}>R$</sup> 399,00
                </p>
            </div>
            <footer className={"py-2"}>
                <Button isDisabled={isDisabled} className={"bg-success text-white w-full"} onPress={() => {
                    if (isDisabled) return;
                    onPress?.();
                }}>
                    Comprar
                </Button>
            </footer>
        </div>
    )
}