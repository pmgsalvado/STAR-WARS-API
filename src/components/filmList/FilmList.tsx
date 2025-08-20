
import Link from "next/link";
import styles from "../components.module.css";
import useFIlmList from "./useFilmList";


// component definition
export default function FilmList(){

  const {loading, error, allFilms, handleLoadMore}= useFIlmList();

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error: {error.message}</p>
  if (!allFilms) return <p>no Films</p>

  return (
    <div className={styles.page}>

      {allFilms?.edges.length != 0 && (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Film Name</th>
            
          </tr>
        </thead>
        <tbody>

          {allFilms?.edges.map(({node}) => (
            <tr key={node.id} className={styles.trow}>
              <td>
                <Link href={`/pages/films/${node.id}`}>
                  {node.title}
                </Link>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>)}

      {allFilms?.pageInfo.hasNextPage && (
        <button className={styles.loadButton} onClick={handleLoadMore}>Load More</button>
      )}  
    </div>
  )

}