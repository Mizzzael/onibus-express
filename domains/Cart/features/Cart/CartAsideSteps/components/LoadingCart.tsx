import Lottie from "react-lottie";
import * as loadingCart from "@/assets/animations/loading-cart.json";

export default function LoadingCart () {
    return (
        <section className={"fixed left-0 top-0 w-full h-screen flex justify-center items-center bg-background z-50"}>
            <div>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: {...loadingCart},
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }}
                    width="260px"
                    height="260px"
                    isClickToPauseDisabled={true}
                />
            </div>
        </section>
    )
}