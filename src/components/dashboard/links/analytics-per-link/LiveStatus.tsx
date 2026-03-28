import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Activity } from "lucide-react";
import { apiService } from "@/service/apiService";
import { getCountryInfo } from "@/utils/countries";

interface LiveStatusProps {
  linkId: string | " ";
}

interface ClickEvent {
  id?: string;
  ip?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  createdAt?: string;
  time?: string;
  [key: string]: any;
}

const SOCKET_URL = import.meta.env.VITE_ENV === "Development" 
  ? "http://localhost:5000" 
  : (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api$/, "");

export function LiveStatus({ linkId }: LiveStatusProps) {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  // Fetch initial tracking data
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const { data, error } = await apiService.getRecentClicks(linkId);
        console.log(data, error);
        if (data && !error && data.data) {
          setClicks(data.data);
        } else if (data && !error && Array.isArray(data)) {
          setClicks(data);
        }
      } catch (err) {
        console.error("Failed to fetch initial live clicks", err);
      } finally {
        setLoading(false);
      }
    }

    if (linkId) {
      fetchInitialData();
    }
  }, [linkId]);

  // Handle Socket.io connection for live updates
  useEffect(() => {
    if (!SOCKET_URL || !linkId) return;

    // Initialize socket
    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      // Join the specific room for this link.
      // NOTE: Ensure your backend socket instance handles this event:
      // socket.on("join_link", (linkId) => socket.join(`link:${linkId}`));
      socket.emit("join", linkId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("click", (payload: ClickEvent) => {
      setClicks((prev) => [payload, ...prev].slice(0, 50)); // Keep the last 50 live clicks
    });

    return () => {
        socket.emit("leave", {linkId})
      socket.off("connect");
      socket.off("disconnect");
      socket.off("click");
      socket.disconnect();
    };
  }, [linkId]);

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Live Tracking
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            {isConnected && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex h-3 w-3 rounded-full ${
                isConnected ? "bg-emerald-500" : "bg-red-500"
              }`}
            ></span>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {isConnected ? "Live" : "Offline"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-sm text-muted-foreground py-4">Loading recent activity...</div>
        ) : clicks.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4">No recent clicks yet...</div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {clicks.map((click, i) => {
              const countryInfo = getCountryInfo(click.country);
              return (
              <div 
                key={click.id || click._id || i}
                className="animate-in fade-in slide-in-from-top-2 flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3 text-sm"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-medium">
                    {countryInfo.code ? (
                      <img 
                        src={`https://flagcdn.com/w20/${countryInfo.code}.png`}
                        srcSet={`https://flagcdn.com/w40/${countryInfo.code}.png 2x`}
                        width="20"
                        alt={countryInfo.name}
                        className="rounded-sm shadow-sm"
                      />
                    ) : (
                      <span>{countryInfo.flag}</span>
                    )}
                    <span>{countryInfo.name}</span>
                    {click.city && <span className="text-muted-foreground">• {click.city}</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {[click.device, click.browser, click.os].filter(Boolean).join(" • ") || "Unknown Device"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(click.createdAt || click.timestamp || Date.now()).toLocaleTimeString()}
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
