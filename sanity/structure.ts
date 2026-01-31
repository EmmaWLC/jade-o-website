import type { StructureResolver } from 'sanity/structure'
import { HomeIcon, DocumentIcon, UsersIcon, TagIcon, UserIcon, BellIcon, StarIcon, LinkIcon, TranslateIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage Settings')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
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

      // --- Settings 分類 ---
      S.listItem()
        .title('Navigation Settings')
        .icon(LinkIcon)
        .child(
          S.document()
            .schemaType('navigationSettings')
            .documentId('navigationSettings')
        ),
      
      S.divider(), // 👈 這是你要的分隔線
      
      S.documentTypeListItem('globalLabel')
        .title('globalLabel')
        .icon(TranslateIcon),

      S.divider(),

      // --- 剩餘項目 ---
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'homepage',
            'project',
            'collaborators',
            'status',
            'client',
            'designTeam',
            'news',
            'category',
            'author',
            'awards',
            'usage',
            'navigationSettings',
            'globalLabel',
          ].includes(item.getId()!),
      ),
    ])