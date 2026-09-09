import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, .toggle-switch-wrapper, .arch-node-btn, .filter-btn, .project-card');
      setHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: hovered ? '36px' : '10px',
        height: hovered ? '36px' : '10px',
        borderRadius: '50%',
        backgroundColor: hovered ? 'rgba(252, 232, 162, 0.2)' : '#fce8a2',
        border: hovered ? '1px solid rgba(252, 232, 162, 0.6)' : 'none',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.18s ease-out, height 0.18s ease-out, background-color 0.18s ease-out',
        zIndex: 9999,
        backdropFilter: hovered ? 'blur(1px)' : 'none',
      }}
    />
  );
};
