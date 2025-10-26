import { useEffect } from "react";

/**
 * useA11yFocus
 * Focuses an element when a modal or drawer is opened (for accessibility).
 */
export function useA11yFocus(ref: React.RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (active && ref.current) {
      ref.current.focus();
    }
  }, [active]);
}
