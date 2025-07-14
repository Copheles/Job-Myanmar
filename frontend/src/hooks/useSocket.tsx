import { useAppSelector } from "@redux/hooks";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

export let socketInstance: null | Socket = null;

export const useSocket = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const initializeSocket = () => {
    if (!socketInstance && userInfo) {
      socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
        query: {
          id: userInfo.id,
        },
      });
    } 

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
      }
    };
  };

  useEffect(() => {
    const cleanUpSocket = initializeSocket();

    return () => {
      if (cleanUpSocket) {
        cleanUpSocket();
      }
    };
  }, [userInfo]);

  const emitEvent = (eventName: string, data: any) => {
    if (!socketInstance) {
      initializeSocket();
    }

    if (socketInstance) {
      socketInstance.emit(eventName, data);
    } else {
      console.log("Socket not initialized");
    }
  };

  const listenToEvent = (eventName: string, callback: (data: any) => void) => {
    if (!socketInstance) {
      initializeSocket();
    }

    if (socketInstance) {
      socketInstance.on(eventName, callback);
    } else {
      console.log("Socket not initialized");
    }
  };

  const cleanUpListeners = () => {
    if (socketInstance) {
      socketInstance.removeAllListeners();
    }
  };
  return { emitEvent, listenToEvent, cleanUpListeners, socketInstance };
};
