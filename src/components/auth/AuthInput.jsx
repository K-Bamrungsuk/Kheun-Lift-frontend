function AuthInput({ icon: Icon, label, rightContent, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">{label}</span>

        {rightContent}
      </span>

      <span className="relative block">
        <Icon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          {...inputProps}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 py-3 pl-10 pr-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
      </span>
    </label>
  );
}

export default AuthInput;
