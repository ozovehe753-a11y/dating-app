"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatPage({ params }) {
  const { userId } = use(params);

  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);

  const loadMessages = async () => {
    try {
      const res = await fetch(
        `/api/messages?userId=${userId}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        return;
      }

      setMessages(data.messages || []);
      setCurrentUserId(data.currentUserId || "");
      setChatUser(data.chatUser || null);
    } catch (error) {
      console.error("LOAD CHAT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    const interval = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages.length]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!content.trim() || sending) return;

    try {
      setSending(true);

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: userId,
          content: content.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Unable to send message");
        return;
      }

      setContent("");

      await loadMessages();
    } catch (error) {
      console.error("SEND ERROR:", error);

      alert("Unable to send message");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-pink-600">
          Loading chat... ❤️
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-3 md:p-8">
      <div className="mx-auto flex h-[90vh] max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* CHAT HEADER */}

        <div className="flex items-center gap-4 border-b bg-white p-4 shadow-sm">

          <button
            type="button"
            onClick={() => router.push("/matches")}
            className="text-2xl"
          >
            ←
          </button>

          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-200">

            {chatUser?.imageUrl ? (
              <img
                src={chatUser.imageUrl}
                alt={chatUser.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl">❤️</span>
            )}

          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {chatUser?.name || "Private Chat"}
            </h1>

            <p className="text-sm text-green-600">
              ● Online
            </p>
          </div>

        </div>


        {/* MESSAGES */}

        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5">

          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">

                <div className="text-6xl">
                  ❤️
                </div>

                <h2 className="mt-4 text-xl font-bold">
                  You matched!
                </h2>

                <p className="mt-2 text-gray-500">
                  Say hello and start a conversation.
                </p>

              </div>
            </div>
          )}


          {messages.map((message) => {
            const mine =
              message.senderId === currentUserId;

            return (
              <div
                key={message.id}
                className={`flex ${
                  mine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] rounded-3xl px-5 py-3 shadow-sm ${
                    mine
                      ? "rounded-br-md bg-pink-600 text-white"
                      : "rounded-bl-md bg-white text-gray-900"
                  }`}
                >

                  <p className="break-words">
                    {message.content}
                  </p>

                  <div
                    className={`mt-1 flex items-center gap-1 text-xs ${
                      mine
                        ? "justify-end text-pink-100"
                        : "text-gray-400"
                    }`}
                  >

                    <span>
                      {new Date(
                        message.createdAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {mine && (
                      <span>
                        ✓✓
                      </span>
                    )}

                  </div>

                </div>

              </div>
            );
          })}

          <div ref={bottomRef} />

        </div>


        {/* MESSAGE INPUT */}

        <form
          onSubmit={sendMessage}
          className="flex items-center gap-3 border-t bg-white p-4"
        >

          <button
            type="button"
            className="text-2xl"
          >
            😊
          </button>

          <input
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Type a message..."
            autoComplete="off"
            className="flex-1 rounded-full border bg-gray-100 px-5 py-3 outline-none focus:border-pink-500"
          />

          <button
            type="submit"
            disabled={
              !content.trim() || sending
            }
            className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-xl text-white hover:bg-pink-700 disabled:opacity-50"
          >
            {sending ? "..." : "➤"}
          </button>

        </form>

      </div>
    </main>
  );
}