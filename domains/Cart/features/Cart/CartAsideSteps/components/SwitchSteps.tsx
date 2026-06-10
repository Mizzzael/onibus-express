import useCartStore from "@/domains/Cart/store/Cart/useCartStore";
import PassengerForm from "@/domains/Cart/features/Cart/CartAsideSteps/components/PassengerForm";
import {FaCircle} from "react-icons/fa6";
import clsx from "clsx";
import ConfirmTicket from "@/domains/Cart/features/Cart/CartAsideSteps/components/ConfirmTicket";
import PaymentStep from "@/domains/Cart/features/Cart/CartAsideSteps/components/PaymentStep";

export default function SwitchSteps() {
    const steps = useCartStore<number>((state) => state.steps);

    return (
        <>
            {(() => {
                switch (steps) {
                    case 1:
                        return <ConfirmTicket />
                    case 2:
                        return <PaymentStep />
                    case 0:
                    default:
                        return <PassengerForm />;
                }
            })()}
            <footer className={'w-full'}>
                <section className="w-full flex items-center justify-center gap-2">
                    <FaCircle className={clsx({
                        "text-green-500": steps > 0,
                        "text-blue-400": steps === 0
                    })} size={'12px'} />
                    <FaCircle
                        className={clsx({
                            "text-green-500": steps > 1,
                            "text-blue-400": steps === 1,
                            "text-gray-300": steps < 1,
                        })}
                        size={'12px'} />
                    <FaCircle
                        className={clsx({
                            "text-green-500": steps > 2,
                            "text-blue-400": steps === 2,
                            "text-gray-300": steps < 2,
                        })}
                        size={'12px'} />
                </section>
            </footer>
        </>
    )
}