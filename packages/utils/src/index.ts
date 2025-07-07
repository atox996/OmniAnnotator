// @omni-annotator/utils

/**
 * 空操作函数（no operation），常用于默认回调或占位
 */
export function noop(): void {
  return void 0;
}

export function isString(val: unknown): val is string {
  return typeof val === "string";
}
