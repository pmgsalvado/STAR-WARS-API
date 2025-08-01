

import FilmInfo from "@/components/FilmInfo"

export default async function Film({params,}
   : {params: Promise<{slug: string}>}){

    const { slug } = await params
  return (
    <div>
      <FilmInfo filmId={slug} />
    </div>
  )
}