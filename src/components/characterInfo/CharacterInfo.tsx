"use client"

import {gql, useQuery} from "@apollo/client"
import styles from "../Info.module.css"


const GET_CHARACTER_INFO = gql`
  query getCharacterInfo($id: ID){
    person(id: $id){
      name
      birthYear
      eyeColor
      gender
      height
      homeworld{
        name
        id
      }
      species {
        name
      }
    }
  }
`;

interface PERSON {
  name: string;
  birthYear: string;
  eyeColor: string
  gender: string;
  homeWorld: HomeWorld;
  species: Species; 
};

interface HomeWorld{
  name: string;
  id: string;
}

interface Species {
  name: string;
}

interface CharacterInfoProps {
  characterId: string;
}

export default function CharacterInfo({characterId}: CharacterInfoProps){

  const decodedId = decodeURIComponent(characterId);
  const {loading, error, data} = useQuery(GET_CHARACTER_INFO, {
    variables: {id: decodedId}
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  

  const { name, birthYear, eyeColor, gender, homeWorld, species} = data.person;
  


  return (
    <div className={styles.page}>
      <div className={styles.title}>
        {data.person.name}
      </div>
      <p className={styles.genetal}>Name: {name}</p>
      <p className={styles.genetal}>Birth Year: {birthYear}</p>
      <p className={styles.genetal}>Eye Color: {eyeColor}</p>
      <p className={styles.genetal}>Gender: {gender}</p>
      <p className={styles.genetal}>HomeWorld: {homeWorld}</p>
      <p className={styles.genetal}>Species: {species}</p>
    </div>
  )
}