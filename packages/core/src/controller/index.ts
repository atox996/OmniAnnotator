import { EventEmitter } from "eventemitter3";

import type { AnnotationManager } from "../manager";
import type { Strategy } from "./strategies";

interface EventTypes {
  start(): void;
}

export class AnnotationController extends EventEmitter<EventTypes> {
  manager: AnnotationManager;
  strategy: Strategy | null = null;
  constructor(manager: AnnotationManager) {
    super();
    this.manager = manager;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
}
