import { type SchemaTypeDefinition } from 'sanity'
import banner from './banner'
import { brand } from './brandsname'
import { newArrivalSchema } from './newarrival'
import { topSellingSchema } from './topselling'
import { browseByDressStyleSchema } from './dressbystyle'
import { customerCommentSchema } from './comments'
import { footerSchema } from './footer'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner,brand,newArrivalSchema,
    topSellingSchema, browseByDressStyleSchema,
    customerCommentSchema,footerSchema],
}
