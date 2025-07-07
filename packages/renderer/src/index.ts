// 只做 re-export，用户可按需引入 2d/3d
export * from "./2d";
export * from "./3d";

// @omni-annotator/renderer

export interface RendererConfig {
  type: "2d" | "3d";
}

export function createRenderer(config: RendererConfig) {
  return {
    type: config.type,
    info() {
      return `Renderer: ${config.type}`;
    },
  };
}
