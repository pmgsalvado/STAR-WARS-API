import { useEffect, useState } from "react";
import useCharacterList, {PEOPLE} from "./useCharacterList"
import Alphabet from "../alphabet/Alphabet";
import styles from "@/components/components.module.css"
import Link from "next/link";
export default function characterList(){

  // since this is just a test and the GRaphQl doesn´t have a schema to search only for a first letter
  // and the amount of data is not that much we can save it locally
  const [people, setPeople] = useState<PEOPLE[]>([])
  const [letter, setLetter] = useState<string>("")
  const {allPeople, loading, error} = useCharacterList();

  // to run when component rendered, and will change each time allPeople change (not going to happen)
  useEffect(()=>{
    if(allPeople){
      setPeople(allPeople)
    }
  }, [allPeople])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  // array first letter of each character-  with removed duplicates - to be used in the alphabet as prop
  const peopleFirstLetter = people ? Array.from(new Set(people.map(person => person.node.name[0]))) : []
  
  // set the letter selected in the Alphabet component
  function onClickHandler(letter: string){
    setLetter(letter)
  }

  // if letter selected filter by first letter name so thar only the characters with thar letter show in the card list
  // if not letter all characters appear on the list
  const characterFiltered = letter == "" ? people :
    people.filter(person => person.node.name[0] === letter)

  // generate DOM element to be rendered
  const characterFilteredElement = characterFiltered.map(person => <li key={person.node.id}> {person.node.name}</li>)
  
  return (
    <div className={styles.page}>
      <h1>CharacterList</h1>
      {people && 
        <Alphabet lettersArray={peopleFirstLetter} onClickHandler={onClickHandler}/>
      }
      <p>Characters List:</p>
      <div className={styles.card_container}>
        {characterFiltered.map(person => 
          <div key={person.node.id} className={styles.card}>
            <Link href={`/pages/character/${person.node.id}`}>
              {person.node.name}
            </Link>
            
        </div>  
        )}
      </div>
    </div>
  )
}