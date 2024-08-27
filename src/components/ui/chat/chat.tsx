import { useChatContext } from "./chat.context";
import { Input, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetch/fetcher";
import { Message } from "@/types/Chat";
import ChatMessage from "./chat-message";
import { useEffect, useRef, useState } from "react";
import { getConversationDeetailsByID, sendMessage } from "./services";
import { message } from "antd";
import { ConversationType } from "@/types/Chat/types";

export default function Chat(){
    const [messageApi, contextHolder] = message.useMessage();
    const { selectedChatID } = useChatContext()
    const lastMessageID = useRef<number | null>(null);
    const [inputValue, setInputValue] = useState("");

    const [newMessage, setNewMessage] = useState<Message | null>(null);
    
    const { data: messages, isLoading, isError, refetch : refetchMessages } = useQuery<Message[]>({
        queryKey: ["messages", selectedChatID],
        queryFn: async () => {
            const response = await fetcher(`/chatbot/conversations/${selectedChatID}/messages`)
            if(response.ok){
                const data = await response.json()
                console.log("data", data)
                return data
            }
            console.log("error", response)
            return null
        },
        enabled: !!selectedChatID,
    })

    useEffect(() =>{
        
        if(!messages) return;
        const sendInitialMessage = async () => {
            if(!selectedChatID) return;
            const conversation = await getConversationDeetailsByID(selectedChatID)
            console.log("conversation", conversation?.conversation.type)
            if(!conversation) return;
            if(conversation.conversation.type !== ConversationType.CHAT){
                const response = await sendMessage(selectedChatID, {
                    message: 'Quiero más recomendaciones sobre los resultados de la probabilidad de anemia de mi paciente.'
                })
                if(response)
                   await refetchMessages()
            }
        }
        if (messages.length === 0){
            sendInitialMessage()
            return;
        }

        lastMessageID.current = messages[messages.length - 1].id;
        const el = document.querySelector(`#chat-list li[id="${lastMessageID.current}"]`);
        if(el){
            el.scrollIntoView({ behavior: "smooth" });
        }
    },[messages])

    async function handleSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        console.log("enviar", target.value)
        if (target.value.trim() === "" || !selectedChatID) return;
        const response = await sendMessage(selectedChatID, {
            message: target.value
        })
        if (response){
            setInputValue("")
            await refetchMessages()
        }else{
            messageApi.error('Error, no se pudo enviar el mensaje')
        }
    }

    return (
        <section className="
            flex flex-col  max-h-full overflow-hidden
        ">
            {contextHolder}
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
                        <ul className="flex flex-col gap-2 mt-4 h-fit w-full overflow-hidden"
                            id="chat-list"
                        >
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
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe tu mensaje aquí"
                        onPressEnter={(e) => handleSendMessage(e)}
                    />
                </form>
            </article>
        </section>
    )
}