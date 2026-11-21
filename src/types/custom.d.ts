declare module "*/Galaxy/Galaxy" {
  import React from "react";
  const Galaxy: React.ComponentType<Record<string, unknown>>;
  export default Galaxy;
}

declare module "*.mjs?url" {
  const src: string;
  export default src;
}

declare const __RESUME_HASH__: string;
