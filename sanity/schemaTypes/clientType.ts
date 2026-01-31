import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const clientType = defineType({
  name: 'client',
  title: 'Clients',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Client Name',
      // 💡 改為多語系字串陣列
      type: 'internationalizedArrayString',
      description: 'Please enter the client name in each language.'
    })
  ],
  preview: {
    select: {
      nameArray: 'name',
    },
    prepare(selection: Record<string, any>) {
      const { nameArray } = selection;

      // 嘗試尋找英文名稱 (_key: 'en')
      const englishName = Array.isArray(nameArray) 
        ? nameArray.find((item: any) => item._key === 'en')?.value 
        : null;

      // 如果沒英文，抓取第一個現有的名稱
      const fallbackName = nameArray?.[0]?.value;

      return {
        title: englishName || fallbackName || 'Untitled Client',
        icon: UserIcon
      };
    },
  },
})