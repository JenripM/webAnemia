import React from "react";
import { Button, Drawer } from "antd";
import { FaBars, FaPlus, FaRibbon, FaRobot } from "react-icons/fa";
import { useChatContext } from "./chat.context";
import moment from "moment";
import "moment/locale/es";
import Chat from "./chat";
import { BsArrowLeft } from "react-icons/bs";

moment.locale("es");

const ChatHistory: React.FC = () => {
  const { open, setOpen, query, setSelectedChatID, selectedChatID } =
    useChatContext();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer}>
        <FaRobot />
        <span className="sr-only">Abrir chatbot</span>
      </Button>
      <Drawer
        mask={false}
        title="Chatbot (IA)"
        extra={
          <div className="flex items-center gap-2">
            <Button onClick={() => setSelectedChatID(null)}>
              <FaBars />
              <span className="sr-only">Ir al historial de conversaciones</span>
            </Button>
            <Button>
              <FaPlus />
              <span className="sr-only">
                Iniciar nueva conversación
              </span>
            </Button>
          </div>
        }
        onClose={onClose}
        open={open}
        width={500}
      >
        {selectedChatID ? (
          <Chat />
        ) : (
          <>
            {query.data && query.data.data.length > 0 && (
              <ul className="flex flex-col gap-2">
                {query.data.data.map((chat) => (
                  <li key={chat.id}>
                    <Button
                      onClick={() => setSelectedChatID(chat.id)}
                      className="flex items-center justify-between w-full h-fit overflow-hidden"
                    >
                      <div className="flex items-center w-fit">
                        <div className="w-10 h-10 rounded-full overflow-hidden grid place-content-center bg-slate-200">
                          <FaRobot />
                        </div>
                        <div className="ml-3 flex flex-col text-start">
                          <div className="text-sm font-medium">
                            <p className="line-clamp-1">
                              {chat.last_message_content}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {moment(chat.last_message_time).fromNow()}
                          </span>
                        </div>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default ChatHistory;
