export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-2xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
          Preparing checkout...
        </h2>
        <p className="text-zinc-400">
          We're getting everything ready for your purchase
        </p>
      </div>
    </div>
  );
}
