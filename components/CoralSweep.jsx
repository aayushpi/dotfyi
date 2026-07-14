// The coral panel that the page-transition sweep animates. Rendered once,
// app-wide, so it survives route changes. See lib/sweep.js for the motion.
export default function CoralSweep() {
  return <div id="coral-sweep-veil" aria-hidden="true" className="coral-sweep-veil" />;
}
