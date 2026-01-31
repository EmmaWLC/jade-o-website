import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    select: {
      allNames: 'name', // 這是 internationalizedArrayString 產生的陣列
      media: 'image',
    },
    prepare({ allNames, media }) {
      // 1. 優先尋找中文 (zh)
      // 2. 如果沒中文，找英文 (en)
      // 3. 如果都沒填，就拿陣列裡的第一個值
      // 4. 再都沒有，才顯示 'Untitled'

      const nameEntry =
        allNames?.find((n: any) => n._key === 'en') ||
        allNames?.find((n: any) => n._key === 'zh') ||
        allNames?.[0];

      return {
        title: nameEntry?.value || 'Untitled Author',
        media,
      }
    },
  },
})