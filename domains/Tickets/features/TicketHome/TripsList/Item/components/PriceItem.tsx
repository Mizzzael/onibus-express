"use client"
import {Button} from "@heroui/react";
import formatPrice from "@/commons/helpers/formatPrice";

export type TPriceItemProps = {
    price: number;
    onPress?: () => void;
    isDisabled?: boolean;
}

export default function PriceItem({ price, onPress, isDisabled }: TPriceItemProps) {

    return (
        <div>
            <div>
                <p className={"font-bold font-title text-xl text-success"}>
                    { formatPrice(price) }
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