"use client"
import styles from "../components.module.css"
import usePlanetList from "./usePlanetList"
import Link from "next/link";

export default function PlanetList(){

  const {loading, error, allPlanets} = usePlanetList();

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  const planetListElement = allPlanets ? allPlanets.map(planet => 
    <div key={planet.node.id} className={styles.card}>
      <Link href={`/pages/planet/${planet.node.id}`}>{planet.node.name}</Link>
    </div>
  ): [];

  return (
    <div className={styles.page}>
      <h1>Planet List</h1>
      <div className={styles.card_container}>
        {planetListElement}
      </div>
    </div>
  )
}