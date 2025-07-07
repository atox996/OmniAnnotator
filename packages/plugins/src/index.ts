// @omni-annotator/plugins

export interface IPlugin {
  name: string;
  init(): void;
}

export class BasePlugin implements IPlugin {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  init() {
    // 插件初始化逻辑
  }
}
