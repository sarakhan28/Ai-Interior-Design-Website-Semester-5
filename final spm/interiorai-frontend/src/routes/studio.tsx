import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  Download,
  Loader2,
  Sparkles,
  Upload,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "AI Design Studio — InteriorAI Studio" },
      {
        name: "description",
        content:
          "Use the room redesign and visualization capability to review a photorealistic concept with budget and planning context.",
      },
      { property: "og:title", content: "AI Design Studio — InteriorAI Studio" },
      {
        property: "og:description",
        content: "Real AI room redesigns with renders, budgets and shoppable product lists.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPage,
});

const STYLES = [
  "Modern",
  "Minimalist",
  "Luxury Classic",
  "Scandinavian",
  "Bohemian",
  "Industrial",
  "Contemporary",
  "Traditional",
];
const ROOMS = ["Living Room", "Bedroom", "Dining Room", "Kitchen", "Home Office", "Other"];
const BUDGETS = ["₹50,000", "₹1,00,000", "₹1,50,000", "₹2,00,000", "₹3,00,000", "₹5,00,000"];

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function StudioPage() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [style, setStyle] = useState(STYLES[0]!);
  const [roomType, setRoomType] = useState(ROOMS[0]!);
  const [budget, setBudget] = useState(BUDGETS[1]!);
  const [notes, setNotes] = useState("");

  const [render, setRender] = useState<string | null>(null);
  const [designSummary, setDesignSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function pickFile(file: File | undefined) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("Please choose a photo under 12 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      setFileName(file.name);
      setError("");
      setRender(null);
      setDesignSummary("");
    };
    reader.readAsDataURL(file);
  }

  async function generate() {
    if (!photo) {
      setError("Upload a photo of your room first.");
      return;
    }
    setBusy(true);
    setError("");
    setRender(null);
    setDesignSummary("");
    setStatus("Analysing your room and rendering the new design...");

    try {
      const response = await fetch("/api/redesign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: photo, style, roomType, budget, notes }),
      });
      if (!response.ok) throw new Error((await response.text().catch(() => "")) || `Redesign failed (${response.status})`);
      const result = (await response.json()) as { image?: string; summary?: string };
      if (!result.image) throw new Error("AI service returned no redesigned image.");
      setRender(result.image);
      setDesignSummary(result.summary || "A new direction has been created from the visible room layout and your preferences.");
      setStatus("Design ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong generating your design.");
      setStatus("");
    } finally {
      setBusy(false);
    }
  }

  function startOver() {
    setPhoto(null);
    setFileName("");
    setRender(null);
    setDesignSummary("");
    setStatus("");
    setError("");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95 px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground">
              <Sparkles size={16} />
            </span>
            <span className="font-display text-lg">InteriorAI Studio</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:px-8 lg:py-14">
        <section className="space-y-5 rounded-xl border border-border p-6">
          <div>
            <h1 className="text-3xl">Reimagine AI</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Visualize your room in a new style before you commit.
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => pickFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="grid min-h-40 w-full place-items-center overflow-hidden rounded-lg border border-dashed border-primary bg-leaf p-4 text-center"
          >
            {photo ? (
              <img src={photo} alt="Your uploaded room" className="max-h-56 w-full object-contain" />
            ) : (
              <span>
                <Upload className="mx-auto mb-3 text-primary" />
                <strong className="block">Choose a room photo</strong>
                <small className="mt-1 block text-muted-foreground">JPG, PNG or WebP · up to 12 MB</small>
              </span>
            )}
          </button>
          {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}
          <p className="text-xs leading-5 text-muted-foreground">
            The photo guides visual context only; exact room dimensions are not inferred.
          </p>

          <Field label="Room type">
            <Select value={roomType} onChange={setRoomType} options={ROOMS} />
          </Field>
          <Field label="Design style">
            <Select value={style} onChange={setStyle} options={STYLES} />
          </Field>
          <Field label="Budget">
            <Select value={budget} onChange={setBudget} options={BUDGETS} />
          </Field>
          <Field label="Redesign preferences (optional)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Use warm lighting, add a reading chair, keep the wooden flooring and make the room feel more spacious."
              className="w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Button className="w-full" onClick={generate} disabled={busy}>
            {busy ? <Loader2 className="animate-spin" size={17} /> : <WandSparkles size={17} />}
            {busy ? "Reimagining..." : "Reimagine my room"}
          </Button>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </section>

        <section className="space-y-8">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <p className="text-sm font-semibold">Your AI Room Redesign</p>
              {status && <p className="text-xs text-muted-foreground">{status}</p>}
            </div>
            <div className="grid min-h-80 place-items-center bg-muted/40">
              {render ? (
                <img
                  src={render}
                  alt={`AI redesigned ${roomType.toLowerCase()} in ${style} style`}
                  className="w-full object-cover"
                />
              ) : (
                <p className="p-10 text-center text-sm text-muted-foreground">
                  {busy
                    ? "Your render is being generated — this usually takes under a minute."
                    : "Your generated room will appear here."}
                </p>
              )}
            </div>
            {render && (
              <div className="border-t border-border p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <a href={render} download={`reimagine-${roomType.toLowerCase().replaceAll(" ", "-")}.png`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <Download size={16} /> Download render
                  </a>
                  <Button variant="outline" size="sm" onClick={generate} disabled={busy}>Generate another design</Button>
                  <Button variant="ghost" size="sm" onClick={startOver} disabled={busy}>Start over</Button>
                </div>
              </div>
            )}
          </div>

          {designSummary && <div className="space-y-5 rounded-xl border border-border p-6"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">Reimagine AI summary</p><h2 className="mt-2 text-2xl">A new direction for your room</h2><p className="mt-3 leading-7 text-muted-foreground">{designSummary}</p></div><div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-accent px-3 py-1.5">{roomType}</span><span className="rounded-full bg-accent px-3 py-1.5">{style}</span><span className="rounded-full bg-accent px-3 py-1.5">Budget {budget}</span>{notes && <span className="rounded-full bg-accent px-3 py-1.5">Preferences included</span>}</div></div>}
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
