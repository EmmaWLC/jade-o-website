import { defineQuery } from 'next-sanity'

// Homepage queries
export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    heroSplit {
      leftProject-> {
        _id,
        title,
        slug,
        renderImages[] {
          _key,
          asset->
        }
      },
      rightProject-> {
        _id,
        title,
        slug,
        floorPlanImages[] {
          _key,
          asset->
        }
      },
      description
    }
  }
`)

// Projects queries
export const ALL_PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    year,
    renderImages[] {
      _key,
      asset->
    }
  }
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    renderImages[] {
      _key,
      asset->
    },
    floorPlanImages[] {
      _key,
      asset->
    }
  }
`)

// News queries
export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    author->
  }
`)