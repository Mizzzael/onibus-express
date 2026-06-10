import {Modal} from "@heroui/react";
import {Button} from "@heroui/react";
import clsx from "clsx";
import {HiAcademicCap} from "react-icons/hi2";
import useDarkMode from "@/commons/hooks/useDarkMode";

export type TServiceContractProps = {
    isOpen: boolean;
    cancel?: VoidFunction;
    confirm?: VoidFunction;
}

export default function ServiceContract ({ isOpen, confirm, cancel }: TServiceContractProps) {
    const isDarkMode = useDarkMode();
    return (
        <Modal.Backdrop isOpen={isOpen} variant={'blur'}>
            <Modal.Container>
                <Modal.Dialog className={ clsx({
                    "md:max-w-[768px] sm:max-w-[90%]": true,
                    "bg-(--dark-gray)": isDarkMode
                }) }>
                    <Modal.Header>
                        <Modal.Icon className={clsx({
                            "ring-1 ring-gray-400 text-gray-400": true,
                            "bg-gray-200": !isDarkMode,
                            "bg-(--dark-gray)": isDarkMode,
                        })}>
                            <HiAcademicCap />
                        </Modal.Icon>
                        <Modal.Heading>
                            <p className={'text-xs py-2'}>
                                Contrato - Logo abaixo segue seu contrato, leia com atenção:
                            </p>
                        </Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className={"md:max-h-[40vh] max-h-[60vh]"}>
                        <header className={'w-full'}>
                            <h5 className={clsx({
                                'text-center text-2xl font-title text-red-950 font-runic py-4': true,
                            })}>
                                ✦ᚠᛖᚾᚱᛁᛊ✦
                            </h5>
                            <div className={"text-red-950"}>
                                <hr className={'border-red-950'}/>
                            </div>
                            <h4 className={clsx({
                                "text-center font-title font-bold text-4xl py-4": true,
                            })}>
                                Pacto de Fang
                            </h4>
                            <p
                                className={clsx({
                                    "text-left italic font-title font-bold text-sm pt-1 pb-2": true,
                                })}
                            >
                                Termos de Uso — Selados pela Lei de Fenris
                            </p>
                            <p
                                className={clsx({
                                    "text-center italic font-title font-bold text-sm pt-4 pb-6": true,
                                })}
                            >
                                {'"'}Nenhum lobo quebra seu juramento. Nenhum juramento é feito levianamente.{'"'}<br />
                                — Saga dos Grandes Jarls de Fenris
                            </p>
                            <div className={"text-red-950"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </header>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Prólogo
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        Antes que o Lobo Avance
                                    </p>
                                </div>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    Ao adentrar o Fang — esta fortaleza digital erguida sobre o permafrost da rede — você firma um pacto com aqueles que a constroem e a guardam. Não com burocracia imperial, não com papéis sem alma: com palavras ditas em voz alta, como se faz em Fenris desde os tempos em que Leman Russ ainda caminhava entre nós.
                                    <br />
                                    <br />
                                    Leia com atenção o que está gravado aqui. Um lobo que avança sem conhecer o terreno é um lobo morto.
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Cláusula I — Kyn ok Nafn
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        Das Partes e do Reconhecimento
                                    </p>
                                </div>
                               <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    Este Pacto é firmado entre você — doravante chamado de Ulfr, o Lobo que adentra o Fang — e nós, os guardiões desta plataforma, chamados de Jarl. Ao utilizar qualquer funcionalidade deste serviço, você declara ter lido, compreendido e concordado com cada palavra aqui gravada.
                                    <br/><br/>
                                    Não há neutralidade no Fang. Ou você faz parte da Grande Empresa, ou não entra.
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Cláusula II — Verk ok Skylda
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        Do Serviço e das Obrigações
                                    </p>
                                </div>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    <i className={'font-bold text-md'}>O que o Fang oferece</i><br/>
                                    Esta plataforma fornece as ferramentas que o Ulfr necessita para cumprir sua missão. Fazemos o possível para mantê-la de pé, aquecida e funcional — como o próprio Fang resiste às tempestades de Fenris. Porém, assim como nenhuma fortaleza é impenetrável, não garantimos disponibilidade absoluta ou ausência de falhas.
                                </p>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    <i className={'font-bold text-md'}>O que o Ulfr deve oferecer</i><br/>
                                    Em troca, esperamos que o Ulfr utilize o serviço com honra: sem tentativas de subverter, explorar ou enfraquecer a fortaleza; sem uso das ferramentas para fins que envergonhariam um Guerreiro Cinzento; e com respeito aos demais lobos que compartilham este espaço.
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Cláusula III — Leynd ok Traust
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        Do Sigilo e da Confiança
                                    </p>
                                </div>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    O que você compartilha no Fang é tratado como segredo de clã. Não vendemos, não trocamos, não entregamos os dados do Ulfr a inimigos, mercadores ou à Inquisição Imperial — salvo quando a lei do Imperador assim exigir de forma expressa e documentada.
                                    <br /><br />
                                    Da mesma forma, o Ulfr se compromete a proteger suas próprias credenciais de acesso. Uma senha compartilhada é uma porta aberta para o Caos. O Jarl não se responsabiliza por invasões decorrentes de descuido do próprio lobo.
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Cláusula IV — Lög ok Dóm
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        Das Leis e dos Limites
                                    </p>
                                </div>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    <i className={'font-bold text-md'}>Condutas proibidas no Fang</i><br/>
                                    É vedado ao Ulfr: utilizar o serviço para atividades ilegais ou fraudulentas; tentar comprometer a segurança ou integridade da plataforma; disseminar conteúdo que cause dano a outros usuários; e se passar por outro lobo ou pelo próprio Jarl. Violações resultarão em banimento imediato — o equivalente a ser expulso do Mead Hall com desonra.
                                </p>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    <i className={'font-bold text-md'}>Limitação de responsabilidade</i><br/>
                                    O Jarl não responde por danos indiretos, perda de dados ou prejuízos decorrentes do uso — ou da impossibilidade de uso — do serviço. O Ulfr assume os riscos da batalha ao entrar no campo. Nenhum lobo culpa o Jarl pela própria falta de preparo.
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Cláusula V — Breyta ok Nýr Eið
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        Das Alterações do Pacto
                                    </p>
                                </div>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    O Jarl se reserva o direito de reescrever as runas deste Pacto quando necessário. Alterações serão comunicadas antes de entrarem em vigor. Continuar utilizando o Fang após a comunicação equivale a pronunciar o juramento novamente — aceitando os novos termos.
                                    <br /><br />
                                    Se o Ulfr não concordar com as alterações, que parta com honra: basta encerrar o uso da plataforma. Não há vergonha em escolher outro caminho.
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Cláusula VI — Deilur ok Dóm
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        Das Disputas
                                    </p>
                                </div>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    Caso surja um conflito entre o Ulfr e o Jarl, ambos se comprometem a buscar primeiro uma solução honrosa e direta. Persistindo o impasse, fica eleito o foro da comarca onde o Jarl mantém sua fortaleza principal, com renúncia a qualquer outro, por mais privilegiado que seja.
                                    <br /><br />
                                    Este Pacto é regido pelas leis da República Federativa do Brasil. Mesmo Fenris tem suas leis.
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <section className={"w-full py-4"}>
                            <div className="w-full">
                                <div className={clsx({
                                    "pb-1": true,
                                })}>
                                    <p className={"text-red-950 text-sm font-title font-bold"}>
                                        Juramento Final — Eið Lokaorð
                                    </p>
                                    <p className={clsx({
                                        "text-gray-400 text-xl font-bold": true,
                                    })}>
                                        A Palavra que Sela o Pacto
                                    </p>
                                </div>
                                <p className={clsx({
                                    "font-title py-2 text-(--dark-gray)": true,
                                })}>
                                    Ao utilizar este serviço, o Ulfr — em voz ou em pensamento — pronuncia:
                                </p>
                                <p className={"text-center font-title py-2 text-sm font-bold px-4"}>
                                    {'"'}Eu juro pelo Fang de Fenris e pelos ossos de Leman Russ:
                                    cumprirei o que aqui está escrito, protegerei o que me foi confiado,
                                    e honrarei este Pacto como honro o nome do meu clã.
                                    <br /><br />
                                    Por Russ e pelo Allfather — que assim seja.{'"'}
                                </p>
                                <p className={clsx({
                                    "font-title py-2": true,
                                    "text-(--dark-gray)": !isDarkMode,
                                    "text-gray-100": isDarkMode,
                                })}>
                                    Última atualização das runas: junho de 2025. Dúvidas ou disputas podem ser enviadas ao Jarl pelo canal oficial de comunicação da plataforma
                                </p>
                            </div>
                            <div className={"text-red-950 pt-4"}>
                                <hr className={'border-red-950'}/>
                            </div>
                        </section>
                        <footer className={"w-full"}>
                            <h5 className={clsx({
                                'text-center text-xl font-title text-red-950 font-runic py-4': true,
                            })}>
                                ✦ᚠᛖᚾᚱᛁᛊ✦
                            </h5>
                            <p className={clsx({
                                "font-title py-2 text-center": true,
                                "text-(--dark-gray)": !isDarkMode,
                                "text-gray-100": isDarkMode,
                            })}>
                                Este documento é protegido pela honra das partes e pelo espírito de Fenris.
                                <br /><br />
                                Cópias sem contexto não têm valor perante a Grande Empresa.
                            </p>
                        </footer>
                    </Modal.Body>
                    <Modal.Footer>
                        <section className="w-full grid grid-cols-2 gap-2 items-centerq">
                            <div>
                                <Button onPress={() => {
                                    cancel?.();
                                }} className={'bg-red-950 rounded-xl text-white'} slot="close">
                                    Cancelar
                                </Button>
                            </div>
                            <div className={"flex justify-end"}>
                                <Button onPress={() => {
                                    confirm?.();
                                }} className={'bg-success rounded-xl text-white'} slot="close">
                                    Aceito
                                </Button>
                            </div>
                        </section>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    )
}