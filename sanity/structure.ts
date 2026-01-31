import type { StructureResolver } from 'sanity/structure'
import { HomeIcon, DocumentIcon, UsersIcon, TagIcon, UserIcon, BellIcon, StarIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content') // 改為一個更廣義的總標題
    .items([
      S.listItem()
        .title('Homepage Settings')
        .icon(HomeIcon) // 記得匯入 HomeIcon
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage') // 強制指定 ID，確保永遠只有一份主頁資料
        ),
      S.divider(),
      // --- Projects 分類 ---
      S.listItem()
        .title('Projects Management')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.documentTypeListItem('project').title('All Projects').icon(DocumentIcon),
              S.divider(),
              S.documentTypeListItem('status').title('Status').icon(TagIcon),
              S.documentTypeListItem('usage').title('Usage').icon(TagIcon),
              S.documentTypeListItem('client').title('Clients').icon(UserIcon),
              S.documentTypeListItem('collaborators').title('Collaborators').icon(UsersIcon),
              S.documentTypeListItem('designTeam').title('Design Team').icon(UserIcon),
              S.documentTypeListItem('awards').title('Awards').icon(StarIcon),
            ])
        ),

      S.divider(),

      // --- News 分類 ---
      S.listItem()
        .title('News Management')
        .icon(BellIcon)
        .child(
          S.list()
            .title('News')
            .items([
              S.documentTypeListItem('news').title('News'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),

      S.divider(),

      // --- 剩餘項目 ---
      // 過濾掉已經手動排進去的 ID，避免重複出現在選單底部
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['homepage','project', 'collaborators', 'status', 'client', 'designTeam', 'news', 'category', 'author', 'awards', 'usage'].includes(item.getId()!),
      ),
    ])