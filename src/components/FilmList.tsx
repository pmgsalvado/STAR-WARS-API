import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import styles from "@/app/page.module.css";

// query definition
const GET_FILM = gql`
  query {
    allFilms{
      films{
        id
        title
        }
      }
    }
`;


interface FILMS {
  id: string;
  title: string;
}

// component definition
export default function FilmList(){
  const {loading, error, data} = useQuery(GET_FILM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  

  const filmListElement = (data.allFilms.films as FILMS[]).map(film =>
    <tr key={film.id} className={styles.trow}>
      <td>
        <Link href={`pages/${film.id}`}>
          {film.title}
        </Link>
      </td>
      
    </tr>
    
    )

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Film Name</th>
            
          </tr>
        </thead>
        <tbody>
          {filmListElement}
        </tbody>
      </table>
    </div>
  )

}