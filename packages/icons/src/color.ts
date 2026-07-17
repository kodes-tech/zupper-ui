// Primeiro stroke/fill não-"none" encontrado na árvore de elementos React de um
// SVG. Agnóstico de renderer: funciona tanto nos componentes react-native-svg
// (native) quanto nos <svg> DOM (web), porque ambos são só elementos com props.
export const firstColor = (node: unknown): string | undefined => {
  if (!node || typeof node !== 'object') return undefined;
  const props = (node as { props?: Record<string, unknown> }).props ?? {};
  for (const key of ['stroke', 'fill'] as const) {
    const value = props[key];
    if (typeof value === 'string' && value !== 'none') return value;
  }
  const children = props.children;
  const list = Array.isArray(children) ? children : children != null ? [children] : [];
  for (const child of list) {
    const found = firstColor(child);
    if (found) return found;
  }
  return undefined;
};
