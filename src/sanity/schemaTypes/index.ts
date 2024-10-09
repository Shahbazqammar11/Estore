import { type SchemaTypeDefinition } from 'sanity'
import { brand } from './brandsname'
import { newArrivalSchema } from './newarrival'
import { topSellingSchema } from './topselling'
import { browseByDressStyleSchema } from './dressbystyle'
import { customerCommentSchema } from './comments'
import { footerSchema } from './footer'
import { bannerSchema } from './banner'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerSchema,brand,newArrivalSchema,
    topSellingSchema, browseByDressStyleSchema,
    customerCommentSchema,footerSchema],
}
