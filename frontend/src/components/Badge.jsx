function Badge({ children, tone = "cyan" }) {
  return (
    <span className={`signal-badge signal-badge--${tone}`}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

export default Badge;
