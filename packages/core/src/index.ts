// @omni-annotator/core

export interface CoreConfig {
  name: string;
}

export function createCore(config: CoreConfig) {
  return {
    name: config.name,
    info() {
      return `Core: ${config.name}`;
    },
  };
}
