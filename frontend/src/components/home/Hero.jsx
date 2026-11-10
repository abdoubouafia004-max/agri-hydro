import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/mock.js';
import ProductArt from '../common/ProductArt.jsx';
import Wave from '../common/Wave.jsx';
import AnimatedContent from '../common/AnimatedContent.jsx';

const AUTOPLAY_MS = 6500;
const DRAG_THRESHOLD = 6;   // px avant qu'un clic devienne un glisser
const SWIPE_RATIO = 0.12;   // part de la largeur à glisser pour changer de diapositive

// Carrousel défilable : glisser au doigt / pavé tactile (scroll-snap natif),
// glisser à la souris, flèches, points et touches ← →. Défilement auto en pause au survol / focus.
export default function Hero() {
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClick = useRef(false);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduce = useRef(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  const count = heroSlides.length;

  const goTo = useCallback((n) => {
    const el = trackRef.current;
    if (!el) return;
    const idx = ((n % count) + count) % count;
    el.scrollTo({ left: idx * el.clientWidth, behavior: reduce.current ? 'auto' : 'smooth' });
  }, [count]);

  // L'index suit la position de défilement (quelle que soit la façon de faire défiler).
  useEffect(() => {
    const el = trackRef.current;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        setI(Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / w))));
      });
    };
    // Garde la diapositive courante alignée si la largeur change.
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => { el.scrollLeft = Math.round(el.scrollLeft / (el.clientWidth || 1)) * el.clientWidth; })
      : null;
    ro?.observe(el);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); ro?.disconnect(); cancelAnimationFrame(raf); };
  }, [count]);

  // Défilement automatique ; le minuteur repart après chaque changement de diapositive.
  useEffect(() => {
    if (paused || dragging || reduce.current) return undefined;
    const t = setTimeout(() => goTo(i + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [i, paused, dragging, goTo]);

  // Glisser à la souris (le tactile utilise le défilement natif).
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = trackRef.current;
    dragRef.current = { x: e.clientX, left: el.scrollLeft, start: Math.round(el.scrollLeft / el.clientWidth), id: e.pointerId, moved: false };
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.id) return;
    const el = trackRef.current;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      setDragging(true);
      el.style.scrollSnapType = 'none';
      try { el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    }
    el.scrollLeft = d.left - dx;
  };
  const endDrag = (e) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.id) return;
    dragRef.current = null;
    if (!d.moved) return;
    const el = trackRef.current;
    try { el.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    const dx = e.clientX - d.x;
    let target = d.start;
    if (Math.abs(dx) > el.clientWidth * SWIPE_RATIO) target += dx < 0 ? 1 : -1;
    target = Math.min(count - 1, Math.max(0, target));
    suppressClick.current = true;
    setDragging(false);
    el.scrollTo({ left: target * el.clientWidth, behavior: reduce.current ? 'auto' : 'smooth' });
    // Réactive l'aimantation une fois l'animation terminée.
    setTimeout(() => { el.style.scrollSnapType = ''; }, 600);
  };
  const onClickCapture = (e) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(i - 1); }
  };

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="À la une" onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>
      <div ref={trackRef} className={dragging ? 'hero-track dragging' : 'hero-track'} aria-live={paused ? 'polite' : 'off'}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}
        onClickCapture={onClickCapture} onDragStart={(e) => e.preventDefault()}>
        {heroSlides.map((s, n) => (
          <div key={s.id} className="hero-slide" role="group" aria-roledescription="diapositive"
            aria-label={`${n + 1} sur ${count}`} aria-hidden={n !== i ? true : undefined} inert={n !== i ? '' : undefined}>
            <div className="wrap hero-grid">
              <AnimatedContent className="hero-text" trigger="mount" distance={36} duration={0.7} stagger={0.12}>
                {n === 0 ? <h1>{s.title}</h1> : <h2 className="h1">{s.title}</h2>}
                <ul>{s.points.map((p) => <li key={p}><i className="fa-solid fa-circle-check" /> {p}</li>)}</ul>
                <div className="hero-cta">
                  <Link className="btn btn-leaf" to={s.to} draggable={false}>{s.cta}</Link>
                  <Link className="btn btn-ghost" to="/contact" draggable={false}>Demander un conseil</Link>
                </div>
              </AnimatedContent>
              <div className="hero-art"><ProductArt kind={s.kind} label={s.title} /></div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-nav">
        <button type="button" className="hero-arrow" aria-label="Diapositive précédente" onClick={() => goTo(i - 1)}>
          <i className="fa-solid fa-chevron-left" />
        </button>
        <div className="dots" role="group" aria-label="Choisir une diapositive">
          {heroSlides.map((d, n) => (
            <button key={d.id} type="button" aria-current={n === i ? 'true' : undefined} aria-label={`Diapositive ${n + 1} sur ${count}`}
              className={n === i ? 'on' : ''} onClick={() => goTo(n)} />
          ))}
        </div>
        <button type="button" className="hero-arrow" aria-label="Diapositive suivante" onClick={() => goTo(i + 1)}>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
      <Wave fill="#fff" />
    </section>
  );
}
