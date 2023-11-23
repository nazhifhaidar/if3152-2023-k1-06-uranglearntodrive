'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface MessageContextType {
    messageStatus: () => "success" | "error" | null;
    showMessage: (message: string, status: "success" | "error" | null) => void;
    hideMessage: () => void;
    getMessage: () => string | null;
}
export type { MessageContextType};

const MessageContext = createContext<MessageContextType | undefined>(undefined);
export {MessageContext};

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [status, setStatus] =  useState<'success'|'error' | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const messageStatus = () => {
        return status;
      };

    const showMessage = (newMessage: string, status: "success" | "error" | null) => {
        setMessage(newMessage);
        setStatus(status);
    };

    const hideMessage = () => {
        setMessage(null);
        setStatus(null);
    };

    const getMessage = () => {
        return message;
    };

    const contextValue: MessageContextType = {
        messageStatus,
        showMessage,
        hideMessage,
        getMessage,
    };

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
};

export function useMessageContext(): MessageContextType {
    const context = useContext(MessageContext);
    if (!context) {
      throw new Error('useMessageContext must be used within a MessageProvider');
    }
    return context;
  }