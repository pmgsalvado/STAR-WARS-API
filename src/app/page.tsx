"use client"
import Link from "next/link";
import styles from "./page.module.css";

import { useQuery, gql } from "@apollo/client";
import FilmList from "@/components/FilmList"


// to erase in the future
import characterConstant from "../../public/character.json"

export default function Home() {

  //console.log(characterConstant.characters)
  // Map through characters Array an populale table with character info
  const charactersElements = characterConstant.characters.map(character => 
    <tr key={character.id} className={styles.trow}>
      <td>
        <Link href={`/pages/${character.id}`}>
          {character.name}
        </Link>
      </td> 
      <td>
        <Link href={`/pages/${character.id}`}>
          {character.gender}
        </Link>
      </td>
      <td>
        <Link href={`/pages/${character.id}`}>
          {character.skinColor}z
        </Link>
        </td>
    </tr>
  )


  return (
    
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>SWAPI - Star Wars API Fetch Characters - GraphQl</h1>
          <FilmList />
        </main>
      </div>
   
  );
}
