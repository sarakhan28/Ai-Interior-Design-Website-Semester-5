import { Link, createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Armchair,
  ArrowLeft,
  BadgeIndianRupee,
  BarChart3,
  Box,
  Camera,
  Brain,
  Check,
  CheckCircle2,
  Compass,
  FileVideo,
  Image as ImageIcon,
  Copy,
  Layers,
  Lightbulb,
  Loader2,
  PaintBucket,
  Palette,
  ScanLine,
  Sun,
  Sofa,
  Sparkles,
  TreePine,
  Upload,
  Video,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  generateFurnitureRecommendations,
  type FurnitureRecommendation,
  generateBudgetPlan,
  type BudgetPlan,
  generateColorRecommendations,
  type ColorRecommendation,
  generateVastuGuidance,
  type VastuGuidance,
} from "@/lib/design.functions";
import { analyzeImageWithOpenCv, analyzeVideoWithOpenCv, type VisionAnalysis } from "@/lib/vision-analysis";

const FEATURE_DETAILS = {
  furniture: {
    title: "AI Furniture Recommendation",
    description: "A future workspace for furniture suggestions matched to room dimensions, style and practical needs.",
    icon: Sofa,
  },
  color: {
    title: "AI Color Recommendation",
    description: "A future workspace for coordinated wall, furniture and accent colour recommendations.",
    icon: PaintBucket,
  },
  budget: {
    title: "AI Budget & Space Planning",
    description: "Plan your interior budget while optimizing furniture placement and available room space.",
    icon: BadgeIndianRupee,
  },
  space: {
    title: "AI Space Optimization",
    description: "A future workspace for evaluating room layouts and improving how each part of a space is used.",
    icon: Box,
  },
  redesign: {
    title: "AI Room Redesign / Visualization",
    description: "The current room redesign workflow is available in AI Design Studio.",
    icon: WandSparkles,
  },
  analysis: {
    title: "OpenCV-Based Room Image/Video Analysis",
    description: "A future workspace for computer-vision-based analysis of room photos and walkthrough videos.",
    icon: ScanLine,
  },
  vastu: {
    title: "AI Vastu Recommendation",
    description: "A future workspace for directional and placement guidance for interior planning.",
    icon: Compass,
  },
} as const;

export const Route = createFileRoute("/features/$featureId")({
  component: FeatureShell,
});

function FeatureShell() {
  const { featureId } = useParams({ from: "/features/$featureId" });
  const navigate = useNavigate();
  const feature = FEATURE_DETAILS[featureId as keyof typeof FEATURE_DETAILS];

  if (!feature) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
        <div>
          <h1 className="text-3xl">Feature not found</h1>
          <Link to="/" className="mt-5 inline-block text-sm font-semibold text-primary">
            Return home
          </Link>
        </div>
      </main>
    );
  }

  const Icon = feature.icon;

  if (featureId === "furniture") return <FurnitureWorkspace />;
  if (featureId === "color") return <ColorWorkspace />;
  if (featureId === "budget") return <BudgetWorkspace />;
  if (featureId === "analysis") return <VisionSpaceWorkspace />;
  if (featureId === "vastu") return <VastuSenseWorkspace />;

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <section className="mt-16 border border-border bg-background p-8 shadow-xl sm:p-12">
          <div className="grid size-14 place-items-center rounded-lg bg-accent text-primary">
            <Icon size={26} />
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-primary">InteriorAI capability</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{feature.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{feature.description}</p>
          {featureId === "redesign" ? (
            <Button className="mt-8" onClick={() => navigate({ to: "/studio" })}>
              Open AI Design Studio
            </Button>
          ) : (
            <p className="mt-8 border-l-2 border-primary pl-4 text-sm text-muted-foreground">
              This feature is part of the final SPM scope and is not implemented yet. This page is only the navigation shell for future work.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

/* ========================================================================= */
/* VISIONSPACE AI - OPENCV ROOM ANALYSIS                                    */
/* ========================================================================= */

const VISION_ROOMS = ["Living Room", "Bedroom", "Dining Room", "Kitchen", "Home Office", "Other"];
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

function VisionSpaceWorkspace() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [inputType, setInputType] = useState<"photo" | "video">("photo");
  const [roomType, setRoomType] = useState(VISION_ROOMS[0]!);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [analysis, setAnalysis] = useState<VisionAnalysis | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  function chooseInputType(nextType: "photo" | "video") {
    setInputType(nextType);
    setFile(null);
    setAnalysis(null);
    setError("");
    setProgress("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function pickFile(nextFile: File | undefined) {
    if (!nextFile) return;
    const allowed = inputType === "photo" ? IMAGE_TYPES : VIDEO_TYPES;
    if (!allowed.includes(nextFile.type)) {
      setError(inputType === "photo" ? "Please choose a JPG, PNG, or WebP image." : "Please choose an MP4, WebM, or browser-supported MOV video.");
      return;
    }
    if (nextFile.size > 100 * 1024 * 1024) {
      setError("Please choose a file under 100 MB.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
    setAnalysis(null);
    setError("");
  }

  async function analyze() {
    if (!file) {
      setError(`Upload a ${inputType === "photo" ? "room photo" : "walkthrough video"} first.`);
      return;
    }
    setBusy(true);
    setError("");
    setAnalysis(null);
    setProgress(inputType === "photo" ? "Loading OpenCV.js..." : "Loading OpenCV.js and preparing video samples...");
    try {
      const result = inputType === "photo"
        ? await analyzeImageWithOpenCv(file)
        : await analyzeVideoWithOpenCv(file, (current, total) => setProgress(`Analyzing representative frame ${current} of ${total}...`));
      setAnalysis(result);
      setProgress("");
    } catch (cause) {
      setProgress("");
      setError(cause instanceof Error ? cause.message : "VisionSpace could not analyze this file.");
    } finally {
      setBusy(false);
    }
  }

  const accept = inputType === "photo" ? IMAGE_TYPES.join(",") : VIDEO_TYPES.join(",");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground"><ScanLine size={16} /></span><span className="font-display text-lg">VisionSpace AI</span></Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to home</Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">Computer vision capability</p><h1 className="mt-3 text-4xl leading-tight sm:text-5xl">VisionSpace AI</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Analyze your room's visible layout, lighting and spatial characteristics with computer vision.</p></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <section className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-display">Analyze your room</h2>
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1" role="group" aria-label="Input type">
              <button type="button" onClick={() => chooseInputType("photo")} className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${inputType === "photo" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}><ImageIcon size={16} /> Room Photo</button>
              <button type="button" onClick={() => chooseInputType("video")} className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${inputType === "video" ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`}><Video size={16} /> Walkthrough Video</button>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">{inputType === "photo" ? "Room photo" : "Room walkthrough video"}</label>
              <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={(event) => pickFile(event.target.files?.[0])} />
              <button type="button" onClick={() => fileRef.current?.click()} className="relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary">
                {previewUrl && inputType === "photo" && <img src={previewUrl} alt="Uploaded room preview" className="absolute inset-0 size-full object-cover" />}
                {previewUrl && inputType === "video" && <video src={previewUrl} controls muted className="absolute inset-0 size-full object-contain bg-black/5" />}
                {!previewUrl && <span className="space-y-3 p-4"><span className="mx-auto grid size-11 place-items-center rounded-full bg-background text-primary"><Upload size={20} /></span><span className="block text-sm font-semibold">Upload {inputType === "photo" ? "a JPG, PNG, or WebP" : "an MP4, WebM, or MOV"}</span><span className="block text-xs text-muted-foreground">Maximum 100 MB</span></span>}
              </button>
              {file && <p className="mt-2 truncate text-xs text-muted-foreground">{file.name}</p>}
            </div>
            <p className="text-xs leading-5 text-muted-foreground">Computer vision analyzes visible visual features. Exact room dimensions cannot be determined from a normal image or video without a known scale reference.</p>
            <label className="block text-sm font-semibold">Room type<select value={roomType} onChange={(event) => setRoomType(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">{VISION_ROOMS.map((room) => <option key={room}>{room}</option>)}</select></label>
            <Button className="w-full" onClick={analyze} disabled={busy}>{busy ? <><Loader2 className="animate-spin" size={16} /> {progress || "Analyzing room..."}</> : <><ScanLine size={16} /> Analyze my room</>}</Button>
            {error && <div role="alert" className="border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}
          </section>
          <section className="min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8">
            {!analysis && !busy && <div className="grid min-h-[460px] place-items-center text-center"><div className="max-w-sm"><div className="mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary"><Camera size={26} /></div><h2 className="mt-5 text-2xl">VisionSpace Analysis</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Upload a photo or representative walkthrough video to measure visible visual features with OpenCV.js.</p></div></div>}
            {busy && <div className="grid min-h-[460px] place-items-center text-center"><div><Loader2 className="mx-auto animate-spin text-primary" size={32} /><h2 className="mt-5 text-2xl">Processing visual features...</h2><p className="mt-2 text-sm text-muted-foreground">{progress}</p></div></div>}
            {analysis && <VisionResults result={analysis} inputType={inputType} />}
          </section>
        </div>
      </div>
    </main>
  );
}

function VisionResults({ result, inputType }: { result: VisionAnalysis; inputType: "photo" | "video" }) {
  const videoResult = result as VisionAnalysis & { duration?: number; sampledFrames?: number; lightingVariation?: number; edgeVariation?: number; representativeFrames?: string[] };
  const metricCards = [["Image resolution", `${result.metrics.width} x ${result.metrics.height}`], ["Brightness score", `${result.metrics.brightness}/255`], ["Edge density", `${(result.metrics.edgeDensity * 100).toFixed(1)}%`], ["Detected contours", String(result.metrics.contourCount)], ["Foreground/background ratio", `${(result.metrics.foregroundRatio * 100).toFixed(1)}% foreground`]];
  return <div className="space-y-8 animate-reveal">
    <div className="border-b border-border pb-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">VisionSpace Analysis</p><h2 className="mt-2 text-3xl">Visible room intelligence</h2></div><span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><Activity size={14} /> Analysis quality: Visual estimate</span></div><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{result.summary}</p></div>
    {inputType === "video" && <section className="grid gap-3 sm:grid-cols-3"><MetricCard label="Video duration" value={`${videoResult.duration?.toFixed(1)}s`} /><MetricCard label="Sampled frames" value={String(videoResult.sampledFrames)} /><MetricCard label="Lighting variation" value={`${videoResult.lightingVariation}/255`} /></section>}
    <section><h3 className="flex items-center gap-2 text-xl font-display"><Sun size={19} className="text-primary" /> Lighting analysis</h3><div className="mt-4 grid gap-4 sm:grid-cols-2"><article className="border border-border bg-card p-5"><p className="text-xs font-bold uppercase tracking-widest text-primary">Brightness level</p><p className="mt-2 text-2xl">{result.lighting.level}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{result.lighting.naturalLight}</p></article><article className="border border-border bg-card p-5"><p className="text-xs font-bold uppercase tracking-widest text-primary">Brightness observations</p><ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">{result.lighting.observations.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>
    <ObservationSection title="Spatial / layout observations" icon={<Layers size={18} />} items={result.spatialObservations} />
    <ObservationSection title="Room structure" icon={<Box size={18} />} items={result.structureObservations} />
    <ObservationSection title="Visual object observations" icon={<Camera size={18} />} items={result.objectObservations} />
    <ObservationSection title="Space optimization suggestions" icon={<Lightbulb size={18} />} items={result.optimizationSuggestions} />
    <section><h3 className="flex items-center gap-2 text-xl font-display"><BarChart3 size={18} className="text-primary" /> Computer-vision metrics</h3><p className="mt-2 text-xs text-muted-foreground">These are image-processing measurements, not physical room measurements.</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{metricCards.map(([label, value]) => <MetricCard key={label} label={label} value={value} />)}</div></section>
    {result.edgePreview && <section><h3 className="flex items-center gap-2 text-xl font-display"><ScanLine size={18} className="text-primary" /> Edge analysis preview</h3><p className="mt-2 text-xs text-muted-foreground">Canny edge detection highlights visible boundaries and texture changes.</p><img src={result.edgePreview} alt="OpenCV edge analysis preview" className="mt-4 max-h-72 w-full rounded-lg border border-border bg-black object-contain" /></section>}
    {inputType === "video" && videoResult.representativeFrames && <section><h3 className="flex items-center gap-2 text-xl font-display"><FileVideo size={18} className="text-primary" /> Representative frames</h3><div className="mt-4 grid gap-3 sm:grid-cols-3">{videoResult.representativeFrames.map((frame, index) => <img key={frame} src={frame} alt={`Representative walkthrough frame ${index + 1}`} className="aspect-video w-full rounded-lg border border-border object-cover" />)}</div><p className="mt-3 text-xs text-muted-foreground">The video was sampled at intervals; every frame was not processed.</p></section>}
  </div>;
}

function ObservationSection({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return <section><h3 className="flex items-center gap-2 text-xl font-display">{icon}{title}</h3><ul className="mt-4 grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="border-l-2 border-primary bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">{item}</li>)}</ul></section>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return <article className="border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold text-primary">{value}</p></article>;
}

/* ========================================================================= */
/* VASTUSENSE AI - TRADITIONAL VASTU GUIDANCE                               */
/* ========================================================================= */

const VASTU_ROOMS = ["Living Room", "Bedroom", "Dining Room", "Kitchen", "Home Office", "Study Room", "Other"];
const DIRECTIONS = ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West", "I don't know"];
const WINDOW_DIRECTIONS = ["North", "South", "East", "West", "Multiple directions", "I don't know"];

function VastuSenseWorkspace() {
  const runGuidance = useServerFn(generateVastuGuidance);
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | undefined>();
  const [fileName, setFileName] = useState("");
  const [roomType, setRoomType] = useState(VASTU_ROOMS[0]!);
  const [roomOrientation, setRoomOrientation] = useState("I don't know");
  const [entranceDirection, setEntranceDirection] = useState("I don't know");
  const [windowDirection, setWindowDirection] = useState("I don't know");
  const [currentFurniture, setCurrentFurniture] = useState("");
  const [concerns, setConcerns] = useState("");
  const [result, setResult] = useState<VastuGuidance | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function pickFile(file: File | undefined) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setError("Please choose a JPG, PNG, or WebP image."); return; }
    if (file.size > 12 * 1024 * 1024) { setError("Please choose a room photo under 12 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => { setPhoto(String(reader.result)); setFileName(file.name); setResult(null); setError(""); };
    reader.readAsDataURL(file);
  }

  async function generate() {
    setBusy(true); setError(""); setResult(null);
    try {
      const guidance = await runGuidance({ data: { image: photo, roomType, roomOrientation, entranceDirection, windowDirection, currentFurniture, concerns } });
      setResult(guidance);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Something went wrong generating VastuSense guidance."); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border px-5 py-5 lg:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><Link to="/" className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground"><Compass size={16} /></span><span className="font-display text-lg">VastuSense AI</span></Link><Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> Back to home</Link></div></header>
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">Traditional Vastu guidance</p><h1 className="mt-3 text-4xl leading-tight sm:text-5xl">VastuSense AI</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Traditional Vastu guidance for thoughtful room planning and furniture placement.</p><p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">VastuSense provides traditional Vastu-based guidance for interior planning. Recommendations are cultural/traditional rather than scientifically validated predictions.</p></div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]"><section className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm"><h2 className="text-2xl font-display">Tell us about your room</h2><div><label className="mb-2 block text-sm font-semibold">Room photo <span className="font-normal text-muted-foreground">(optional)</span></label><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => pickFile(event.target.files?.[0])} /><button type="button" onClick={() => fileRef.current?.click()} className="relative flex min-h-44 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center">{photo ? <img src={photo} alt="Uploaded room preview" className="absolute inset-0 size-full object-cover" /> : <span className="space-y-3 p-4"><span className="mx-auto grid size-11 place-items-center rounded-full bg-background text-primary"><Upload size={20} /></span><span className="block text-sm font-semibold">Upload a JPG, PNG, or WebP</span><span className="block text-xs text-muted-foreground">Maximum 12 MB</span></span>}</button>{fileName && <p className="mt-2 truncate text-xs text-muted-foreground">{fileName}</p>}<p className="mt-2 text-xs leading-5 text-muted-foreground">The photo provides visual context only and does not determine exact directions or measurements.</p></div>
        <VastuSelect label="Room type" value={roomType} options={VASTU_ROOMS} onChange={setRoomType} /><VastuSelect label="Room orientation / main direction" value={roomOrientation} options={DIRECTIONS} onChange={setRoomOrientation} /><VastuSelect label="Main entrance direction" value={entranceDirection} options={DIRECTIONS} onChange={setEntranceDirection} /><VastuSelect label="Window direction" value={windowDirection} options={WINDOW_DIRECTIONS} onChange={setWindowDirection} />
        <label className="block text-sm font-semibold">Current furniture<Textarea value={currentFurniture} onChange={(event) => setCurrentFurniture(event.target.value)} placeholder="Example: Sofa in the west, TV unit opposite the sofa, study table near the window." className="mt-2 min-h-24 resize-y" /></label><label className="block text-sm font-semibold">Specific concern/preferences<Textarea value={concerns} onChange={(event) => setConcerns(event.target.value)} placeholder="Example: I want better furniture placement and a calmer bedroom layout." className="mt-2 min-h-24 resize-y" /></label><Button className="w-full" onClick={generate} disabled={busy}>{busy ? <><Loader2 className="animate-spin" size={16} /> Preparing guidance...</> : <><Compass size={16} /> Get VastuSense recommendations</>}</Button>{error && <div role="alert" className="border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}</section>
        <section className="min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8">{!result && !busy && <div className="grid min-h-[460px] place-items-center text-center"><div className="max-w-sm"><div className="mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary"><Compass size={26} /></div><h2 className="mt-5 text-2xl">Your VastuSense AI Guidance</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Share the directions you know and your current layout to receive traditional Vastu guidance grounded in the information you supplied.</p></div></div>}{busy && <div className="grid min-h-[460px] place-items-center text-center"><div><Loader2 className="mx-auto animate-spin text-primary" size={32} /><h2 className="mt-5 text-2xl">Preparing traditional guidance...</h2><p className="mt-2 text-sm text-muted-foreground">Gemini is organizing directional and placement suggestions.</p></div></div>}{result && <VastuResults result={result} />}</section></div></div>
  </main>;
}

function VastuSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="block text-sm font-semibold">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }

function VastuResults({ result }: { result: VastuGuidance }) {
  return <div className="space-y-8 animate-reveal"><div className="border-b border-border pb-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">Traditional Vastu guidance</p><h2 className="mt-2 text-3xl">Your VastuSense AI Guidance</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{result.summary}</p></div><VastuListSection title="Directional guidance" items={result.directionalGuidance.map((item) => `${item.direction}: ${item.traditionalAssociation} Suggested use: ${item.suggestedUse} Placement: ${item.placementGuidance} Considerations: ${item.considerations}`)} /><VastuCards title="Furniture placement" items={result.furniturePlacement.map((item) => ({ title: item.item, body: `${item.recommendedPlacement} ${item.reason}` }))} /><VastuCards title="Color guidance" items={result.colorGuidance.map((item) => ({ title: `${item.color} · ${item.area}`, body: item.reason }))} /><VastuListSection title="Lighting guidance" items={result.lightingGuidance} /><div className="grid gap-4 sm:grid-cols-2"><VastuListSection title="Traditional Vastu Do's" items={result.dos} /><VastuListSection title="Traditional Vastu Considerations / Avoid" items={result.considerations} /></div><div className="grid gap-4 sm:grid-cols-2"><VastuListSection title="High-priority changes" items={result.priorityActions.highPriority} /><VastuListSection title="Optional changes" items={result.priorityActions.optional} /></div><section className="border-t border-border pt-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">Practical interior note</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{result.practicalInteriorNote}</p><p className="mt-4 text-xs text-muted-foreground">Traditional guidance is optional cultural context. Comfort, safety, accessibility and a workable layout should take priority.</p></section></div>;
}

function VastuListSection({ title, items }: { title: string; items: string[] }) { return <section><h3 className="text-xl font-display">{title}</h3><ul className="mt-4 grid gap-3">{items.map((item) => <li key={item} className="border-l-2 border-primary bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">{item}</li>)}</ul></section>; }
function VastuCards({ title, items }: { title: string; items: { title: string; body: string }[] }) { return <section><h3 className="text-xl font-display">{title}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{items.map((item) => <article key={item.title} className="border border-border bg-card p-5"><h4 className="font-semibold text-primary">{item.title}</h4><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p></article>)}</div></section>; }

/* ========================================================================= */
/* FURNITURE WORKSPACE                                                       */
/* ========================================================================= */

const ROOM_TYPES = ["Living Room", "Bedroom", "Kitchen", "Dining Room", "Home Office"];
const STYLES = ["Modern Minimal", "Scandinavian", "Indian Contemporary", "Luxury Classic", "Boho Warm", "Japandi", "Industrial"];
const BUDGETS = ["₹50,000", "₹1,50,000", "₹3,00,000", "₹6,00,000", "₹10,00,000+"];

const inr = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

function FurnitureWorkspace() {
  const runRecommendations = useServerFn(generateFurnitureRecommendations);
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [roomType, setRoomType] = useState(ROOM_TYPES[0]!);
  const [style, setStyle] = useState(STYLES[0]!);
  const [budget, setBudget] = useState(BUDGETS[1]!);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<FurnitureRecommendation | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function pickFile(file: File | undefined) {
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please choose a JPG or PNG image.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("Please choose a room photo under 12 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      setFileName(file.name);
      setError("");
      setResult(null);
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
    setResult(null);
    try {
      const recommendation = await runRecommendations({ data: { image: photo, roomType, style, budget, notes } });
      setResult(recommendation);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong generating recommendations.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground">
              <Sparkles size={16} />
            </span>
            <span className="font-display text-lg">FurniSense AI</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">InteriorAI capability</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Furniture that fits your room and your life.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Share a room photo and a few preferences. FurniSense AI will suggest practical furniture with approximate INR pricing and placement ideas.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <section className="space-y-5 rounded-xl border border-border p-6">
            <div>
              <h2 className="text-2xl">Tell us about the room</h2>
              <p className="mt-2 text-sm text-muted-foreground">The photo guides visual context only; it does not provide exact measurements.</p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(event) => pickFile(event.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="group relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary"
            >
              {photo ? (
                <img src={photo} alt="Uploaded room preview" className="absolute inset-0 size-full object-cover" />
              ) : (
                <span className="space-y-3">
                  <span className="mx-auto grid size-11 place-items-center rounded-full bg-background text-primary">
                    <Upload size={20} />
                  </span>
                  <span className="block text-sm font-semibold">Upload a JPG or PNG</span>
                  <span className="block text-xs text-muted-foreground">Maximum 12 MB</span>
                </span>
              )}
            </button>
            {fileName && <p className="truncate text-xs text-muted-foreground">{fileName}</p>}
            <label className="block text-sm font-semibold">
              Room type
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_TYPES.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="block text-sm font-semibold">
              Design style
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STYLES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="block text-sm font-semibold">
              Furniture budget
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUDGETS.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="block text-sm font-semibold">
              Requirements or preferences <span className="font-normal text-muted-foreground">(optional)</span>
              <Textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="For example: need storage for books, prefer rounded edges"
                className="mt-2 min-h-24 resize-y"
              />
            </label>
            <Button className="w-full" onClick={generate} disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Finding furniture...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate recommendations
                </>
              )}
            </Button>
            {error && <div role="alert" className="border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}
          </section>

          <section className="min-h-[520px] rounded-xl border border-border bg-accent/20 p-6 sm:p-8">
            {!result && !busy && (
              <div className="grid min-h-[460px] place-items-center text-center">
                <div className="max-w-sm">
                  <div className="mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary">
                    <Sofa size={26} />
                  </div>
                  <h2 className="mt-5 text-2xl">Your furniture plan will appear here</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Upload a room photo and generate a recommendation to see a tailored shortlist, estimated cost, and practical placement suggestions.
                  </p>
                </div>
              </div>
            )}
            {busy && (
              <div className="grid min-h-[460px] place-items-center text-center">
                <div>
                  <Loader2 className="mx-auto animate-spin text-primary" size={32} />
                  <h2 className="mt-5 text-2xl">Reading the room...</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Preparing practical furniture suggestions. This can take a moment.</p>
                </div>
              </div>
            )}
            {result && <RecommendationResults result={result} />}
          </section>
        </div>
      </div>
    </main>
  );
}

function RecommendationResults({ result }: { result: FurnitureRecommendation }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">FurniSense AI plan</p>
          <h2 className="mt-2 text-3xl">A considered furniture shortlist</h2>
        </div>
        <div className="border border-primary/30 bg-background px-4 py-3">
          <p className="text-xs text-muted-foreground">Estimated total</p>
          <p className="mt-1 text-xl font-semibold text-primary">{inr(result.estimatedTotal)}</p>
        </div>
      </div>
      <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">{result.summary}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {result.recommendations.map((item) => (
          <article key={`${item.name}-${item.category}`} className="border border-border bg-background p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{item.category}</p>
                <h3 className="mt-2 text-xl">{item.name}</h3>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">x{item.quantity}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.reason}</p>
            <p className="mt-4 border-t border-border pt-3 text-sm">
              <span className="font-semibold">Estimate:</span> {inr(item.estimatedPrice * item.quantity)}
            </p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              <span className="font-semibold text-foreground">Space-saving alternative:</span> {item.spaceSavingAlternative}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <h3 className="flex items-center gap-2 text-xl">
          <CheckCircle2 size={18} className="text-primary" /> Placement suggestions
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {result.placementSuggestions.map((suggestion) => (
            <li key={suggestion} className="border-l-2 border-primary pl-3 text-sm leading-6 text-muted-foreground">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">Prices are approximate estimates in INR, not live market prices. Confirm dimensions and fit before purchasing.</p>
    </div>
  );
}

/* ========================================================================= */
/* SPACEWISE AI - BUDGET & SPACE PLANNING                                   */
/* ========================================================================= */

const BUDGET_ROOM_TYPES = ["Living Room", "Bedroom", "Dining Room", "Kitchen", "Home Office", "Other"];
const BUDGET_STYLES = ["Modern", "Minimalist", "Luxury Classic", "Scandinavian", "Bohemian", "Industrial", "Contemporary", "Traditional"];
const SPACEWISE_BUDGETS = ["₹50,000", "₹75,000", "₹1,00,000", "₹1,50,000", "₹2,00,000", "₹3,00,000", "₹5,00,000"];

function BudgetWorkspace() {
  const runBudgetPlan = useServerFn(generateBudgetPlan);
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [roomType, setRoomType] = useState(BUDGET_ROOM_TYPES[0]!);
  const [style, setStyle] = useState(BUDGET_STYLES[0]!);
  const [budget, setBudget] = useState(SPACEWISE_BUDGETS[3]!);
  const [requirements, setRequirements] = useState("");
  const [spaceConcerns, setSpaceConcerns] = useState("");
  const [result, setResult] = useState<BudgetPlan | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function pickFile(file: File | undefined) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("Please choose a room photo under 12 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      setFileName(file.name);
      setError("");
      setResult(null);
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
    setResult(null);
    try {
      const plan = await runBudgetPlan({ data: { image: photo, roomType, style, budget, requirements, spaceConcerns } });
      setResult(plan);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong generating your SpaceWise plan.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground">
              <BadgeIndianRupee size={16} />
            </span>
            <span className="font-display text-lg">SpaceWise AI</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">InteriorAI capability</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">A smarter plan for every rupee and every corner.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Share your room context, priorities and budget. SpaceWise AI will shape a practical plan around the visible layout and the way you want to live.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <section className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-display">Plan your room</h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">The photo guides visual context only; it does not provide exact measurements.</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Room photo</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => pickFile(event.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="group relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary"
              >
                {photo ? (
                  <img src={photo} alt="Uploaded room preview" className="absolute inset-0 size-full object-cover" />
                ) : (
                  <span className="space-y-3 p-4">
                    <span className="mx-auto grid size-11 place-items-center rounded-full bg-background text-primary shadow-sm"><Upload size={20} /></span>
                    <span className="block text-sm font-semibold">Upload a JPG, PNG, or WebP</span>
                    <span className="block text-xs text-muted-foreground">Maximum 12 MB</span>
                  </span>
                )}
              </button>
              {fileName && <p className="mt-1.5 truncate text-xs text-muted-foreground">{fileName}</p>}
            </div>
            <label className="block text-sm font-semibold">
              Room type
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>{BUDGET_ROOM_TYPES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
              </Select>
            </label>
            <label className="block text-sm font-semibold">
              Design style
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>{BUDGET_STYLES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
              </Select>
            </label>
            <label className="block text-sm font-semibold">
              Total interior budget
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>{SPACEWISE_BUDGETS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
              </Select>
            </label>
            <label className="block text-sm font-semibold">
              Room requirements <span className="font-normal text-muted-foreground">(optional)</span>
              <Textarea value={requirements} onChange={(event) => setRequirements(event.target.value)} placeholder="Example: Need a sofa, TV unit, study desk and extra storage." className="mt-2 min-h-24 resize-y" />
            </label>
            <label className="block text-sm font-semibold">
              Space concerns <span className="font-normal text-muted-foreground">(optional)</span>
              <Textarea value={spaceConcerns} onChange={(event) => setSpaceConcerns(event.target.value)} placeholder="Example: Keep the walkway open and maximize storage." className="mt-2 min-h-24 resize-y" />
            </label>
            <Button className="w-full" onClick={generate} disabled={busy}>
              {busy ? <><Loader2 className="animate-spin" size={16} /> Planning your room...</> : <><Sparkles size={16} /> Create my SpaceWise plan</>}
            </Button>
            {error && <div role="alert" className="border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}
          </section>

          <section className="min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8">
            {!result && !busy && <EmptyBudgetState />}
            {busy && <div className="grid min-h-[460px] place-items-center text-center"><div><Loader2 className="mx-auto animate-spin text-primary" size={32} /><h2 className="mt-5 text-2xl">Building your SpaceWise plan...</h2><p className="mt-2 text-sm text-muted-foreground">Gemini is reading the visible layout and balancing your priorities.</p></div></div>}
            {result && <BudgetResults result={result} />}
          </section>
        </div>
      </div>
    </main>
  );
}

function EmptyBudgetState() {
  return <div className="grid min-h-[460px] place-items-center text-center"><div className="max-w-sm"><div className="mx-auto grid size-14 place-items-center rounded-lg bg-background text-primary"><BadgeIndianRupee size={26} /></div><h2 className="mt-5 text-2xl">Your SpaceWise AI Plan</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Upload a room photo and set your preferences to see a budget-aware furniture plan, layout guidance and ways to save.</p></div></div>;
}

function BudgetResults({ result }: { result: BudgetPlan }) {
  const overview = result.budgetOverview;
  const allocations = [
    ["Furniture", overview.furniture], ["Storage", overview.storage], ["Lighting", overview.lighting], ["Decor", overview.decor], ["Soft furnishings", overview.softFurnishings], ["Other", overview.other],
  ] as const;
  return <div className="space-y-8 animate-reveal">
    <div className="border-b border-border pb-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">SpaceWise AI plan</p><h2 className="mt-2 text-3xl">Your room, planned with intention</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{result.summary}</p></div>
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3"><h3 className="text-xl font-display">Budget overview</h3><span className="text-xs text-muted-foreground">Approximate INR estimates</span></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[['Total budget', overview.totalBudget], ['Estimated furniture cost', overview.furniture], ['Decor/accessories cost', overview.decor], ['Lighting cost', overview.lighting], ['Flooring/soft furnishings cost', overview.softFurnishings], ['Storage cost', overview.storage], ['Estimated total', overview.estimatedTotal], ['Remaining budget', overview.remainingBudget]].map(([label, value]) => <div key={String(label)} className="border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className={`mt-2 text-xl font-semibold ${label === 'Remaining budget' && Number(value) < 0 ? 'text-destructive' : 'text-primary'}`}>{inr(Number(value))}</p></div>)}
      </div>
    </section>
    <section><h3 className="text-xl font-display">Budget allocation</h3><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{allocations.map(([label, value]) => { const percent = overview.estimatedTotal ? Math.round((value / overview.estimatedTotal) * 100) : 0; return <article key={label} className="border border-border bg-card p-4"><div className="flex justify-between gap-3 text-sm"><span className="font-semibold">{label}</span><span className="text-muted-foreground">{inr(value)}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(percent, 100)}%` }} /></div><p className="mt-2 text-xs text-muted-foreground">{percent}% of estimated total</p></article>; })}</div></section>
    <section><h3 className="text-xl font-display">Recommended furniture</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{result.furnitureRecommendations.map((item) => <article key={`${item.name}-${item.category}`} className="border border-border bg-card p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-primary">{item.category}</p><h4 className="mt-2 text-xl">{item.name}</h4></div><span className="shrink-0 text-sm text-muted-foreground">x{item.quantity}</span></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{item.reason}</p><p className="mt-4 border-t border-border pt-3 text-sm"><span className="font-semibold">Estimated price:</span> {inr(item.estimatedPrice * item.quantity)}</p><p className="mt-2 text-xs leading-5 text-muted-foreground"><span className="font-semibold text-foreground">Space-saving alternative:</span> {item.spaceSavingAlternative}</p></article>)}</div></section>
    <ResultList title="Space optimization" items={result.spaceOptimization} icon={<Layers size={18} />} />
    <ResultList title="Suggested layout" items={result.layoutPlan} icon={<Box size={18} />} />
    <ResultList title="Money-saving suggestions" items={result.moneySavingSuggestions} icon={<Lightbulb size={18} />} />
    <section><h3 className="text-xl font-display">Priority list</h3><div className="mt-4 grid gap-4 sm:grid-cols-3"><PriorityColumn title="Essential" items={result.priorityList.essential} /><PriorityColumn title="Recommended" items={result.priorityList.recommended} /><PriorityColumn title="Optional" items={result.priorityList.optional} /></div></section>
    <div className="border-t border-border pt-6"><p className="text-xs font-bold uppercase tracking-widest text-primary">Final planning note</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{result.finalNote}</p><p className="mt-4 text-xs text-muted-foreground">Prices are approximate estimates, not live market prices. Confirm fit, clearances and final quotations before purchasing.</p></div>
  </div>;
}

function ResultList({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return <section><h3 className="flex items-center gap-2 text-xl font-display text-foreground">{icon}{title}</h3><ul className="mt-4 grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="border-l-2 border-primary bg-card px-4 py-3 text-sm leading-6 text-muted-foreground">{item}</li>)}</ul></section>;
}

function PriorityColumn({ title, items }: { title: string; items: string[] }) {
  return <div className="border border-border bg-card p-5"><h4 className="font-semibold text-primary">{title}</h4><ul className="mt-3 space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" />{item}</li>)}</ul></div>;
}

/* ========================================================================= */
/* CHROMATICA AI - COLOR WORKSPACE                                           */
/* ========================================================================= */

const COLOR_ROOM_TYPES = [
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Kitchen",
  "Home Office",
  "Other",
];

const COLOR_STYLES = [
  "Modern",
  "Minimalist",
  "Luxury Classic",
  "Scandinavian",
  "Bohemian",
  "Industrial",
  "Contemporary",
  "Traditional",
];

const COLOR_MOODS = [
  "Warm & Cozy",
  "Calm & Relaxing",
  "Fresh & Natural",
  "Elegant & Luxurious",
  "Bright & Energetic",
  "Neutral & Minimal",
];

const LIGHTING_LEVELS = ["Low", "Medium", "High"];

function ColorWorkspace() {
  const runColorRecommendations = useServerFn(generateColorRecommendations);
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [roomType, setRoomType] = useState(COLOR_ROOM_TYPES[0]!);
  const [style, setStyle] = useState(COLOR_STYLES[0]!);
  const [colorMood, setColorMood] = useState(COLOR_MOODS[0]!);
  const [naturalLighting, setNaturalLighting] = useState(LIGHTING_LEVELS[1]!);
  const [preferences, setPreferences] = useState("");
  const [result, setResult] = useState<ColorRecommendation | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function pickFile(file: File | undefined) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("Please choose a room photo under 12 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      setFileName(file.name);
      setError("");
      setResult(null);
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
    setResult(null);
    try {
      const recommendation = await runColorRecommendations({
        data: {
          image: photo,
          roomType,
          style,
          colorMood,
          naturalLighting,
          preferences,
        },
      });
      setResult(recommendation);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong generating color recommendations.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-foreground text-primary-foreground">
              <PaintBucket size={16} />
            </span>
            <span className="font-display text-lg">Chromatica AI</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">InteriorAI capability</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Color harmony calibrated to your space.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Upload your room photo and define your preferences. Chromatica AI analyzes the visual architecture, existing furniture, flooring, and lighting to compose a cohesive, professional interior color scheme.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* LEFT SIDE — "Tell us about the room" */}
          <section className="space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-display">Tell us about the room</h2>
              <p className="mt-2 text-xs text-muted-foreground">
                The photo guides visual context only; it does not provide exact measurements.
              </p>
            </div>

            {/* Room photo upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">Room photo</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => pickFile(event.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="group relative flex min-h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-primary/50 bg-accent/30 text-center transition hover:border-primary"
              >
                {photo ? (
                  <img src={photo} alt="Uploaded room preview" className="absolute inset-0 size-full object-cover" />
                ) : (
                  <span className="space-y-3 p-4">
                    <span className="mx-auto grid size-11 place-items-center rounded-full bg-background text-primary shadow-sm">
                      <Upload size={20} />
                    </span>
                    <span className="block text-sm font-semibold">Upload a JPG, PNG, or WebP</span>
                    <span className="block text-xs text-muted-foreground">Maximum 12 MB</span>
                  </span>
                )}
              </button>
              {fileName && <p className="mt-1.5 truncate text-xs text-muted-foreground">{fileName}</p>}
            </div>

            {/* Room type */}
            <label className="block text-sm font-semibold">
              Room type
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_ROOM_TYPES.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            {/* Design style */}
            <label className="block text-sm font-semibold">
              Design style
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_STYLES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            {/* Color mood / preference */}
            <label className="block text-sm font-semibold">
              Color mood / preference
              <Select value={colorMood} onValueChange={setColorMood}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_MOODS.map((mood) => (
                    <SelectItem key={mood} value={mood}>
                      {mood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            {/* Natural lighting */}
            <label className="block text-sm font-semibold">
              Natural lighting
              <Select value={naturalLighting} onValueChange={setNaturalLighting}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LIGHTING_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            {/* Existing furniture/color preferences */}
            <label className="block text-sm font-semibold">
              Existing colors or preferences <span className="font-normal text-muted-foreground">(optional)</span>
              <Textarea
                value={preferences}
                onChange={(event) => setPreferences(event.target.value)}
                placeholder="Example: Keep the brown wooden furniture and avoid very bright colors."
                className="mt-2 min-h-24 resize-y text-sm"
              />
            </label>

            {/* Generate Color Palette button */}
            <Button className="w-full font-medium" size="lg" onClick={generate} disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Analyzing room colors...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate color recommendations
                </>
              )}
            </Button>

            {error && (
              <div role="alert" className="border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive rounded-lg">
                {error}
              </div>
            )}
          </section>

          {/* RIGHT SIDE — AI RESULT */}
          <section className="min-h-[520px] rounded-xl border border-border bg-accent/15 p-6 sm:p-8">
            {!result && !busy && (
              <div className="grid min-h-[460px] place-items-center text-center">
                <div className="max-w-md">
                  <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-background text-primary shadow-sm border border-border">
                    <Palette size={30} />
                  </div>
                  <h2 className="mt-6 text-2xl font-display">Your color palette will appear here</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Upload a room photo, pick your preferred design style, mood, and lighting level, and click{" "}
                    <span className="font-medium text-foreground">&ldquo;Generate color recommendations&rdquo;</span> to receive an AI-curated palette with hex codes, material harmony, and lighting guidance.
                  </p>
                </div>
              </div>
            )}

            {busy && (
              <div className="grid min-h-[460px] place-items-center text-center">
                <div className="max-w-sm">
                  <div className="relative mx-auto size-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
                    <Loader2 className="animate-spin text-primary size-16" />
                  </div>
                  <h2 className="mt-6 text-2xl font-display">Crafting your color palette...</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-6">
                    Chromatica AI is analyzing the lighting, architectural lines, and visible materials to recommend a coordinated palette.
                  </p>
                </div>
              </div>
            )}

            {result && <ColorResults result={result} />}
          </section>
        </div>
      </div>
    </main>
  );
}

/* ========================================================================= */
/* COLOR RESULTS DISPLAY                                                     */
/* ========================================================================= */

function ColorResults({ result }: { result: ColorRecommendation }) {
  return (
    <div className="space-y-8 animate-reveal">
      {/* Title & Header */}
      <div className="border-b border-border pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Sparkles size={14} /> Chromatica AI Engine
            </p>
            <h2 className="mt-2 text-3xl font-display">Your Chromatica AI Palette</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
            <Check size={14} /> Palette Generated
          </div>
        </div>

        {/* 1. AI room color summary */}
        <p className="mt-4 max-w-3xl text-sm sm:text-base leading-7 text-muted-foreground">
          {result.summary}
        </p>
      </div>

      {/* 60-30-10 Wall & Accent Colors Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-display flex items-center gap-2">
            <Palette size={20} className="text-primary" /> Coordinated Paint Scheme
          </h3>
          <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
            60-30-10 Interior Rule
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* 2. Primary Wall Color */}
          <ColorSwatchCard
            role="Primary Wall Color"
            ratio="~60% Dominant"
            color={result.primaryWallColor}
            isPrimary
          />

          {/* 3. Secondary Wall/Supporting Color */}
          <ColorSwatchCard
            role="Secondary Wall / Supporting"
            ratio="~30% Secondary"
            color={result.secondaryColor}
          />

          {/* 4. Accent Color */}
          <ColorSwatchCard
            role="Accent Color"
            ratio="~10% Focal Accent"
            color={result.accentColor}
          />
        </div>
      </div>

      {/* Material & Complementary Recommendations (5, 6, 7, 8) */}
      <div className="space-y-4">
        <h3 className="text-xl font-display flex items-center gap-2">
          <Armchair size={20} className="text-primary" /> Furnishings & Architectural Finishes
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* 5. Furniture Color Recommendation */}
          <RecommendationCard
            icon={Armchair}
            title="Furniture Color & Material"
            recommendation={result.furnitureColor.recommendation}
            reason={result.furnitureColor.reason}
          />

          {/* 6. Curtain / Soft Furnishing Color */}
          <RecommendationCard
            icon={Layers}
            title="Curtains & Soft Furnishings"
            recommendation={result.softFurnishingColor.recommendation}
            reason={result.softFurnishingColor.reason}
          />

          {/* 7. Flooring / Wood Tone Recommendation */}
          <RecommendationCard
            icon={TreePine}
            title="Flooring & Wood Tone"
            recommendation={result.flooringTone.recommendation}
            reason={result.flooringTone.reason}
          />

          {/* 8. Lighting Recommendation */}
          <RecommendationCard
            icon={Lightbulb}
            title="Lighting & Color Temperature"
            recommendation={result.lighting.recommendation}
            reason={result.lighting.reason}
          />
        </div>
      </div>

      {/* 9. Color Harmony Explanation & 11. Color Psychology */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* 9. Color Harmony Explanation */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2.5 text-primary mb-3">
            <Sparkles size={18} />
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Color Harmony</h4>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{result.colorHarmony}</p>
        </div>

        {/* 11. Color Psychology */}
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2.5 text-primary mb-3">
            <Brain size={18} />
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Color Psychology & Mood</h4>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{result.colorPsychology}</p>
        </div>
      </div>

      {/* 10. Alternative Palettes */}
      {result.alternativePalettes && result.alternativePalettes.length > 0 && (
        <div className="border-t border-border pt-6">
          <div className="mb-4">
            <h3 className="text-xl font-display flex items-center gap-2">
              <Compass size={20} className="text-primary" /> Alternative Palettes
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Explore secondary directions tailored for varied aesthetic preferences.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {result.alternativePalettes.map((altPalette, idx) => (
              <AlternativePaletteCard key={`${altPalette.name}-${idx}`} palette={altPalette} index={idx + 1} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer note */}
      <p className="border-t border-border pt-4 text-xs text-muted-foreground">
        Color swatches and HEX codes are architectural design approximations. Paint appearance varies under specific natural daylight and artificial lighting conditions; test with real sample pots before final application.
      </p>
    </div>
  );
}

/* ========================================================================= */
/* COLOR SWATCH CARD                                                         */
/* ========================================================================= */

function ColorSwatchCard({
  role,
  ratio,
  color,
  isPrimary = false,
}: {
  role: string;
  ratio: string;
  color: { name: string; hex: string; reason: string };
  isPrimary?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  function copyHex() {
    if (!color.hex) return;
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Format HEX code with # if missing
  const formattedHex = color.hex.startsWith("#") ? color.hex : `#${color.hex}`;

  return (
    <article
      className={`relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card p-4 transition shadow-sm ${
        isPrimary ? "border-primary/50 ring-1 ring-primary/20" : "border-border"
      }`}
    >
      <div>
        {/* Swatch visual preview */}
        <div
          className="relative w-full rounded-lg border border-black/10 shadow-inner transition-transform group"
          style={{
            backgroundColor: formattedHex,
            height: isPrimary ? "120px" : "96px",
          }}
        >
          {/* Ratio badge on top of swatch */}
          <span className="absolute top-2 left-2 rounded-md bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {ratio}
          </span>

          {/* Copy button on swatch */}
          <button
            type="button"
            onClick={copyHex}
            className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/80 transition"
            title="Copy HEX code"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" /> Copied
              </>
            ) : (
              <>
                <Copy size={12} /> {formattedHex}
              </>
            )}
          </button>
        </div>

        {/* Color details */}
        <div className="mt-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{role}</p>
          <div className="mt-1 flex items-baseline justify-between gap-2">
            <h4 className="text-lg font-semibold truncate" title={color.name}>
              {color.name}
            </h4>
            <code className="text-xs font-mono font-medium text-muted-foreground shrink-0">{formattedHex}</code>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{color.reason}</p>
        </div>
      </div>
    </article>
  );
}

/* ========================================================================= */
/* RECOMMENDATION DETAIL CARD                                                */
/* ========================================================================= */

function RecommendationCard({
  icon: Icon,
  title,
  recommendation,
  reason,
}: {
  icon: typeof Armchair;
  title: string;
  recommendation: string;
  reason: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2.5 text-primary mb-2">
        <span className="grid size-8 place-items-center rounded-lg bg-accent text-primary shrink-0">
          <Icon size={16} />
        </span>
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
      </div>
      <p className="mt-3 text-base font-medium text-foreground">{recommendation}</p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground border-t border-border/60 pt-2.5">{reason}</p>
    </article>
  );
}

/* ========================================================================= */
/* ALTERNATIVE PALETTE CARD                                                  */
/* ========================================================================= */

function AlternativePaletteCard({
  palette,
  index,
}: {
  palette: { name: string; colors: { name: string; hex: string }[]; description: string };
  index: number;
}) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  function copyHex(hex: string) {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="font-semibold text-base font-display">{palette.name}</h4>
        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
          Option {index}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-5 mb-4">{palette.description}</p>

      {/* Swatches strip */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {palette.colors.map((c, i) => {
          const hex = c.hex.startsWith("#") ? c.hex : `#${c.hex}`;
          const isCopied = copiedHex === hex;
          return (
            <button
              key={`${c.name}-${i}`}
              type="button"
              onClick={() => copyHex(hex)}
              className="group flex flex-col text-left focus:outline-none"
              title={`Click to copy ${c.name} (${hex})`}
            >
              <div
                className="h-12 w-full rounded-md border border-black/10 shadow-inner group-hover:scale-[1.03] transition-transform relative flex items-center justify-center"
                style={{ backgroundColor: hex }}
              >
                {isCopied && (
                  <span className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    Copied
                  </span>
                )}
              </div>
              <span className="mt-1 text-[11px] font-medium truncate w-full" title={c.name}>
                {c.name}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">{hex}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
