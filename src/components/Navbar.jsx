import { useState } from "react";
import { Plus, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import navigation from "../data/navigation";
import SubmitLiftCard from "./SubmitLiftCard";

const paths = {
  Home: "/home",
  Rank: "/leaderboard",
  Profile: "/profile",
};

function Navbar({ activePage = "Home", onLiftCreated }) {
  const navigate = useNavigate();

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const goTo = (name) => {
    if (name === "Add Lift") {
      setIsSubmitOpen(true);
      return;
    }

    if (paths[name]) {
      navigate(paths[name]);
    }
  };

  const handleLiftCreated = async () => {
    await onLiftCreated?.();
    setIsSubmitOpen(false);
  };

  return (
    <>
      {/* Desktop navbar */}
      <header className="hidden border-b border-zinc-800 bg-zinc-950 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2 font-black">
            <span className="rounded-xl bg-yellow-400 p-2 text-black">
              <Dumbbell size={22} />
            </span>

            <span>
              KHEUN <span className="text-yellow-400">LIFT</span>
            </span>
          </div>

          <nav className="flex items-center gap-2">
            {navigation.map(({ name, icon: Icon }) => {
              const isActive = name === activePage;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => goTo(name)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
                    isActive
                      ? "bg-yellow-400 text-black"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => goTo("Add Lift")}
              className="ml-2 flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-black hover:bg-amber-100"
            >
              <Plus size={18} />
              Add Lift
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile navbar */}
      <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-3xl border border-zinc-800 bg-zinc-950/95 px-3 py-3 shadow-2xl backdrop-blur md:hidden">
        {navigation.slice(0, 2).map(({ name, icon: Icon }) => (
          <button
            key={name}
            type="button"
            onClick={() => goTo(name)}
            aria-label={name}
            className={
              name === activePage ? "text-yellow-400" : "text-zinc-500"
            }
          >
            <Icon size={22} />
          </button>
        ))}

        <button
          type="button"
          onClick={() => goTo("Add Lift")}
          aria-label="Add Lift"
          className="-mt-9 grid size-14 place-items-center rounded-full border-4 border-black bg-yellow-400 text-black"
        >
          <Plus size={28} />
        </button>

        {navigation.slice(2).map(({ name, icon: Icon }) => (
          <button
            key={name}
            type="button"
            onClick={() => goTo(name)}
            aria-label={name}
            className={
              name === activePage ? "text-yellow-400" : "text-zinc-500"
            }
          >
            <Icon size={22} />
          </button>
        ))}
      </nav>

      {isSubmitOpen && (
        <SubmitLiftCard
          onClose={() => setIsSubmitOpen(false)}
          onSuccess={handleLiftCreated}
        />
      )}
    </>
  );
}

export default Navbar;
