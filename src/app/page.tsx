import Calculator from "@/components/Calculator/Calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center p-4 sm:p-8 selection:bg-orange-500/30">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 mb-2 tracking-tighter">
            PRO CALC
          </h1>
          <p className="text-gray-500 font-medium tracking-widest text-xs uppercase">
            Premium Precision
          </p>
        </div>
        
        <Calculator />
        
        <footer className="mt-12 text-center">
          <p className="text-gray-600 text-sm font-medium">
            Designed for Performance
          </p>
        </footer>
      </div>
    </main>
  );
}
