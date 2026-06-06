interface WorkflowStepProps {
  icon: React.ReactNode;
  heading: string;
  label: string;
  description: string;
  labelSuccess?: boolean;
}

export function WorkflowStep({
  icon,
  heading,
  label,
  description,
  labelSuccess,
}: WorkflowStepProps) {
  return (
    <article className="workflow-step">
      <div className="workflow-step-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{heading}</h3>
      <span
        className={`workflow-step-label${labelSuccess ? ' workflow-step-label-success' : ''}`}
      >
        {label}
      </span>
      <p>{description}</p>
    </article>
  );
}
