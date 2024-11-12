import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 text-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold mt-8">Desbravando o middleware do Next.js</h1>
        <p className="text-xl">Jorge Madson Santos Viana</p>
      </main>
      <footer className="mt-16 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/teste"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Rápida introdução ao Next.js→
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/teste"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Direto pro middleware →
        </a>
      </footer>
    </div>
  );
}