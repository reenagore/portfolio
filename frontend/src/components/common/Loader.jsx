export default function Loader({ text = "Loading..." }) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
          {text}
        </div>
      </div>
    );
  }