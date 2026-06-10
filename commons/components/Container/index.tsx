import TChildren from "@/commons/components/types/TChildren";

export default function Container({ children }: TChildren<unknown>) {
    return (
        <section className={'w-full'}>
            <section className={'mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl max-w-[95%]'}>
                { children }
            </section>
        </section>
    )
}