"use client"
import styles from "./page.module.css"
import FilmList from "@/components/filmList/FilmList"
import NavBar from "@/components/navbar/NavBar";
import Link from "next/link";
//import React from "react";


export default function Home() {

  return (
    
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>SWAPI - Star Wars API Fetch Characters - GraphQls</h1>
        </main>
      </div>
   
  );
}
