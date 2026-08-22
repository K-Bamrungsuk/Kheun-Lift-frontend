function NavItem({ item, isActive, onNavigate, variant = "desktop" }) {
  const { name, path, icon: Icon, disabled } = item;
  const isMobile = variant === "mobile";

  const desktopClass = disabled
    ? "cursor-not-allowed text-zinc-700"
    : isActive
      ? "bg-yellow-400 text-black"
      : "text-zinc-400 hover:bg-zinc-900 hover:text-white";

  const mobileClass = disabled
    ? "cursor-not-allowed text-zinc-700"
    : isActive
      ? "text-yellow-400"
      : "text-zinc-500";

  return (
    <button
      type="button"
      onClick={() => onNavigate(path)}
      disabled={disabled}
      aria-label={isMobile ? name : undefined}
      className={
        isMobile
          ? mobileClass
          : `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${desktopClass}`
      }
    >
      <Icon size={isMobile ? 22 : 18} />

      {!isMobile && name}
    </button>
  );
}

export default NavItem;
