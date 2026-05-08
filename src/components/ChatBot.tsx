import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiService } from "@/service/apiService";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const greeting = `Hi there! 👋 I'm your LinkTrace AI Assistant. I can help you navigate our API documentation and answer questions about:

• Base URL: The root for all API calls
• Creating short links: POST /addLinks
• Retrieving your links: GET /getMyLinks
• Link Details: GET /links/:shortCode
• Deleting links: DELETE /links/:linkId
• Authentication: Bearer token usage
• Rate Limiting: Fair usage and cooldowns

How can I assist you today?`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadingSteps = [
    "Analyzing your query...",
    "Searching documentation...",
    "Processing context...",
    "Thinking...",
    "Formulating response...",
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 1500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, loadingStep]);

  const formatAiResponse = (text: string) => {
    if (!text) return "";
    
    return text
      // Remove Bold asterisks (**text**)
      .replace(/\*\*(.*?)\*\*/g, "$1")
      // Remove Italic asterisks (*text*)
      .replace(/\*(.*?)\*/g, "$1")
      // Remove code block markers (```)
      .replace(/```/g, "")
      // Remove single backticks (`text`)
      .replace(/`(.*?)`/g, "$1")
      // Remove leading dashes/bullets used in some AI responses
      .replace(/^\s*[-•]\s*/gm, "")
      // Trim extra whitespace
      .trim();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await apiService.chatBot(input);
   
      
      const rawContent = response.data.data?.answer || response.data?.response || "I'm sorry, I couldn't find an answer to that in the documentation.";
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: formatAiResponse(rawContent),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "I encountered an error while trying to reach my brain. Please try again soon!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="fixed bottom-20 right-6 w-80 md:w-96 shadow-2xl border-primary/20 flex flex-col h-[500px] z-[100] animate-in slide-in-from-bottom-5 duration-300">
      <CardHeader className="p-4 border-b bg-primary text-primary-foreground rounded-t-xl flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className="bg-primary-foreground/20 p-1.5 rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <CardTitle className="text-sm font-bold">LinkTrace AI</CardTitle>
            <p className="text-[10px] text-primary-foreground/70">Always active</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-full",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "flex max-w-[85%] gap-2 items-end",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}>
              <Avatar className="w-6 h-6 border shadow-sm">
                {msg.role === "bot" ? (
                  <>
                    <AvatarImage src="/bot-avatar.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={12} />
                    </AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/user-avatar.png" />
                    <AvatarFallback className="bg-muted">
                      <User size={12} />
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={cn(
                  "p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none border border-border"
                )}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 max-w-[85%]">
              <Avatar className="w-6 h-6 border shadow-sm animate-pulse">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot size={12} />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-2xl rounded-bl-none border border-border flex items-center gap-3">
                <Loader2 size={14} className="animate-spin text-primary" />
                <span className="text-xs font-medium text-muted-foreground italic">
                  {loadingSteps[loadingStep]}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 border-t bg-muted/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-background border-primary/20 focus-visible:ring-primary"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90 shadow-md"
          >
            <Send size={16} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatBot;
