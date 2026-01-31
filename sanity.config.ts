'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    internationalizedArray({
      languages: [
        { id: 'zh', title: '中文' },
        { id: 'en', title: 'English' },
        { id: 'jp', title: '日本語' }, // 未來隨時增加
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string', 'text'], // 定義哪些型別需要多國語系
    })
  ],
})
