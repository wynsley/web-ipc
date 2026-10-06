import { createContext } from "react";

// El modo ligado al scroll se activa únicamente en las páginas que lo solicitan.
const ScrollAnimationContext = createContext("reveal");
export { ScrollAnimationContext };
