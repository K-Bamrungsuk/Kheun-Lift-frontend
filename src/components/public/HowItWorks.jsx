import { ShieldCheck, Trophy, UserRoundPlus } from "lucide-react";

const steps = [
  {
    icon: UserRoundPlus,
    title: "Create Your Profile",
    description: "Enter your details and discover your weight class.",
  },
  {
    icon: ShieldCheck,
    title: "Submit Your Lift",
    description: "Submit your weight, reps, and video for verification.",
  },
  {
    icon: Trophy,
    title: "Climb the Ranking",
    description: "Compete with lifters in your own weight class.",
  },
];

function HowItWorks() {
  return (
    <section className="border-y border-zinc-800 bg-zinc-900/40 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow-500">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            THREE STEPS TO THE TOP
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-500">
                  <Icon size={25} />
                </div>

                <span className="text-3xl font-black text-zinc-800">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
