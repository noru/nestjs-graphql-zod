import { Query, QueryOptions as QO } from '@nestjs/graphql'
import { MethodWithZod } from '../common'
import type { IModelFromZodOptions, ZodInput } from '../../model-from-zod'

export type QueryOptions<T extends ZodInput> = QO<T> & {
  /**
   * Options for model creation from `zod`.
   *
   * @type {IModelFromZodOptions<T>}
   * @memberof QueryOptions
   */
  zod?: IModelFromZodOptions<T>
}

/**
 * Query handler (method) Decorator.
 * Routes specified query to this method.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function QueryWithZod<T extends ZodInput>(input: T): MethodDecorator

/**
 * Query handler (method) Decorator.
 * Routes specified query to this method.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @param {string} name The name of the method.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function QueryWithZod<T extends ZodInput>(input: T, name: string): MethodDecorator

/**
 * Query handler (method) Decorator.
 * Routes specified query to this method.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @param {QueryOptions<T>} options The options for query.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function QueryWithZod<T extends ZodInput>(input: T, options: QueryOptions<T>): MethodDecorator

export function QueryWithZod<T extends ZodInput>(input: T, nameOrOptions?: string | QueryOptions<T>) {
  return MethodWithZod(input, nameOrOptions, Query)
}
