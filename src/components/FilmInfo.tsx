"use client"
import { gql, useQuery } from "@apollo/client";
import styles from "./FilmInfo.module.css"
import Link from "next/link";

// query definition
const GET_FILM_INFO = gql`
  query getFilmInfo($id: ID){
    film(id: $id){
          id
          title
          producers
          planetConnection{
            planets {
              id
              name
            }
          }
        }
  }
`;

// variable type definition
interface PLANET {
  id: string;
  name: string;
}

interface FILMS {
  id: string;
  title: string;
  producers: string[];
  planetConnection: {
    planets: PLANET[]
  }

}


interface FilmInfoProps {
  film_id: string;
}

export default function FilmInfo({film_id}: FilmInfoProps){

  const decodedId = decodeURIComponent(film_id)
  console.log("decoded Id: ",decodedId)
  const {loading, error, data} = useQuery(GET_FILM_INFO, {
    variables: {id: decodedId},
    fetchPolicy: "network-only",
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(data.film)

  const title = data.film.title;
  const producersList = (data.film.producers).map( (producer: string, index: number) => <li key={index}>{producer}</li>)
  const planetList = (data.film.planetConnection.planets as PLANET[]).map( planet => 
    <li key={planet.id}>
      <Link href="">
        {planet.name}
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
    </div>
  )
}
