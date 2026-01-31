import { type SchemaTypeDefinition } from 'sanity'
import { globalLabelType } from './globalLabelType'
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


import { navItemType, navigationSettingsType } from './navigationTypes'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    navItemType,
    navigationSettingsType,
    newsType,
    authorType,
    projectType,
    collaboratorsType,
    statusType,
    clientType,
    designTeamType,
    homepageType,
    globalLabelType,
    usageType,
    awardsType,
  ],
}
