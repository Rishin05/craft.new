"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateTokens = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);
  /**
   * Used to get Workspace data using Workspace ID
   */
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    try {
      setLoading(true);
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
      const result = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });
      const aiResp = {
        role: "ai",
        content: result.data.result,
      };

      const tokensUsed = countToken(JSON.stringify(aiResp));

      if (!userDetail?._id || typeof userDetail?.token !== "number") {
        console.error("User details or tokens not properly initialized");
        return;
      }

      const currentTokens = Number(userDetail?.token);
      const newTokenBalance = Math.max(0, currentTokens - tokensUsed);

      const updatedMessages = [...messages, aiResp];
      setMessages(updatedMessages);

      await UpdateMessages({
        messages: updatedMessages,
        workspaceId: id,
      });
      setUserDetail(prev=>({
        ...prev,
        token:newTokenBalance
      }))
      await UpdateTokens({
        userId: userDetail._id,
        token: newTokenBalance,
      });

      setUserDetail((prev) => ({
        ...prev,
        token: newTokenBalance,
      }));
    } catch (error) {
      console.error("Error in GetAiResponse:", error);
    } finally {
      setLoading(false);
    }
  };

  const onGenerate = (input) => {
    if (userDetail?.token < 10) {
      toast("You dont have enough token");
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="relative h-[85vh] flex flex-col ">
      <div className="flex-1 overflow-y-scroll scrollbar-hide pl-5 ">
        {messages?.length > 0 &&
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-center"
              style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
            >
              {msg?.role == "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <ReactMarkdown className="flex flex-col">
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}

        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Genetating response...</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex gap-2 items-end">
        {userDetail && (
          <Image
            src={userDetail?.picture}
            alt="user"
            width={30}
            height={30}
            onClick={toggleSidebar}
            className="rounded-full cursor-pointer"
          />
        )}
        <div
          className="p-5 border rounded-xl max-w-xl w-full mt-3 scroll-smooth"
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
        >
          <div className="flex gap-2">
            <textarea
              value={userInput}
              placeholder={Lookup.INPUT_PLACEHOLDER}
              onChange={(event) => setUserInput(event.target.value)}
              className="outline-none bg-transparent w-full h-32 max-h-48 resize-none"
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className=" bg-[#2ba6ff] p-2 h-8 w-8 rounded-md cursor-pointer"
              />
            )}
          </div>
          <div>
            <Link className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
