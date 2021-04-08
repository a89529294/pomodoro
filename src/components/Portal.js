import { useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  /**
   * keeps ref between renders
   */
  const el = useRef(null);

  /**
   * create element if empty (for the first time render only)
   */
  if (!el.current) {
    el.current = document.createElement('div');
    el.current.style.cssText = `
    position:absolute;
    height: calc(var(--vh, 1vh) * 100);
    width:100vw;
    top:0;
    left:0;
    z-index:1000;
    `;
  }

  useEffect(() => {
    const mount = document.getElementById('portal-root');
    const { current } = el;

    mount.appendChild(current);
    return () => mount.removeChild(current);
  }, []); // no dependencies to avoid rerenders

  return createPortal(children, el.current);
};

export default memo(Portal);
