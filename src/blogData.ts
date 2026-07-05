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
    id: "rag-pipeline-llama-3",
    title: "Building a RAG Pipeline with Llama 3",
    slug: "building-rag-pipeline-llama-3",
    category: "AI Learning Log",
    tags: ["LLMs", "RAG", "Llama 3", "Python"],
    publishDate: "2026-06-20",
    readTime: "6 min read",
    excerpt: "A comprehensive guide on constructing a Retrieval-Augmented Generation pipeline using Llama 3, vector databases, and efficient chunking strategies for accurate document querying.",
    content: `### Introduction
Retrieval-Augmented Generation (RAG) is transforming how we interact with private documents by grounding Large Language Models in verifiable facts. This post explores building a robust RAG pipeline with Llama 3.

### 1. Document Ingestion & Chunking
The foundation of any RAG system is how you process your documents. We use Semantic Chunking instead of fixed-size splitting to ensure context remains intact. By analyzing sentence embeddings, we only split when there is a significant semantic shift.

### 2. Vector Embeddings
We generate embeddings using dense retrieval models, storing them in a vector database for millisecond-latency cosine similarity searches.

### 3. Llama 3 Generation
Once the top-K relevant chunks are retrieved, they are injected into Llama 3's context window. Strict system prompts are used to ensure Llama 3 only answers based on the provided context, eliminating hallucinations.

### Conclusion
By combining Llama 3's powerful reasoning capabilities with a well-structured RAG pipeline, we can build highly accurate, context-aware AI applications.`
  },
  {
    id: "modern-react-architecture",
    title: "Modern React Architecture Patterns",
    slug: "modern-react-architecture-patterns",
    category: "Engineering Journal",
    tags: ["React", "TypeScript", "Architecture", "Frontend"],
    publishDate: "2026-07-01",
    readTime: "5 min read",
    excerpt: "Exploring modern React architecture patterns for scalability, state isolation, and maximum rendering performance in complex single-page applications.",
    content: `### The Challenge of Scale
As React applications grow, maintaining performance and readability becomes increasingly difficult. Uncontrolled state propagation and deeply nested component trees can lead to render thrashing.

### 1. State Isolation
Instead of relying on massive global contexts or Redux stores for everything, modern architecture favors state isolation. By keeping state as close to where it's used as possible, we minimize unnecessary re-renders.

### 2. Custom Hooks as Controllers
We extract business logic and side effects into custom hooks. This separates the UI rendering layer from the data management layer, making components easier to test and reason about.

### 3. Suspense & Lazy Loading
For optimal bundle sizes, code-splitting at the route and component level using \`React.lazy\` and \`Suspense\` ensures that users only download the JavaScript necessary for their current view.

### Conclusion
Adopting these modern architecture patterns leads to more maintainable, scalable, and performant React applications.`
  }
];

