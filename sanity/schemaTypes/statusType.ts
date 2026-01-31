import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const statusType = defineType({
  name: 'status',
  title: 'Status',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Status Name', 
      // 💡 關鍵：改為多語系陣列類型
      type: 'internationalizedArrayString', 
      description: 'Please enter the status name in each language (e.g., Ongoing / In Progress).'
    })
  ],
  // 💡 加入預覽設定，讓你在左側清單能直接看到文字
  preview: {
    select: {
      nameArray: 'name',
    },
    prepare(selection: Record<string, any>) {
      const { nameArray } = selection;

      // 💡 邏輯：從陣列中尋找 _key 等於 'en' 的物件
      const englishEntry = Array.isArray(nameArray) 
        ? nameArray.find(item => item._key === 'en') 
        : null;

      // 如果有找到英文就顯示英文，沒找到就顯示第一個語系，再沒有就顯示預設文字
      const displayValue = englishEntry?.value || nameArray?.[0]?.value || 'Untitled';
      
      return {
        title: displayValue,
        subtitle: 'Status Label', // 可以在下面小字標註類型
        icon: TagIcon
      };
    }
  },
})