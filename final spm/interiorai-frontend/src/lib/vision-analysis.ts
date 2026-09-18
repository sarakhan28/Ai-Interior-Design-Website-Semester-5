export type VisionMetrics = {
  width: number;
  height: number;
  brightness: number;
  edgeDensity: number;
  contourCount: number;
  foregroundRatio: number;
};

export type VisionAnalysis = {
  summary: string;
  lighting: {
    level: "Low" | "Medium" | "High";
    naturalLight: string;
    observations: string[];
  };
  spatialObservations: string[];
  structureObservations: string[];
  objectObservations: string[];
  optimizationSuggestions: string[];
  metrics: VisionMetrics;
  edgePreview: string;
};

export type VisionVideoAnalysis = VisionAnalysis & {
  duration: number;
  sampledFrames: number;
  lightingVariation: number;
  edgeVariation: number;
  representativeFrames: string[];
};

type OpenCv = typeof import("@techstark/opencv-js");

let openCvPromise: Promise<OpenCv> | null = null;

export function loadOpenCv(): Promise<OpenCv> {
  openCvPromise ??= import("@techstark/opencv-js").then((mod: any) => {
    const opencv = (mod?.default ?? mod) as OpenCv;
    if (!opencv || typeof opencv.Mat !== "function") throw new Error("OpenCV.js could not be loaded.");
    return opencv;
  });
  return openCvPromise;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function brightnessLevel(brightness: number): "Low" | "Medium" | "High" {
  if (brightness < 78) return "Low";
  if (brightness > 174) return "High";
  return "Medium";
}

function createObservations(metrics: VisionMetrics): Omit<VisionAnalysis, "metrics" | "edgePreview"> {
  const lightingLevel = brightnessLevel(metrics.brightness);
  const naturalLight = metrics.brightness > 145
    ? "The visible image is well illuminated, which may indicate substantial natural or artificial light."
    : metrics.brightness < 85
      ? "The visible image appears dim; the light source direction is not reliably determined from this analysis."
      : "The visible image has moderate illumination; window-driven natural light is not reliably separable from artificial light here.";
  const openSpace = metrics.foregroundRatio < 0.3 ? "Large regions have relatively low visual activity and may represent open floor or wall space." : "Visual activity is distributed across much of the frame, suggesting a more furnished or detailed view.";
  const density = metrics.edgeDensity > 0.18 ? "The frame has high edge activity, consistent with a visually dense scene." : "The frame has moderate-to-low edge activity, suggesting a visually calmer scene.";
  const contours = metrics.contourCount > 90 ? "Many contour candidates are visible; furniture-like boundaries may overlap in the perspective view." : "Fewer major contour candidates are visible, so only broad structure can be discussed confidently.";
  const structure = metrics.edgeDensity > 0.12
    ? "Major wall, floor and furniture boundaries may be present among the detected edges; perspective makes physical interpretation approximate."
    : "Only limited major edges were detected; fixed architectural boundaries are not reliably separable in this view.";
  const objects = metrics.contourCount > 35
    ? ["Visual object observations: contour groups may correspond to furniture-like forms such as seating, tables, cabinets or other room contents.", "Object identity is approximate because this OpenCV pass does not perform trained object detection."]
    : ["Visual object observations: no distinct object category can be inferred reliably from the measured contours.", "Use the preview as context rather than a guaranteed object-recognition result."];

  return {
    summary: `The image shows a ${lightingLevel.toLowerCase()} brightness scene with ${density} Based on image perspective, the analysis can describe visible structure and relative activity, but it cannot establish physical room measurements.`,
    lighting: { level: lightingLevel, naturalLight, observations: ["Brightness is computed from the grayscale image average.", metrics.brightness < 95 ? "Darker regions are present across the visible frame." : "No strongly dark overall exposure pattern was detected.", metrics.brightness > 185 ? "Bright regions may contain window or light-source highlights." : "Light-source boundaries are not isolated reliably from a single frame."] },
    spatialObservations: [openSpace, density, contours, "Walkway clearance cannot be measured; only visible obstruction patterns should be considered."],
    structureObservations: [structure, "Windows, doors and openings are reported only when visually evident; this basic contour pass does not guarantee their identity.", "No exact wall length, ceiling height, area or furniture dimensions are inferred."],
    objectObservations: objects,
    optimizationSuggestions: [
      metrics.foregroundRatio > 0.55 ? "Consider reducing visual clutter in the busiest visible region to improve circulation." : "Keep the relatively open visible regions clear to preserve an easy walkway.",
      "Place frequently used furniture with visible clearance around doors and likely circulation paths.",
      "Use vertical or multifunctional storage where the visible scene appears furniture-dense.",
      "Treat unused wall or corner regions as candidates for compact storage, lighting or plants after an in-person fit check.",
    ],
  };
}

function analyzeCanvas(opencv: OpenCv, canvas: HTMLCanvasElement, includeEdgePreview: boolean): VisionAnalysis {
  const source = opencv.imread(canvas);
  const scale = Math.min(1, 640 / Math.max(source.cols, source.rows));
  const resized = new opencv.Mat();
  const gray = new opencv.Mat();
  const blurred = new opencv.Mat();
  const edges = new opencv.Mat();
  const threshold = new opencv.Mat();
  const contours = new opencv.MatVector();
  const hierarchy = new opencv.Mat();
  try {
    if (scale < 1) opencv.resize(source, resized, new opencv.Size(0, 0), scale, scale, opencv.INTER_AREA);
    else source.copyTo(resized);
    opencv.cvtColor(resized, gray, opencv.COLOR_RGBA2GRAY);
    opencv.GaussianBlur(gray, blurred, new opencv.Size(5, 5), 0, 0, opencv.BORDER_DEFAULT);
    opencv.Canny(blurred, edges, 60, 140);
    opencv.threshold(gray, threshold, 0, 255, opencv.THRESH_BINARY + opencv.THRESH_OTSU);
    opencv.findContours(edges, contours, hierarchy, opencv.RETR_EXTERNAL, opencv.CHAIN_APPROX_SIMPLE);
    const brightness = opencv.mean(gray)[0] ?? 0;
    const edgePixels = opencv.countNonZero(edges);
    const foregroundPixels = opencv.countNonZero(threshold);
    const totalPixels = Math.max(gray.rows * gray.cols, 1);
    const metrics: VisionMetrics = {
      width: source.cols,
      height: source.rows,
      brightness: Math.round(brightness * 10) / 10,
      edgeDensity: Math.round((edgePixels / totalPixels) * 1000) / 1000,
      contourCount: contours.size(),
      foregroundRatio: Math.round((foregroundPixels / totalPixels) * 1000) / 1000,
    };
    let edgePreview = "";
    if (includeEdgePreview) {
      const edgeCanvas = document.createElement("canvas");
      edgeCanvas.width = edges.cols;
      edgeCanvas.height = edges.rows;
      opencv.imshow(edgeCanvas, edges);
      edgePreview = edgeCanvas.toDataURL("image/png");
    }
    return { ...createObservations(metrics), metrics, edgePreview };
  } finally {
    source.delete();
    resized.delete();
    gray.delete();
    blurred.delete();
    edges.delete();
    threshold.delete();
    contours.delete();
    hierarchy.delete();
  }
}

export async function analyzeImageWithOpenCv(file: File): Promise<VisionAnalysis> {
  const opencv = await loadOpenCv();
  const imageUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("The image could not be decoded for OpenCV analysis."));
      element.src = imageUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d")?.drawImage(image, 0, 0);
    return analyzeCanvas(opencv, canvas, true);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function waitForVideoEvent(video: HTMLVideoElement, eventName: string) {
  return new Promise<void>((resolve, reject) => {
    const handleEvent = () => { cleanup(); resolve(); };
    const handleError = () => { cleanup(); reject(new Error("The video could not be read by the browser.")); };
    const cleanup = () => { video.removeEventListener(eventName, handleEvent); video.removeEventListener("error", handleError); };
    video.addEventListener(eventName, handleEvent, { once: true });
    video.addEventListener("error", handleError, { once: true });
  });
}

export async function analyzeVideoWithOpenCv(file: File, onProgress: (current: number, total: number) => void): Promise<VisionVideoAnalysis> {
  const opencv = await loadOpenCv();
  const videoUrl = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.preload = "metadata";
  video.muted = true;
  video.src = videoUrl;
  try {
    await waitForVideoEvent(video, "loadedmetadata");
    if (!Number.isFinite(video.duration) || video.duration <= 0) throw new Error("The video duration is unavailable.");
    const total = clamp(Math.ceil(video.duration / 3), 3, 12);
    const canvas = document.createElement("canvas");
    const samples: VisionAnalysis[] = [];
    const representativeFrames: string[] = [];
    for (let index = 0; index < total; index += 1) {
      video.currentTime = Math.min((index + 0.5) * (video.duration / total), Math.max(video.duration - 0.05, 0));
      await waitForVideoEvent(video, "seeked");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0);
      const sample = analyzeCanvas(opencv, canvas, index === 0);
      samples.push(sample);
      if (index === 0 || index === Math.floor(total / 2) || index === total - 1) representativeFrames.push(canvas.toDataURL("image/jpeg", 0.78));
      onProgress(index + 1, total);
    }
    const average = (selector: (sample: VisionAnalysis) => number) => samples.reduce((sum, sample) => sum + selector(sample), 0) / samples.length;
    const brightnessValues = samples.map((sample) => sample.metrics.brightness);
    const edgeValues = samples.map((sample) => sample.metrics.edgeDensity);
    const averageMetrics: VisionMetrics = {
      width: samples[0]!.metrics.width,
      height: samples[0]!.metrics.height,
      brightness: Math.round(average((sample) => sample.metrics.brightness) * 10) / 10,
      edgeDensity: Math.round(average((sample) => sample.metrics.edgeDensity) * 1000) / 1000,
      contourCount: Math.round(average((sample) => sample.metrics.contourCount)),
      foregroundRatio: Math.round(average((sample) => sample.metrics.foregroundRatio) * 1000) / 1000,
    };
    const summary = createObservations(averageMetrics);
    return {
      ...summary,
      metrics: averageMetrics,
      edgePreview: samples[0]!.edgePreview,
      duration: video.duration,
      sampledFrames: samples.length,
      lightingVariation: Math.round((Math.max(...brightnessValues) - Math.min(...brightnessValues)) * 10) / 10,
      edgeVariation: Math.round((Math.max(...edgeValues) - Math.min(...edgeValues)) * 1000) / 1000,
      representativeFrames,
    };
  } finally {
    video.pause();
    video.removeAttribute("src");
    video.load();
    URL.revokeObjectURL(videoUrl);
  }
}
