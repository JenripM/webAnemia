import { useChatContext } from "./chat.context";
import { FaBars } from "react-icons/fa";
import { Button, Input, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetch/fetcher";
import { Message } from "@/types/Chat";
import ChatMessage from "./chat-message";

export default function Chat(){
    const { selectedChatID, setSelectedChatID, sendMessage } = useChatContext()
    const { data: messages, isLoading, isError } = useQuery<Message[]>({
        queryKey: ["chat", selectedChatID],
        queryFn: async () => {
            const response = await fetcher(`/chatbot/conversations/${selectedChatID}/messages`)
            if(response.ok){
                const data = await response.json()
                console.log("data", data)
                return data
            }
            console.log("error", response)
            return null
        }
    })
    return (
        <section className="
            flex flex-col  max-h-full overflow-hidden
        ">
            <article className="grid grid-rows-2 gap-y-3 overflow-hidden overflow-y-auto mb-12"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0)',
                }}
            >
                {
                    isError && <p>Error al cargar la conversación</p>
                }
                {
                    isLoading && <Spin />
                }
                {
                    messages && (
                        <ul className="flex flex-col gap-2 mt-4">
                            {
                                messages.map(m => {
                                    return <ChatMessage message={m} key={m.id}/>
                                })
                            }
                        </ul>
                    )
                }
                <form action="" className="fixed bottom-2 w-[455px]">
                    <Input 
                        disabled={sendMessage.isPending}
                        placeholder="Escribe tu mensaje aquí"
                        onPressEnter={(e) => {
                            e.preventDefault();
                            const target = e.target as HTMLInputElement
                            console.log("enviar", target.value)
                            if (target.value.trim() === "") return;
                            sendMessage.mutate({
                                message: target.value
                            })
                        }}
                    />
                </form>
            </article>
        </section>
    )
}