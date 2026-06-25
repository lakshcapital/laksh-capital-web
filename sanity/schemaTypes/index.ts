import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './category'
import { fundType } from './fund'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, fundType],
}
