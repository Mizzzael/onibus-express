import {createContext} from "react";
import type {CartStore} from "@/domains/Cart/store/Cart/store";

const CartContext = createContext<CartStore|null>(null)

export default CartContext;