import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface Project {
  _id: string
  title: any[] // 因為是多語系
  slug: { current: string }
  renderImages?: any[]
  floorPlanImages?: any[]
}

interface HeroSplitProps {
  leftProject: Project
  rightProject: Project
  description?: any[]
}

export default function HeroSplit({ leftProject, rightProject, description }: HeroSplitProps) {
  // 取第一張圖片
  const leftImage = leftProject.renderImages?.[0]
  const rightImage = rightProject.floorPlanImages?.[0]
  console.log(rightProject);
  
  // 取第一個語言的 title
  const leftTitle = leftProject.title?.[0]?.value || 'Project'
  const rightTitle = rightProject.title?.[0]?.value || 'Project'
  
  return (
    <section className="relative h-screen w-full">
      <div className="flex h-full w-full">
        {/* 左側專案 */}
        <Link 
          href={`/projects/${leftProject.slug.current}`}
          className="relative w-1/2 overflow-hidden group"
        >
          {leftImage && (
            <Image
              src={urlFor(leftImage).url()}
              alt={leftTitle}
              fill
              className="object-cover transition-transform duration-500 cursor-pointer"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </Link>

        {/* 右側專案 */}
        <Link 
          href={`/projects/${rightProject.slug.current}`}
          className="relative w-1/2 overflow-hidden group"
        >
          {rightImage && (
            <Image
              src={urlFor(rightImage).url()}
              alt={rightTitle}
              fill
              className="object-cover transition-transform duration-500  cursor-pointer"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </Link>
      </div>

      {/* 底部文字描述 */}
      {description && description[0]?.value && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-8 text-center">
          <p className="text-gray-800 max-w-4xl mx-auto">{description[0].value}</p>
        </div>
      )}
    </section>
  )
}