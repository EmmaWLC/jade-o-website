import { LinkIcon } from '@sanity/icons'
import { defineField, defineType, defineArrayMember } from 'sanity'

// 單一導覽項目
export const navItemType = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description: '例如：/projects, /about',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare(selection) {
      const { title, url } = selection
      const displayTitle = Array.isArray(title) ? title[0]?.value : title
      return {
        title: displayTitle,
        subtitle: url,
      }
    },
  },
})

// 主要導覽設定
export const navigationSettingsType = defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
      hidden: true,
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Main Navigation',
      }
    },
  },
})