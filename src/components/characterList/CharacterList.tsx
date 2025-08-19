import { useEffect, useState } from "react";
import useCharacterList, {PEOPLE} from "./useCharacterList"
import Alphabet from "../alphabet/Alphabet";
export default function characterList(){

  // since this is just a test and the GRaphQl doesn´t have a schme to search only for a first letter
  // and the amount of data is not that much we can save it locally
  const [people, setPeople] = useState<PEOPLE[]>([])
  const [letter, setLetter] = useState<string>("")
  const {allPeople, loading, error} = useCharacterList();
  //console.log(allPeople.length);


  useEffect(()=>{
    if(allPeople){
      setPeople(allPeople)
      
    }
  }, [allPeople])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  
  const peopleFirstLetter = people ? Array.from(new Set(people.map(person => person.node.name[0]))) : []
  
  
  function onClickHandler(letter: string){
    setLetter(letter)
  }

  const characterFiltered = letter == "" ? people :
    people.filter(person => person.node.name[0] === letter)

  const characterFilteredElement = characterFiltered.map(person => <li key={person.node.id}> {person.node.name}</li>)

  console.log("filterd", characterFiltered)
  // this is suppose to be inside handleclick to filter for the result according to letter clicked
  //const allPeopleElements = people.map(person => <li key={person.node.id}> {person.node.name}</li>)
  
  return (
    <>
      <h1>CharacterList</h1>
      {people && 
        <Alphabet lettersArray={peopleFirstLetter} onClickHandler={onClickHandler}/>
      }
      <p>List element below</p>
      <ul>
          {characterFilteredElement}
      </ul>
    </>
  )
}