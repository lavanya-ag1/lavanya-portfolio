import { useCallback, useEffect, useRef, useState } from "react";
import { API } from "./api.js";

// Pings the API once on mount. This also wakes a sleeping free-tier server early,
// so the contact form responds faster by the time someone submits it.
export function useApiStatus() {
  const [status, setStatus] = useState("checking"); // "checking" | "online" | "offline"

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    // A cold free-tier server can take ~50s to start, so wait up to a minute
    const timer = setTimeout(() => controller.abort(), 60000);
    fetch(`${API}/api/health`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => active && setStatus(data.status === "ok" ? "online" : "offline"))
      .catch(() => active && setStatus("offline"))
      .finally(() => clearTimeout(timer));
    return () => {
      active = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return status;
}

// Copies text to the clipboard and reports success for a couple of seconds
export function useCopy(resetMs = 2400) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetMs);
      } catch {
        // Clipboard can be blocked (e.g. non-HTTPS); fall back to the mail client
        window.location.href = `mailto:${text}`;
      }
    },
    [resetMs]
  );

  return [copied, copy];
}
