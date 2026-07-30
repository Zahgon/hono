import type { Child, FC, PropsWithChildren } from '../'
import type { ErrorHandler, FallbackRender } from '../components'
import { DOM_ERROR_HANDLER } from '../constants'
import { Fragment } from './jsx-runtime'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ErrorBoundary: FC<
  PropsWithChildren<{
    fallback?: Child
    fallbackRender?: FallbackRender
    onError?: ErrorHandler
  }>
> = (({ children, fallback, fallbackRender, onError }: any) => {
        throw new Error("STUB");
    }) as any

export const Suspense: FC<PropsWithChildren<{ fallback: any }>> = (({
  children,
  fallback,
}: any) => {
    throw new Error("STUB");
}) as any
/* eslint-enable @typescript-eslint/no-explicit-any */
