import Conversation from "@/components/conversation";

export default function Home() {
  return (
    <div className="h-[100svh] w-full flex flex-col bg-black justify-center items-center p-4">
      <p className="text-2xl font-bold text-white">Conversational <span className="underline hover:text-blue-500">Chat</span></p>
      <div className="mt-6">
        <Conversation />
      </div>
    </div>
  );
}
