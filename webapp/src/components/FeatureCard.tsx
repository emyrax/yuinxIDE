interface FeatureCardProps {
  icon: React.ReactNode;
  tag: string;
  heading: string;
  description: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  tag,
  heading,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <article className="feature-card reveal" data-reveal-delay={delay}>
      <div className="feature-card-head">
        <div className="feature-icon" aria-hidden="true">
          {icon}
        </div>
        <span className="feature-tag">{tag}</span>
      </div>
      <h3>{heading}</h3>
      <p>{description}</p>
    </article>
  );
}
