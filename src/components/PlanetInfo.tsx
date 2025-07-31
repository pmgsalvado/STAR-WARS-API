"use client"

import { gql, useQuery } from "@apollo/client"
import styles from "./Info.module.css"

const GET_PLANET_INFO = gql`
  query getPlanetInfo($id: ID){
    planet(id: $id){
      name
      orbitalPeriod
      population
      terrains
      climates
      gravity
      surfaceWater
      diameter
    }
  }
`
interface PlanetInfo {
  name: string;
  orbitalPeriod: string | undefined;
  population: string;
  terrains: string;
  climates: string;
  gravity: string;
  surfaceWater: string;
  diameter: string;
}

interface PlanetInfoProps {
  planetId: string;
}

export default function PlanetInfo({planetId}: PlanetInfoProps){

  const decodedId = decodeURIComponent(planetId);
  const {loading, error, data} = useQuery(GET_PLANET_INFO, {
    variables: {id: planetId}
  }
  );

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const name = data.planet?.name ?? "";
  const orbitalPeriod = data.planet?.orbitalPeriod ?? "";
  const population = data.planet?.population ?? "";
  const terrains = data.planet?.terrains ?? "";
  const climates = data.planet?.climates ?? "";
  const gravity = data.planet?.gravity ?? "";
  const surfaceWater = data.planet?.surfaceWater ?? "";
  const diameter = data.planet?.diameter ?? "";

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{name}</h1>
      <p className={styles.genetal}>Orbital Period: {orbitalPeriod}</p>
      <p className={styles.genetal}>Population: {population}</p>
      <p className={styles.genetal}>Terrains: {terrains}</p>
      <p className={styles.genetal}>Climates: {climates}</p>
      <p className={styles.genetal}>Gravity: {gravity}</p>
      <p className={styles.genetal}>Surface Water: {surfaceWater}</p>
      <p className={styles.genetal}>Diamter: {diameter}</p>
    </div>
  )

}