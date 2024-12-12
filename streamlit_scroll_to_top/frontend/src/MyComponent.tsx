import React, { useEffect } from "react";
import { withStreamlitConnection, ComponentProps } from "streamlit-component-lib";

interface ScrollProps extends ComponentProps {
  delay?: number; // Time in milliseconds before scrolling
}

const ScrollIframeIntoViewComponent: React.FC<ScrollProps> = ({ args }) => {
  const delay = args?.delay || 0; // Default delay to 0ms if not provided

  useEffect(() => {
    const scrollIframeIntoView = () => {
      try {
        const iframes = window.parent?.document.getElementsByTagName("iframe");
        for (const iframe of Array.from(iframes || [])) {
          if (iframe.contentWindow === window) {
            iframe.scrollIntoView({ behavior: "smooth" });
            break;
          }
        }
      } catch (error) {
        console.warn("Could not scroll iframe into view:", error);
      }
    };

    // Invoke scrolling logic directly or use setTimeout if a delay is required
    if (delay > 0) {
      setTimeout(scrollIframeIntoView, delay);
    } else {
      scrollIframeIntoView();
    }
  }, [delay]);

  return null; // No visible content in the iframe
};

export default withStreamlitConnection(ScrollIframeIntoViewComponent);
