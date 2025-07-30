

import FilmInfo from "@/components/FilmInfo"

export default async function Film({params,}
   : {params: Promise<{slug: string}>}){

    const { slug } = await params
  return (
    <div>
      <h2>Teste page {decodeURIComponent(slug)}</h2>
      <FilmInfo film_id={slug} />
    </div>
  )
}