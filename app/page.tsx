"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

/* ------------------------------------------------------------------ */
/*  Icons — inlined so they inherit `currentColor`                     */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

function PopUpStoreIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M17 6h3l-2-4h-4l-2 4h3v4H9V8H3v2H2v2h20v-2h-5zm4 16v-9H3v9h2v-2h14v2z"
      />
    </svg>
  );
}

function FleaMarketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 28 24" className={className} fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M.482 24a.393.393 0 0 1-.389-.393v-1.783c0-.217.176-.393.393-.393h1.347V8.671a.8.8 0 0 1 .039-.244l-.002.006a3.27 3.27 0 0 1-1.8-1.287l-.007-.011A.4.4 0 0 1 0 6.921V.394C0 .177.176.001.393 0h27.014c.217 0 .393.176.393.393V6.92a.4.4 0 0 1-.064.215l.001-.002a3.49 3.49 0 0 1-2.687 1.468h-.008V21.43h1.091c.217 0 .393.176.393.393v1.783a.393.393 0 0 1-.393.393h-.001zm22.99-2.965V8.673q0-.106.026-.202l-.001.006a3.5 3.5 0 0 1-1.53-.836l.002.002a3.82 3.82 0 0 1-2.68.976h.006a3.8 3.8 0 0 1-2.69-.996l.003.003a3.8 3.8 0 0 1-2.574.995l-.119-.002h.006a3.82 3.82 0 0 1-2.69-.996l.003.003a3.8 3.8 0 0 1-2.575.995l-.128-.002h.006a3.8 3.8 0 0 1-2.69-.996l.003.003a3.74 3.74 0 0 1-2.441.993h-.005v12.417H4.56v-5.253c0-.217.176-.393.393-.393h4.651c.217 0 .393.176.393.393v5.253zM19.295 7.833a3.03 3.03 0 0 0 2.2-.835l-.001.001a.4.4 0 0 1-.009-.083V.787h-4.41V6.92l.001.027l-.001.028v-.001a3.03 3.03 0 0 0 2.117.861l.11-.002h-.005zm-10.758 0l.106.002c.824 0 1.571-.328 2.118-.861l-.001.001l-.001-.027l.001-.028v.001V.788H6.312v6.133l.001.027l-.001.028v-.001a3.03 3.03 0 0 0 2.117.861l.112-.002h-.005zm2.873 10.495a.393.393 0 0 1-.393-.393v-6.821c0-.217.176-.393.393-.393h11.009c.217 0 .393.176.393.393v6.822a.393.393 0 0 1-.393.393h-.001z"
      />
    </svg>
  );
}

function ShopOwnersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M20.6 5.26a2.51 2.51 0 0 0-2.48-2.2H5.885a2.51 2.51 0 0 0-2.48 2.19l-.3 2.47a3.4 3.4 0 0 0 1.16 2.56v8.16a2.5 2.5 0 0 0 2.5 2.5h10.47a2.5 2.5 0 0 0 2.5-2.5v-8.16A3.4 3.4 0 0 0 20.9 7.72Zm-6.59 14.68h-4v-4.08a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5Zm4.73-1.5a1.5 1.5 0 0 1-1.5 1.5h-2.23v-4.08a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 0-2.5 2.5v4.08H6.765a1.5 1.5 0 0 1-1.5-1.5v-7.57a3.2 3.2 0 0 0 1.24.24a3.36 3.36 0 0 0 2.58-1.19a.24.24 0 0 1 .34 0a3.36 3.36 0 0 0 2.58 1.19A3.4 3.4 0 0 0 14.6 9.92a.22.22 0 0 1 .16-.07a.24.24 0 0 1 .17.07a3.36 3.36 0 0 0 2.58 1.19a3.2 3.2 0 0 0 1.23-.24Zm-1.23-8.33a2.39 2.39 0 0 1-1.82-.83a1.2 1.2 0 0 0-.92-.43h-.01a1.2 1.2 0 0 0-.92.42a2.476 2.476 0 0 1-3.65 0a1.24 1.24 0 0 0-1.86 0A2.405 2.405 0 0 1 4.1 7.78l.3-2.4a1.52 1.52 0 0 1 1.49-1.32h12.23a1.5 1.5 0 0 1 1.49 1.32l.29 2.36a2.39 2.39 0 0 1-2.395 2.37Z"
      />
    </svg>
  );
}

function SoloShopkeeperIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" aria-hidden>
      <g fill="currentColor">
        <circle cx="6" cy="3" r="3" />
        <path d="M6 7a5 5 0 0 0-5 4.42a.51.51 0 0 0 .5.58h8.94a.51.51 0 0 0 .5-.58A5 5 0 0 0 6 7" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  3D model — TheSpeaker.glb, large, draggable, auto-rotating          */
/* ------------------------------------------------------------------ */

function Model({ spinning }: { spinning: boolean }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/models/TheSpeaker.glb");

  useFrame((_, delta) => {
    if (spinning && group.current) group.current.rotation.y += delta * 0.3;
  });

  // scale pushed further so the model reads big and confident in its frame
  return (
    <group ref={group} dispose={null} scale={2.05}>
      <primitive object={scene} />
    </group>
  );
}

function SpinRig({
  autoRotate,
  yawRef,
}: {
  autoRotate: boolean;
  yawRef: React.MutableRefObject<number>;
}) {
  const outer = useRef<Group>(null);
  useFrame(() => {
    if (outer.current) outer.current.rotation.y = yawRef.current;
  });
  return (
    <group ref={outer} position={[0, -0.08, 0]}>
      <Model spinning={autoRotate} />
    </group>
  );
}

function SpeakerModelInner() {
  const dragging = useRef(false);
  const last = useRef(0);
  const yaw = useRef(0);

  return (
    <div
      className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
      role="img"
      aria-label="A 3D model of the Alert Box UPI payment sound box. Drag to rotate."
      onPointerDown={(e) => {
        dragging.current = true;
        last.current = e.clientX;
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - last.current;
        last.current = e.clientX;
        yaw.current += dx * 0.01;
      }}
    >
      {/* Camera sits close with a tight fov so the model fills the box */}
      <Canvas
        camera={{ position: [1.7, 1.05, 4], fov: 5 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 2]} intensity={1.6} />
        <directionalLight position={[-3, 1, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          <SpinRig autoRotate yawRef={yaw} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.05, 0]}
            opacity={0.35}
            scale={8}
            blur={2.4}
            far={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Client-only: WebGL has no meaning during server rendering.
const SpeakerModel = dynamic(() => Promise.resolve(SpeakerModelInner), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-[13px] text-ink/40">
      loading model…
    </div>
  ),
});

useGLTF.preload("/models/TheSpeaker.glb");

/* ------------------------------------------------------------------ */
/*  Content                                                              */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#ideal-for", label: "Ideal for" },
];

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Connect it to a phone",
    copy: "Pair Alert Box with the phone that already receives your UPI payments. No new SIM, no app to configure.",
  },
  {
    n: "02",
    title: "A payment comes in",
    copy: "Any UPI app on that phone can trigger it — GPay, PhonePe, Paytm, or your bank's own app.",
  },
  {
    n: "03",
    title: "Alert Box speaks up",
    copy: "It reads the amount out loud in seconds, so you can confirm the sale without looking away from your customer.",
  },
];

const IDEAL_FOR = [
  {
    Icon: PopUpStoreIcon,
    title: "Pop-up store",
    copy:
      "For a pop-up store that needs a sound box for tomorrow's stall and can't wait out the KYC process of a traditional sound box — if you're the owner, Alert Box is perfect for you.",
  },
  {
    Icon: FleaMarketIcon,
    title: "Flea Market",
    copy:
      "For people who set up their own product at the flea market — if your UPI payments come to your phone alone, Alert Box is for you.",
  },
  {
    Icon: ShopOwnersIcon,
    title: "Shop owners",
    copy:
      "Family-owned businesses or shops where payment comes directly to a phone that's always nearby — Alert Box is the perfect alternative.",
  },
  {
    Icon: SoloShopkeeperIcon,
    title: "Solo Shopkeeper",
    copy:
      "If you've opened a small shop that's fully run by you, and you're always there, Alert Box is an affordable sound box for you.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                 */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#top" className="font-display text-lg font-black tracking-tightest text-ink">
            ALERT BOX
          </a>
          <nav className="hidden items-center gap-7 text-[13px] text-ink/70 sm:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#get-one"
            className="rounded-sm bg-ink px-4 py-2 text-[13px] font-bold text-paper transition-colors hover:bg-teal-700"
          >
            Get AlertBox
          </a>
        </div>
      </header>

      {/* Hero — centred title, as in the reference layout */}
      <section id="top" className="px-5 pt-16 text-center sm:px-8 sm:pt-24">
        <h1 className="font-display text-[18vw] font-black leading-none tracking-tightest text-ink sm:text-7xl md:text-8xl">
          ALERT BOX
        </h1>
        <p className="mt-4 text-lg italic text-ink/70 sm:text-xl">
          UPI Payment Sound Box
        </p>
      </section>

      {/* Feature — text left, big 3D model right */}
      <section id="product" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
              An UPI sound box for solo
              <br className="hidden sm:block" /> business owners
            </h2>
            <p className="mt-4 max-w-md text-justify text-[15px] leading-relaxed text-ink/80">
              Alert box is a UPI payment alert box used to provide audio
              confirmation of a successful UPI payment. There is no monthly
              subscription. Alert box works by connecting to the shop
              owner&rsquo;s phone or in whichever phone the payment is
              received.
            </p>
          </div>

          {/* Model box — large, filling most of its column */}
          <div className="relative mx-auto aspect-square w-full max-w-lg rounded-2xl border border-line bg-paper-dim/40 sm:max-w-2xl lg:max-w-none">
            <SpeakerModel />
            <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-[11px] text-ink/40">
              drag to rotate
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-line bg-paper-dim/50 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-ink sm:text-4xl">
            How it works
          </h2>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.n}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-black text-teal-200">
                    {step.n}
                  </span>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden h-px flex-1 bg-[repeating-linear-gradient(to_right,#B8AF98_0,#B8AF98_6px,transparent_6px,transparent_12px)] sm:block"
                    />
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/70">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ideal for — heading + four cards */}
      <section id="ideal-for" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-ink sm:text-4xl">
            Alert Box is Ideal For:
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {IDEAL_FOR.map(({ Icon, title, copy }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-2xl border border-line px-6 py-8 text-center transition-colors hover:border-teal-400"
              >
                <Icon className="h-9 w-9 text-ink" />
                <h3 className="mt-6 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-ink/70">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section id="get-one" className="border-t border-line bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h2 className="font-display text-3xl font-bold text-paper sm:text-5xl">
            Never miss a payment again
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-paper/70">
            One-time cost, no subscription, working out of the box for solo
            shop owners, flea market sellers, and pop-up stalls.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:vkhdstudio2@gmail.com"
              className="rounded-sm bg-teal-400 px-6 py-3 text-[13px] font-bold text-teal-900 transition-colors hover:bg-teal-200"
            >
              Reserve an Alert Box
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-8 text-[12px] text-ink/50 sm:flex-row sm:justify-between sm:px-8">
          <span className="font-display font-bold text-ink/70">ALERT BOX</span>
          <span>UPI Payment Sound Box — no subscription, ever.</span>
          <span>© {new Date().getFullYear()} Alert Box</span>
        </div>
      </footer>
    </main>
  );
}