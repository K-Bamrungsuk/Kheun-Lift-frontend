import { Dumbbell } from "lucide-react";

function HomeHeader() {
  return (
    <>
      <header className="flex items-center justify-between md:hidden">
        <h1 className="text-3xl font-black">Home</h1>

        <span className="rounded-2xl bg-yellow-400 p-3 text-black">
          <Dumbbell size={22} />
        </span>
      </header>

      <div className="hidden md:block">
        <h1 className="text-4xl font-black">Home</h1>
      </div>
    </>
  );
}

export default HomeHeader;
