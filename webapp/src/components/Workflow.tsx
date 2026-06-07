import { WorkflowStep } from './WorkflowStep';

function Arrow() {
  return (
    <div className="workflow-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  );
}

export function Workflow() {
  return (
    <section className="section workflow" id="workflow">
      <div className="section-head reveal workflow-head">
        <h2>From napkin sketch to shipped hardware</h2>
        <p>Describe what you want to build. Yuinx handles the rest.</p>
        <p className="workflow-subcopy">Hardware, wiring, and code — in one AI-powered flow.</p>
      </div>

      <div className="workflow-shell reveal" data-reveal-delay="60">
        <div className="workflow-flow" aria-label="Yuinx workflow timeline">
          <WorkflowStep
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 7.5h12a3 3 0 0 1 3 3v.5a3 3 0 0 1-3 3H12l-4.2 3v-3H6a3 3 0 0 1-3-3v-.5a3 3 0 0 1 3-3Z" />
                <path d="M8.5 10.5h7" />
                <path d="M8.5 13h4.5" />
              </svg>
            }
            heading="Idea"
            label="Prompt"
            description="Describe the hardware / software project you want to build or fix."
          />

          <Arrow />

          <WorkflowStep
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="4" y="5" width="6" height="6" rx="2" />
                <rect x="14" y="4" width="6" height="6" rx="2" />
                <rect x="9" y="14" width="6" height="6" rx="2" />
                <path d="M10 8h4" />
                <path d="M8.5 11 10.8 14" />
                <path d="M15.5 10 13.2 14" />
              </svg>
            }
            heading="Context"
            label="System"
            description="Understands the full build — parts, wiring, code to step by step guides."
          />

          <Arrow />

          <WorkflowStep
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 8h8" />
                <path d="M8 12h6" />
                <path d="M8 16h8" />
                <rect x="4" y="5" width="16" height="14" rx="3" />
              </svg>
            }
            heading="Build"
            label="Code + Circuit + Parts"
            description="Generate circuits, code, and physical layouts together."
          />

          <Arrow />

          <WorkflowStep
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3v5" />
                <path d="M12 16v5" />
                <path d="M4.9 4.9l3.5 3.5" />
                <path d="M15.6 15.6l3.5 3.5" />
                <path d="M3 12h5" />
                <path d="M16 12h5" />
                <path d="m8.6 15.4 6.8-6.8" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            }
            heading="Debug"
            label="Verify"
            description="Test and fix wiring, code, and connections fast."
          />

          <Arrow />

          <WorkflowStep
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4 4L19 6" />
              </svg>
            }
            heading="Ship"
            label="Ready"
            description="Upload, test, and build with confidence."
            labelSuccess
          />
        </div>
      </div>
    </section>
  );
}
