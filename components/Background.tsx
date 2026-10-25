// Animated page background: a warm gradient with large, blurred color blobs
// drifting slowly behind everything. Self-contained so it can be swapped for
// other scenes later. The blobs freeze when the user prefers reduced motion.
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-cream via-daisy/40 to-taupe/60"
    >
      <div className="absolute -top-1/4 -left-1/4 size-[60vmax] rounded-full bg-daisy/70 blur-3xl animate-drift-a motion-reduce:animate-none" />
      <div className="absolute -right-1/4 -bottom-1/4 size-[55vmax] rounded-full bg-taupe/60 blur-3xl animate-drift-b motion-reduce:animate-none" />
      <div className="absolute top-1/3 left-1/3 size-[40vmax] rounded-full bg-daisy-deep/40 blur-3xl animate-drift-c motion-reduce:animate-none" />
    </div>
  );
}
