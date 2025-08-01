"use client"
import Link from "next/link";
import styles from "./page.module.css";

import { useQuery, gql } from "@apollo/client";
import FilmList from "@/components/FilmList"



export default function Home() {

  return (
    
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>SWAPI - Star Wars API Fetch Characters - GraphQl</h1>
          <FilmList />
        </main>
      </div>
   
  );
}
