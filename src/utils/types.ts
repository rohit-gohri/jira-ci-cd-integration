export type Unpromise<T> = T extends Promise<infer U> ? U : T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReturnTypeResolved<T extends (...args: any) => any> = Unpromise<
  ReturnType<T>
>
