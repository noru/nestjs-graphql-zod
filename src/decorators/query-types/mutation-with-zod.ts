import { Mutation, MutationOptions as MO } from '@nestjs/graphql'
import { MethodWithZod } from '../common'
import type { IModelFromZodOptions, ZodInput } from '../../model-from-zod'

export type MutationOptions<T extends ZodInput> = MO<T> & {
  /**
   * Options for model creation from `zod`.
   *
   * @type {IModelFromZodOptions<T>}
   * @memberof QueryOptions
   */
  zod?: IModelFromZodOptions<T>
}

/**
 * Mutation handler (method) Decorator.
 * Routes specified mutation to this method.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function MutationWithZod<T extends ZodInput>(input: T): MethodDecorator

/**
 * Mutation handler (method) Decorator.
 * Routes specified mutation to this method.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @param {string} name The name of the method.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function MutationWithZod<T extends ZodInput>(input: T, name: string): MethodDecorator

/**
 * Mutation handler (method) Decorator.
 * Routes specified mutation to this method.
 *
 * Uses a `zod` object.
 *
 * @export
 * @template T The type of the zod object input.
 * @param {T} input The zod input object.
 * @param {MutationOptions<T>} options The options for query method.
 * @return {MethodDecorator} A {@link MethodDecorator}.
 */
export function MutationWithZod<T extends ZodInput>(input: T, options: MutationOptions<T>): MethodDecorator

export function MutationWithZod<T extends ZodInput>(input: T, nameOrOptions?: string | MutationOptions<T>) {
  return MethodWithZod(input, nameOrOptions, Mutation)
}
