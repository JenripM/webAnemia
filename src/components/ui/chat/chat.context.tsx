import { fetcher } from '@/lib/fetch/fetcher';
import { ConversationsHistory } from '@/types/Chat';
import { ChatMessageDTO } from '@/types/Chat/dto/ChatMessageDTO';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { message } from 'antd';
import { createContext, useContext, useState } from 'react';

interface IChatContextProps{
    open: boolean;
    setOpen: (open: boolean) => void;
    query : UseQueryResult<ConversationsHistory, unknown>,
    sendMessage: UseMutationResult<unknown, unknown, ChatMessageDTO, unknown>,

    selectedChatID: number | null,
    setSelectedChatID: (selectedChatID: number | null) => void;
}

const ChatContext = createContext({} as IChatContextProps);


export default function ChatProvider(
    {children}: { children: React.ReactNode; }
) {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [selectedChatID, setSelectedChatID] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const query = useQuery<ConversationsHistory>({
        queryKey: ["chat"],
        queryFn: async () => {
            const response = await fetcher("/chatbot/conversations")
            if(response.ok){
                const data = await response.json()
                console.log("data", data)
                return data
            }
            console.log("error", response)
            return null
        }
      })

      const sendMessage = useMutation({
        mutationKey: ["sendMessage", selectedChatID],
        mutationFn: async (message : ChatMessageDTO) => {
            const response = await fetcher(`/chatbot/conversations/${selectedChatID}/chat/`,{
                method: 'POST',
                body: JSON.stringify(message)
            })
            console.log("chat response", response)
        },
        onError: (error) => {
            console.log("error", error)
        },
        onSuccess: async (data) => {
            console.log("data", data)
            await queryClient.invalidateQueries({
                queryKey: ["chat", selectedChatID],
            })
        }
      })

    return <ChatContext.Provider value={{  
        open, setOpen,
        query, sendMessage,
        selectedChatID, setSelectedChatID,
      }}>
        {children}
    </ChatContext.Provider>;
}

export function useChatContext(){
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}