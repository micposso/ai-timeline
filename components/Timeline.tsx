'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type TimelineEvent = {
  id: number;
  date: string;
  year: number;
  title: string;
  description: string;
  category: string;
  people: string[];
};

type TimelineProps = {
  title: string;
  events: TimelineEvent[];
};

function formatDate(date: string, year: number) {
  const month = date.match(/-(\d{2})/)?.[1];
  if (!month) return String(year);

  return new Intl.DateTimeFormat('en-US', { month: 'short' })
    .format(new Date(Date.UTC(year, Number(month) - 1, 1)))
    .toUpperCase() + ` ${year}`;
}

export function Timeline({ title, events }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const eventRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeEvent = events[activeIndex];

  const selectEvent = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(index, events.length - 1));
    setActiveIndex(nextIndex);
    eventRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [events.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') selectEvent(activeIndex - 1);
      if (event.key === 'ArrowRight') selectEvent(activeIndex + 1);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, selectEvent]);

  if (!activeEvent) return null;

  return (
    <section className="timeline-section" aria-labelledby="timeline-title">
      <div className="timeline-topline">
        <span className="timeline-kicker">A visual history</span>
        <span className="timeline-count">{String(events.length).padStart(2, '0')} moments</span>
      </div>

      <div className="timeline-intro">
        <div>
          <p className="timeline-index">01 / 01</p>
          <h1 id="timeline-title">{title}</h1>
        </div>
        <p className="timeline-intro-copy">
          Fifteen turning points that shaped how we think about intelligent machines,
          from the first question to the systems we live with today.
        </p>
      </div>

      <div className="timeline-controls" aria-label="Timeline controls">
        <span className="timeline-position" aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')} <span>/</span> {String(events.length).padStart(2, '0')}
        </span>
        <div className="timeline-buttons">
          <button type="button" className="timeline-button" onClick={() => selectEvent(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous timeline event">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="timeline-button" onClick={() => selectEvent(activeIndex + 1)} disabled={activeIndex === events.length - 1} aria-label="Next timeline event">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="timeline-rail" role="tablist" aria-label="Artificial intelligence history events">
        <div className="timeline-line" aria-hidden="true" />
        {events.map((event, index) => (
          <button
            key={event.id}
            ref={(element) => { eventRefs.current[index] = element; }}
            type="button"
            className={`timeline-event ${index === activeIndex ? 'is-active' : ''}`}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`timeline-panel-${event.id}`}
            onClick={() => selectEvent(index)}
          >
            <span className="timeline-event-marker" aria-hidden="true" />
            <span className="timeline-event-year">{event.year}</span>
            <span className="timeline-event-category">{event.category}</span>
            <span className="timeline-event-title">{event.title}</span>
          </button>
        ))}
      </div>

      <article className="timeline-detail" id={`timeline-panel-${activeEvent.id}`} role="tabpanel" aria-label={`Details for ${activeEvent.title}`}>
        <div className="timeline-detail-date">
          <span>{formatDate(activeEvent.date, activeEvent.year)}</span>
          <span className="timeline-detail-rule" aria-hidden="true" />
          <span>{activeEvent.category}</span>
        </div>
        <div className="timeline-detail-content">
          <h2>{activeEvent.title}</h2>
          <p>{activeEvent.description}</p>
          {activeEvent.people.length > 0 && (
            <p className="timeline-people"><span>People</span> {activeEvent.people.join(' · ')}</p>
          )}
        </div>
        <span className="timeline-detail-number" aria-hidden="true">{String(activeEvent.id).padStart(2, '0')}</span>
      </article>

      <p className="timeline-hint">Use the arrows or ← → keys to explore the timeline</p>
    </section>
  );
}
