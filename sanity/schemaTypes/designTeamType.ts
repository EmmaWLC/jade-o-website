import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const designTeamType = defineType({
  name: 'designTeam',
  title: 'Design Team',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Design Team Name',
      // 💡 改為多語系字串
      type: 'internationalizedArrayString',
      description: 'Please enter the team name in each language.'
    })
  ],
  preview: {
    select: {
      nameArray: 'name',
    },
    prepare(selection: Record<string, any>) {
      const { nameArray } = selection;

      // 1. 優先尋找英文名稱
      const englishName = Array.isArray(nameArray) 
        ? nameArray.find((item: any) => item._key === 'en')?.value 
        : null;

      // 2. 沒英文就抓第一個
      const fallbackName = nameArray?.[0]?.value;

      return {
        title: englishName || fallbackName || 'Untitled Design Team',
        icon: UsersIcon
      };
    },
  },
})