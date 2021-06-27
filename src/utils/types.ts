export type Unpromise<T> = T extends Promise<infer U> ? U : T

export type ReturnTypeResolved<T extends (...args: any) => any> = Unpromise<
  ReturnType<T>
>
