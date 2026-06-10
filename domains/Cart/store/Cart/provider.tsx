import CartContext from "@/domains/Cart/store/Cart/context";
import type TChildren from "@/commons/components/types/TChildren";
import {useState} from "react";
import type {CartStore} from "@/domains/Cart/store/Cart/store";
import {useRef} from "react";
import {useEffect} from "react";
import createCartStore from "@/domains/Cart/store/Cart/store";

export default function CartProvider({ children }: TChildren<unknown>) {
    const storeRef = useRef<CartStore | null>(null)
    const [ store, setStore ] = useState<CartStore|null>(null)

    useEffect(() => {
        if (!storeRef.current) {
            storeRef.current = createCartStore();
            setStore(storeRef.current);
        }
    }, [ store ])

    return (
        <>
            { store && (
                <CartContext.Provider value={store}>
                    { children }
                </CartContext.Provider>
            ) || <span /> }
        </>
    )
}