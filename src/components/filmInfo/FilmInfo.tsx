"use client"
import useFilmInfo from "./useFilmInfo";
import styles from "../Info.module.css"
import Link from "next/link";

// variable type definition
interface FilmInfoProps {
  filmId: string;
}

export default function FilmInfo({filmId}: FilmInfoProps){

  const decodedId = decodeURIComponent(filmId)
  
  const { loading, error, film} = useFilmInfo(decodedId)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!film) return <p>No film found</p>
  

  const title = film?.title;
  const producersList = (film.producers).map( (producer: string, index: number) => <li key={index}>{producer}</li>)
  const planetList = (film.planetConnection.planets).map( planet => 
    <li key={planet.id}>
      <Link href={`/pages/planet/${planet.id}`}>
        {planet.name}  {planet.id}
      </Link>
      </li> 
  )
  const characterList = (film.characterConnection.characters).map(character => 
    <li key={character.id}>
      <Link href={`/pages/character/${character.id}`}>
        {character.name}
      </Link>
    </li>
  )

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <h3>Producers:</h3>
      <ul className={styles.producersList}>
        {producersList}
      </ul>
      <h3>Planets:</h3>
      <ul className={styles.planetsList}>
        {planetList}
      </ul>
      <h3 className={styles.listTitle}> Characters</h3>
      <ul className={styles.itemsList}>
        {characterList}
      </ul>
    </div>
  )
}




