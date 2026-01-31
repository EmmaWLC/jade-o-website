import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { newsType } from './newsType'
import { authorType } from './authorType'
import { awardsType } from './awardsType'
import { projectType } from './projectType'
import { collaboratorsType } from './collaboratorsType'
import { statusType } from './statusType'
import { usageType } from './usageType'
import { clientType } from './clientType'
import { designTeamType } from './designTeamType'
import { homepageType } from './homepageType'

import { translationType } from './translationType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    newsType,
    authorType,
    projectType,
    collaboratorsType,
    statusType,
    clientType,
    designTeamType,
    homepageType,
    translationType,
    usageType,
    awardsType,
  ],
}
