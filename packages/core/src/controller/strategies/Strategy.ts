import type { AnnotationAny } from "../../types";

export default abstract class Strategy {
  static readonly type: AnnotationAny["type"];
}
