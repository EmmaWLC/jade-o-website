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
      // 改成多國語系字串
      type: 'internationalizedArrayString',
      description: 'The main headline on the homepage',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      // 改成多國語系長文字
      type: 'internationalizedArrayText',
      description: 'A short introduction under the main title',
    }),
    defineField({
      name: 'newsLinkText',
      title: 'News Button Text',
      // 按鈕文字也需要多國語系
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
          // 圖片敘述通常也要分語言，對 SEO 有幫助
          type: 'internationalizedArrayString',
        }
      ]
    }),

    // --- Featured Content ---
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      description: 'Select projects to display on the homepage',
      type: 'array',
      // 這裡不需要改！因為引用的是 project 本體，
      // 語言內容會去 project 裡面抓，這裡只是建立連結。
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
  // ... 前面的 fields 代碼

  preview: {
    select: {
      titleArray: 'title', // 抓取多國語系標題陣列
      subtitleArray: 'subtitle',
    },
    prepare({ titleArray, subtitleArray }) {
      // 1. 優先找中文 (zh) 的內容，找不到就找英文 (en)，再找不到就抓陣列第一個
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