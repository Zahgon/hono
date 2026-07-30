import type { Child } from '../base'
import { DOM_ERROR_HANDLER } from '../constants'
import type { Context } from '../context'
import { globalContexts } from '../context'
import { setInternalTagFlag } from './utils'

export const createContextProviderFunction =
  <T>(values: T[]): Function =>
  ({ value, children }: { value: T; children: Child[] }) => {
      throw new Error("STUB");
  }

export const createContext = <T>(defaultValue: T): Context<T> => {
  const values = [defaultValue]
  const context: Context<T> = createContextProviderFunction(values) as Context<T>
  context.values = values
  context.Provider = context
  globalContexts.push(context as Context<unknown>)
  return context
}
