"use client";
import { useCallback } from "react";
import { useConversation } from "@11labs/react";
import { AI_MODEL_ID } from "@/utils/constants";

function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      console.log("Requesting microphone permission...");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone permission granted");

      console.log("Starting session...");
      await conversation.startSession({
        agentId: "hZNzktfq3I9cYXCd79L2",
      });
      console.log("Session started");
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        

        <button
          onClick={startConversation}
          disabled={conversation.status === "connected"}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none disabled:bg-gray-300 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 p-4 text-3xl font-bold text-white backdrop-blur-3xl">
            Start Conversation
          </span>
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== "connected"}
          className="px-4 py-2 bg-red-500 text-white rounded fixed top-0 right-0 m-4 disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center text-white">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? "speaking" : "listening"}</p>
      </div>

      {conversation.status === "connected" ? (
        <div className="fixed bottom-0 h-[300px] w-full bg-transparent flex justify-center items-center">
          <img className="h-[200px] w-[200px]" src="/ai-gif.gif" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Conversation;
