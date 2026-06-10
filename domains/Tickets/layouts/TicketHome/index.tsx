"use client"
import type {ReactNode} from "react";

export default function Layout({ children }: { children: ReactNode }) {

    return (
        <section className="w-full min-h-screen flex flex-wrap gap-1 items-center justify-center">
            {
                children
            }
        </section>
    )
}