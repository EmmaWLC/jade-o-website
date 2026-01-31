import HeroSplit from '@/components/home/HeroSplit'
import { client } from '@/sanity/lib/client'
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries'


export default async function HomePage() {
  const data = await client.fetch(HOMEPAGE_QUERY)
  
  if (!data?.heroSplit?.leftProject || !data?.heroSplit?.rightProject) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">請先在 Sanity Studio 設定 Hero Split Section</p>
      </main>
    )
  }
  
  const { leftProject, rightProject, description } = data.heroSplit

  return (
    <main>
      <HeroSplit 
        leftProject={leftProject}
        rightProject={rightProject}
        description={description}
      />
    </main>
  )
}