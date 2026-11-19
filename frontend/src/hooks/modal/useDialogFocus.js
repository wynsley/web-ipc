import { useEffect, useRef } from "react";
export function useDialogFocus() {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    const selector =
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]';
    dialog.querySelector(selector)?.focus();
    function trap(event) {
      if (event.key !== "Tab") return;
      const controls = [...dialog.querySelectorAll(selector)].filter(
        (node) => node.getClientRects().length,
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    dialog.addEventListener("keydown", trap);
    return () => {
      dialog.removeEventListener("keydown", trap);
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return ref;
}
