import PlanetInfo from "@/components/planetInfo/PlanetInfo"
export default async function Planet(
  {params,}
   : {params: Promise<{id: string}>}){
  
    const { id } = await params

    return (
      <>
        <PlanetInfo planetId={id} />
      </>
      
    )
}