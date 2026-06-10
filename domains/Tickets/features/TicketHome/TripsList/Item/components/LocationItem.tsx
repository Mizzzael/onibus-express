"use client"
export type TLocationItemProps = {
    topTag: string;
    cityName: string;
}

export default function LocationItem({ cityName, topTag }: TLocationItemProps) {
    return (
        <section>
            <header className="py-2">
                <p className={"text-xs"}>
                    { topTag }
                </p>
                <h2 className={"text-xl font-title font-bold"}>
                    { cityName }
                </h2>
            </header>
        </section>
    )
}