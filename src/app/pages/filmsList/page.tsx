"use client"
import FilmList from "@/components/filmList/FilmList"
import styles from "@/app/page.module.css"


export default function FilmsList(){

    return (
      <div className={styles.filmList_container}>
        <FilmList />
      </div>
    )
  }