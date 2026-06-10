import type Ticket from "@/domains/Tickets/models/Ticket/ticket";
import type User from "@/domains/User/models/User/user";
import {createStore} from "zustand/vanilla";

export interface ICartState {
    items: Ticket[];
    user?: User;
    steps: number;
    removeItem: (viagemId: number) => void;
    nextStep: VoidFunction;
    prevStep: VoidFunction;
    setUser: (user: User) => void;
}

export type CartStore = ReturnType<typeof createCartStore>;

export const createCartStore = () =>
    createStore<ICartState>()((set) => ({
        items: [],
        user: undefined,
        steps: 0,
        removeItem: (viagemId: number) => set((state) => {
            return {
                items: state.items.filter((item) => item.viagemId !== viagemId),
            }
        }),
        nextStep: () => set((state) => ({ steps: state.steps + 1 })),
        prevStep: () => set((state) => ({ steps: state.steps - 1 })),
        setUser: (user: User) => set({ user: user }),
    }));

export default createCartStore;