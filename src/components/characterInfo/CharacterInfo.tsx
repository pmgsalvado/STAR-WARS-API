"use client"
import styles from "../Info.module.css"
import useCharacterInfo from "./useCharacterInfo";

interface CharacterInfoProps {
  characterId: string;
}

export default function CharacterInfo({characterId}: CharacterInfoProps){

  const characterDecodedId = decodeURIComponent(characterId);

  const {loading, error, person} = useCharacterInfo(characterDecodedId);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { name, birthYear, eyeColor, gender, homeWorld, species} = person;
  
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        {name}
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