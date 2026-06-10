import type {ICartState} from "@/domains/Cart/store/Cart/store";
import {useContext} from "react";
import CartContext from "@/domains/Cart/store/Cart/context";
import {useStore} from "zustand";

export default function useCartStore<T>(select: (state: ICartState) => T) {
    const store = useContext(CartContext);
    if (!store)
        throw new Error("context must be used as useCartStore");
    return useStore(store, select);
}