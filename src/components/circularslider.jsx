import { useRef, useState, useCallback, useEffect } from "react";

/**
 * CircularSlider — cards arranged in a circle, continuously revolving.
 * Front-facing card is large and fully readable; others shrink toward
 * the back. Never stops on hover — only pauses while actively dragging.
 * Styled with TeamSumit design tokens (see src/styles/tokens.css).
 *
 * Usage:
 * <CircularSlider items={[{ title: "...", meta: "..." }, ...]} />
 */
export default function CircularSlider({
  items,
  radius = 300,
  cardWidth = 260,
  rotateSpeed = 0.79, // degrees per frame (~5deg/sec at 60fps)
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const dragState = useRef({ dragging: false, startX: 0, startRotation: 0 });
  const [effectiveRadius, setEffectiveRadius] = useState(radius);
  const rafRef = useRef(null);

  const count = items?.length ?? 0;
  const anglePerItem = count > 0 ? 360 / count : 0;

  // Clamp radius so cards never spill past the container edges
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resize = () => {
      const w = el.offsetWidth;
      const maxRadius = w / 2 - cardWidth / 2 - 16;
      setEffectiveRadius(Math.max(90, Math.min(radius, maxRadius)));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius, cardWidth]);

  // Continuous rotation — only pauses while dragging, never on hover
  useEffect(() => {
    const tick = () => {
      if (!dragState.current.dragging) {
        rotationRef.current += rotateSpeed;
        setRotation(rotationRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rotateSpeed]);

  const onPointerDown = useCallback((e) => {
    dragState.current.dragging = true;
    dragState.current.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragState.current.startRotation = rotationRef.current;
    containerRef.current?.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragState.current.dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const deltaX = x - dragState.current.startX;
    rotationRef.current = dragState.current.startRotation + deltaX * 0.3;
    setRotation(rotationRef.current);
  }, []);

  const onPointerUp = useCallback((e) => {
    dragState.current.dragging = false;
    containerRef.current?.releasePointerCapture?.(e.pointerId);
  }, []);

  if (!count) return null;

  return (
    <div
      ref={containerRef}
      className="circular-slider"
      style={{ "--radius": `${effectiveRadius}px` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div
        className="circular-slider__stage"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {items.map((item, i) => {
          const angle = anglePerItem * i;
          const normalized = ((angle + rotation) % 360 + 360) % 360;
          const distFromFront = Math.min(normalized, 360 - normalized);
          const focus = 1 - distFromFront / 180; // 1 = front, 0 = back

          // Front card gets noticeably bigger; back cards shrink more
          const scale = 0.55 + focus * focus * 0.75;

          return (
            <div
              key={i}
              className="circular-slider__item"
              style={{
                transform: `rotate(${angle}deg) translateY(calc(var(--radius) * -1))`,
              }}
            >
              <div
                className="circular-slider__card"
                style={{
                  transform: `rotate(${-angle - rotation}deg) scale(${scale})`,
                  opacity: 0.35 + focus * 0.65,
                  zIndex: Math.round(focus * 1000),
                  width: cardWidth,
                  marginLeft: -(cardWidth / 2),
                }}
              >
                {item.meta && (
                  <div className="circular-slider__meta">{item.meta}</div>
                )}
                <div className="circular-slider__title">{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .circular-slider {
          position: relative;
          width: 100%;
          max-width: 100vw;
          height: calc(var(--radius) * 2.2);
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
          cursor: grab;
          user-select: none;
          overflow: hidden;
          box-sizing: border-box;
        }
        .circular-slider:active {
          cursor: grabbing;
        }
        .circular-slider__stage {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }
        .circular-slider__item {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center bottom;
        }
        .circular-slider__card {
          position: relative;
          left: 50%;
          transform-origin: center;
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-lg);
          padding: var(--space-5) var(--space-6);
          box-shadow: var(--shadow-lg);
          pointer-events: none;
          font-family: var(--font-family-body);
          box-sizing: border-box;
          /* No line-clamp — text wraps fully, card grows to fit it */
        }
        .circular-slider__meta {
          font-family: var(--font-family-mono);
          font-size: var(--font-size-xs);
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: var(--space-2);
        }
        .circular-slider__title {
          font-family: var(--font-family-heading);
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-base);
          line-height: var(--line-height-snug);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text-primary);
          word-wrap: break-word;
        }

        @media (max-width: 640px) {
          .circular-slider__card {
            padding: var(--space-4) var(--space-5);
          }
        }
      `}</style>
    </div>
  );
}