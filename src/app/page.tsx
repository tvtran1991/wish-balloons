import CreateForm from "@/components/create/CreateForm";
import SkyBackground from "@/components/sky/SkyBackground";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel: form */}
      <div className="w-full lg:w-[420px] shrink-0 bg-panel-bg px-6 py-10 lg:py-16 lg:px-10 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full">
          <h1 className="text-3xl font-bold text-text-primary mb-1">
            Wish Balloon
          </h1>
          <p className="text-text-secondary mb-6">
            Write a wish and release it into the sky.
          </p>
          <CreateForm />
        </div>
      </div>

      {/* Right panel: sky with clouds (hidden on mobile) */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <SkyBackground />
      </div>
    </main>
  );
}
