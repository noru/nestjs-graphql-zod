import {
  infer as Infer,
  ParseParams,
  ZodDefault,
  ZodType,
  ZodTypeAny,
} from 'zod'

import { isZodInstance } from './is-zod-instance'

import type { IModelFromZodOptions } from '../model-from-zod'

/**
 * Creates a property descriptor that provides `get` and `set` functions
 * that are using `parse` or `safeParse` methods of the `zod` library.
 *
 * @export
 * @template T The type of the target object.
 * @param {keyof T} key The key of the property that is being created.
 * @param {zod.ZodTypeAny} input The zod object input.
 * @param {IModelFromZodOptions<T>} opts The options.
 * @return {PropertyDescriptor} A {@link PropertyDescriptor}.
 */
export function createZodPropertyDescriptor<T extends ZodType>(
  key: keyof Infer<T>,
  input: ZodTypeAny,
  opts: IModelFromZodOptions<T>
): PropertyDescriptor {
  let defaultValue: any

  if (isZodInstance(ZodDefault, input)) {
    defaultValue = input._def.defaultValue()
  }

  const {
    safe,
    doNotThrow,

    onParsing,
    onParseError,
  } = opts

  let keyProps: Partial<ParseParams> | undefined
  if (typeof onParsing === 'function') {
    keyProps = onParsing(key, defaultValue)
  }

  return {
    get() {
      return this._values?.[key] ?? defaultValue
    },
    set(newValue: any) {
      this._values ??= {}
      if (safe) {
        const result = input.safeParse(newValue, keyProps)
        if (result.success) {
          this._values[key] = result.data
        }
        else {
          let replaceValue: typeof defaultValue

          if (typeof onParseError === 'function') {
            replaceValue = onParseError(
              key,
              newValue,
              defaultValue,
              result.error
            )
          }

          if (typeof replaceValue !== 'undefined') {
            this._values[key] = replaceValue
          }
          else if (doNotThrow) {
            this._values[key] = undefined
          }
          else {
            throw result.error
          }
        }
      }
      else {
        if (doNotThrow) {
          try {
            const result = input.parse(newValue, keyProps)
            this._values[key] = result
          }
          catch (_) {
            this._values[key] = undefined
          }
        }
        else {
          const result = input.parse(newValue, keyProps)
          this._values[key] = result
        }
      }
    }
  } as any as PropertyDescriptor
}
