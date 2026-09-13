import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  Loader2,
  Sparkles,
  Upload,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { streamImage } from "@/lib/streamImage";
import { generateDesignPlan, type DesignPlan } from "@/lib/design.functions";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "AI Design Studio — InteriorAI Studio" },
      {
        name: "description",
        content:
          "Upload a photo of your room and generate a photorealistic AI redesign with a budget breakdown and shopping list.",
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
  "Modern Minimal",
  "Scandinavian",
  "Indian Contemporary",
  "Luxury Classic",
  "Boho Warm",
  "Japandi",
  "Industrial",
  "Coastal",
];
const ROOMS = ["Living Room", "Bedroom", "Kitchen", "Dining Room", "Home Office", "Bathroom"];
const BUDGETS = ["₹50,000", "₹1,50,000", "₹3,00,000", "₹6,00,000", "₹10,00,000+"];

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function StudioPage() {
  const runPlan = useServerFn(generateDesignPlan);
  const fileRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [style, setStyle] = useState(STYLES[0]!);
  const [roomType, setRoomType] = useState(ROOMS[0]!);
  const [budget, setBudget] = useState(BUDGETS[1]!);
  const [notes, setNotes] = useState("");

  const [render, setRender] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [plan, setPlan] = useState<DesignPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function pickFile(file: File | undefined) {
    if (!file) return;
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
      setPlan(null);
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
    setIsFinal(false);
    setPlan(null);
    setStatus("Analysing your room and rendering the new design…");

    const planPromise = runPlan({ data: { style, roomType, budget, notes } })
      .then(setPlan)
      .catch((e: unknown) => {
        console.error(e);
      });

    try {
      await streamImage(
        "/api/redesign",
        { image: photo, style, roomType, budget, notes },
        (dataUrl, final) => {
          setRender(dataUrl);
          setIsFinal(final);
          setStatus(final ? "Design ready" : "Rendering your new room…");
        },
      );
      setStatus("Preparing your budget and shopping list…");
      await planPromise;
      setStatus("Design ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong generating your design.");
      setStatus("");
    } finally {
      setBusy(false);
    }
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
            <h1 className="text-3xl">AI Design Studio</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload your room, choose a direction, and the AI will redesign the exact space.
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
            onClick={() => fileRef.current?.click()}
            className="grid min-h-40 w-full place-items-center overflow-hidden rounded-lg border border-dashed border-primary bg-leaf p-4 text-center"
          >
            {photo ? (
              <img src={photo} alt="Your uploaded room" className="max-h-56 w-full object-contain" />
            ) : (
              <span>
                <Upload className="mx-auto mb-3 text-primary" />
                <strong className="block">Choose a room photo</strong>
                <small className="mt-1 block text-muted-foreground">JPG or PNG · up to 12 MB</small>
              </span>
            )}
          </button>
          {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}

          <Field label="Room type">
            <Select value={roomType} onChange={setRoomType} options={ROOMS} />
          </Field>
          <Field label="Design style">
            <Select value={style} onChange={setStyle} options={STYLES} />
          </Field>
          <Field label="Budget">
            <Select value={budget} onChange={setBudget} options={BUDGETS} />
          </Field>
          <Field label="Anything specific? (optional)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Warm lighting, space for a reading chair, pet friendly fabrics…"
              className="w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Button className="w-full" onClick={generate} disabled={busy}>
            {busy ? <Loader2 className="animate-spin" size={17} /> : <WandSparkles size={17} />}
            {busy ? "Designing…" : "Generate my design"}
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
              <p className="text-sm font-semibold">Your AI redesign</p>
              {status && <p className="text-xs text-muted-foreground">{status}</p>}
            </div>
            <div className="grid min-h-80 place-items-center bg-muted/40">
              {render ? (
                <img
                  src={render}
                  alt={`AI redesigned ${roomType.toLowerCase()} in ${style} style`}
                  className={`w-full object-cover transition-[filter] duration-500 ${isFinal ? "blur-0" : "blur-xl"}`}
                />
              ) : (
                <p className="p-10 text-center text-sm text-muted-foreground">
                  {busy
                    ? "Your render is being generated — this usually takes under a minute."
                    : "Your generated room will appear here."}
                </p>
              )}
            </div>
            {render && isFinal && (
              <div className="border-t border-border p-4">
                <a
                  href={render}
                  download={`interiorai-${roomType.toLowerCase().replaceAll(" ", "-")}.png`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  <Download size={16} /> Download render
                </a>
              </div>
            )}
          </div>

          {plan && (
            <div className="space-y-6 rounded-xl border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <h2 className="text-2xl">Design brief</h2>
                  <p className="mt-2 leading-7 text-muted-foreground">{plan.summary}</p>
                </div>
                <div className="rounded-lg bg-accent px-5 py-3 text-center">
                  <p className="text-xs text-muted-foreground">AI design score</p>
                  <p className="font-display text-2xl text-primary">{plan.designScore}/100</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {plan.palette.map((c) => (
                  <div key={c.hex + c.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="size-8 rounded-md border border-border"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </div>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {plan.materials.map((m) => (
                  <p key={m} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-primary" /> {m}
                  </p>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Shopping list and estimated costs</caption>
                  <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="py-3">Item</th>
                      <th className="py-3">Category</th>
                      <th className="py-3 text-right">Est. price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.items.map((item) => (
                      <tr key={item.name} className="border-b border-border/70 align-top">
                        <td className="py-3 pr-4">
                          <strong className="block">{item.name}</strong>
                          <span className="text-muted-foreground">{item.description}</span>
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">{item.category}</td>
                        <td className="py-3 text-right">{inr(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="py-4 font-semibold" colSpan={2}>
                        Estimated total
                      </td>
                      <td className="py-4 text-right font-display text-xl">{inr(plan.totalCost)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p className="rounded-lg bg-leaf p-4 text-sm">
                <strong>Vastu tip · </strong>
                {plan.vastuNote}
              </p>
            </div>
          )}
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
