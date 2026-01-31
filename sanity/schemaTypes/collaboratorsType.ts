import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const collaboratorsType = defineType({
  name: 'collaborators', 
  title: 'Collaborators',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name', 
      title: 'Name',
      // 💡 改為多語系字串陣列
      type: 'internationalizedArrayString',
      description: 'Please enter the collaborator name in each language (e.g., Google / 谷歌).'
    })
  ],
  preview: {
    select: {
      nameArray: 'name',
    },
    prepare(selection: Record<string, any>) {
      const { nameArray } = selection;

      // 1. 嘗試尋找英文名稱 (_key: 'en')
      const englishName = Array.isArray(nameArray) 
        ? nameArray.find((item: any) => item._key === 'en')?.value 
        : null;

      // 2. 如果沒英文，抓取陣列中的第一個名稱
      const fallbackName = nameArray?.[0]?.value;

      return {
        // 優先順序：英文 > 第一個現有語言 > Untitled
        title: englishName || fallbackName || 'Untitled Collaborator',
        icon: UsersIcon
      };
    },
  },
})