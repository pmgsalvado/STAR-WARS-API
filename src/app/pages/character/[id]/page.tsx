import CharacterInfo from "@/components/characterInfo/CharacterInfo";


export default async function Character(
  {params,}
  : {params: Promise<{id: string}>}) {
  
    const { id } = await params;
    return (
      <>
        <CharacterInfo characterId={id} />
      </>
    )
}