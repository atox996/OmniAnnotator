export interface Plugin {
  name: string;
  init(): void;
  destroy(): void;
}
