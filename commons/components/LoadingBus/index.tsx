import {Spinner} from "@heroui/react";

export default function LoadingBus() {
    return (
        <section className="w-full absolute top-0 left-0 h-screen bg-background flex justify-center items-center">
            <div>
                <Spinner className={'w-[10rem] h-[10rem] block'} color="danger" />
            </div>
        </section>
    )
}