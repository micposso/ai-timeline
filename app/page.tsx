import timeline from "@/data/timeline.json";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <div className="timeline-app">
      <header className="timeline-header">
        <a className="timeline-brand" href="#top" aria-label="History of Artificial Intelligence home">
          <span className="timeline-brand-mark">ai</span>
          <span>Archive / 01</span>
        </a>
        <span className="timeline-header-note">An evolving field</span>
      </header>
      <main id="top">
        <Timeline title={timeline.title} events={timeline.events} />
      </main>
      <footer className="timeline-footer">
        <span>Research, systems, and society</span>
        <span>1950 — 2024</span>
      </footer>
    </div>
  );
}
