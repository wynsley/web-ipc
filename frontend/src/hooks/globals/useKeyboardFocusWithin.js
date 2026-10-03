import { useState } from "react";

function useKeyboardFocusWithin() {
  const [focused, setFocused] = useState(false);
  const onFocusCapture = (event) => {
    if (event.target.matches(":focus-visible")) setFocused(true);
  };
  const onBlurCapture = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return { focused, focusHandlers: { onFocusCapture, onBlurCapture } };
}

export { useKeyboardFocusWithin };
