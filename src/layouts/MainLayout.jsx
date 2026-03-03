import BackgroundEffects from "../components/BackgroundEffects";

export default function MainLayout({ children, parallaxOffset }) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
      <BackgroundEffects parallaxOffset={parallaxOffset} />
      <main className="relative z-10 mx-auto w-full max-w-6xl">{children}</main>
    </div>
  );
}
