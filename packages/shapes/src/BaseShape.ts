import EventEmitter from "eventemitter3";

// 已无用import，移除

interface EventTypes {
  // 策略层面
  init(): void;
  reset(): void;
  destroy(): void;

  // 绘制过程
  start(): void;
  update(): void;
  end(): void;
  cancel(): void;
}

export abstract class BaseShape<
  TShape extends { type: string } = { type: string },
> extends EventEmitter<EventTypes> {
  abstract readonly type: TShape["type"];
  container: HTMLElement;

  constructor(container: HTMLElement) {
    super();
    this.container = container;
    this.init();
  }

  /**
   * Get the shape of the strategy.
   */
  abstract getShape(): TShape;

  /**
   * Initialize the strategy.
   */
  abstract init(): void;

  /**
   * Reset the strategy.
   */
  abstract reset(): void;

  /**
   * Destroy the strategy.
   */
  abstract destroy(): void;
}
