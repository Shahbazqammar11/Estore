import { defineType } from 'sanity';

export const browseByDressStyleSchema = defineType({
  name: 'dressStyle',
  title: 'Browse By Dress Style',
  type: 'document',
  fields: [
    {
      name: 'styleName',
      title: 'Style Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
});
