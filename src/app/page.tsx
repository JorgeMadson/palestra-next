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
        <h1 className="text-6xl mt-8 font-pirata">Desbravando o middleware do <span className="text-red-800">Next.js</span></h1>
        <p className="text-xl">por Jorge Madson Santos Viana</p>
      </main>
      <footer className="mt-16 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/autenticar"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Autenticação →
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/criar-produto"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Cadastrar produto →
        </a>
      </footer>
    </div>
  );
}