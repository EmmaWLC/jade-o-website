import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homepageType = defineType({
  name: 'homepage',
  title: 'HomePage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // --- Hero Section ---
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'internationalizedArrayString',
      description: 'The main headline on the homepage',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'internationalizedArrayText',
      description: 'A short introduction under the main title',
    }),
    defineField({
      name: 'newsLinkText',
      title: 'News Button Text',
      type: 'internationalizedArrayString',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'internationalizedArrayString',
        }
      ]
    }),

    // --- Split Hero Section (新增) ---
    defineField({
      name: 'heroSplit',
      title: 'Hero Split Section',
      type: 'object',
      description: 'Two featured projects displayed side-by-side',
      fields: [
        {
          name: 'leftProject',
          title: 'Left Project',
          type: 'reference',
          to: [{ type: 'project' }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'rightProject',
          title: 'Right Project',
          type: 'reference',
          to: [{ type: 'project' }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Bottom Description',
          type: 'internationalizedArrayText',
          description: 'Text displayed below the images',
        },
      ],
    }),

    // --- Featured Content ---
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      description: 'Select projects to display on the homepage',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }]
        }
      ],
    }),

    // --- Extra Info ---
    defineField({
      name: 'contactTagline',
      title: 'Contact Tagline',
      type: 'internationalizedArrayString',
    }),
  ],

  preview: {
    select: {
      titleArray: 'title',
      subtitleArray: 'subtitle',
    },
    prepare({ titleArray, subtitleArray }) {
      const titleEntry = titleArray?.find((i: any) => i._key === 'zh') || titleArray?.[0]
      const subtitleEntry = subtitleArray?.find((i: any) => i._key === 'zh') || subtitleArray?.[0]

      return {
        title: titleEntry?.value || 'Untitled Home',
        subtitle: subtitleEntry?.value || 'No subtitle set',
        icon: HomeIcon,
      }
    },
  },
})