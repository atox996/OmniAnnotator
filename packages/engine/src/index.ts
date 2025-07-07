// @omni-annotator/engine

export interface EngineConfig {
  version: string;
}

export function createEngine(config: EngineConfig) {
  return {
    version: config.version,
    info() {
      return `Engine: ${config.version}`;
    },
  };
}
