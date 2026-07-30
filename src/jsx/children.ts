import type { Child } from './base'

export const toArray = (children: Child): Child[] =>
  Array.isArray(children) ? children : [children]
export const Children = {
  map: (children: Child[], fn: (child: Child, index: number) => Child): Child[] =>
    { throw new Error("STUB"); },
  forEach: (children: Child[], fn: (child: Child, index: number) => void): void => {
      throw new Error("STUB");
  },
  count: (children: Child[]): number => { throw new Error("STUB"); },
  only: (_children: Child[]): Child => {
      throw new Error("STUB");
  },
  toArray,
}
