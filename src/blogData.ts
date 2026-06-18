export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'AI Learning Log' | 'NPTEL Notes' | 'Boot.dev Progress' | 'Engineering Journal' | 'Technical Article';
  tags: string[];
  publishDate: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "ai-prompt-structuring",
    title: "Context Injection & Deterministic Output: Prompt Engineering in PrepMind AI",
    slug: "context-injection-prompt-engineering",
    category: "AI Learning Log",
    tags: ["LLMs", "Prompt Engineering", "Python", "JSON Schemas"],
    publishDate: "2026-05-12",
    readTime: "4 min read",
    excerpt: "An architectural deep-dive into crafting strict context-injected prompts and validation layers to eliminate LLM hallucinations and output malformed response payloads during dynamic quiz generation.",
    content: `### Objective
The core requirement of PrepMind AI is to dynamically generate study aids (flashcards, mock exams, and summaries) from user-uploaded textbooks or lecture notes. When prompting an LLM to generate multiple-choice questions (MCQs), the major risks are **hallucination** (inventing facts not in the text) and **schema invalidity** (failing to return parsing-compliant JSON).

### 1. The Prompt Architecture
To solve this, I designed a multi-phase system prompt that combines role identification, text bounding, output schemas, and zero-shot task description:

\`\`\`json
{
  "system_instructions": "You are an expert academic evaluator. Extract facts ONLY from the user-provided context below. Do not assume or extrapolate.",
  "format_instruction": "Return a JSON array of objects. Each object must strictly match: { 'question': string, 'options': [string, string, string, string], 'correct_answer_index': number, 'explanation': string }"
}
\`\`\`

By wrapping user notes inside strict boundary tokens like \`[START_CONTEXT]\` and \`[END_CONTEXT]\`, we explicitly limit the model's attention span. 

### 2. Output Validation & Fallbacks
Even with JSON mode enabled, networks sometimes output trailing commas or incomplete JSON blocks under token limits. 
In the Python pipeline, I added a schema validation layer using \`pydantic\`. If the output fails parsing:
1. A regex cleaning parser attempts to fix minor trailing syntax errors.
2. If that fails, a fast retry query is issued with the error traceback, forcing the model to correct its structure.

### 3. Results & Key Takeaways
- **Hallucinations** dropped to nearly zero by explicitly instructing the model to output \`Not mentioned in context\` if details were missing.
- Structured format reliability reached **99.7%** using Pydantic-based validation and schema forcing.`
  },
  {
    id: "portfolio-animation-fps",
    title: "Fluid Framer Motion: Overcoming Layout Reflows & Achieving 60 FPS",
    slug: "fluid-framer-motion-layout-reflows",
    category: "Engineering Journal",
    tags: ["React", "CSS Transitions", "Framer Motion", "Web Performance"],
    publishDate: "2026-06-15",
    readTime: "5 min read",
    excerpt: "How I resolved mobile layout overlapping, container clipping, and animation stutters in this React portfolio by transitioning from CSS grid-resizing to absolute offsets and hardware-accelerated transforms.",
    content: `### The Challenge
When rendering modern web interfaces with backdrop-blurs (glassmorphism) and complex spring animations (like the dock and the rotating letters), the browser's main thread can quickly become choked by **layout reflows**. 

Specifically, animating elements that alter document flow (e.g., changing \`height\`, \`margin\`, or \`flex-basis\`) triggers browser recalculation for all descendants. On mobile engines, this drops rendering speed below 30 FPS.

### 1. Solution: Transforming GPU Layers
To keep animations fluid, I adhered to the core rule: **Only animate \`transform\` (scale, translate, rotate) and \`opacity\`**. These properties run on the compositor layer and are handled directly by the GPU, bypassing reflows.

For the modal open-and-close sequences:
- I used \`layoutId\` in Framer Motion to seamlessly morph components from their small card forms to fullscreen dialogues.
- I set up absolute position overlays to isolate the modal container from the body document layout tree, preventing the main text column from shifting when the overlay rendered.

### 2. Preventing Text Layout Clipping
A major bug identified during responsiveness testing was overlapping texts during rotating state updates. I resolved this by:
- Setting static height boundaries on wrappers containing variable-length rotating text.
- Using \`mode="wait"\` on \`AnimatePresence\` to ensure the outgoing item is fully unmounted from the DOM layout before the incoming item starts its transition, ensuring no collision ever occurs.

### 3. Metric Success
Using Chrome DevTools Performance Profiling, rendering frame rates maintained a steady **60 FPS** line on mobile viewports with no layout shifts (CLS = 0).`
  }
];
