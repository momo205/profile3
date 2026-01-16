import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Work from "@/components/sections/work";
import Experience from "@/components/sections/experience";
import Process from "@/components/sections/process";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="w-full min-w-0 overflow-x-hidden">
      <Hero />
      <Services />
      <Work />
      <Experience />
      <Process />
      <Contact />
    </main>
  );
}

