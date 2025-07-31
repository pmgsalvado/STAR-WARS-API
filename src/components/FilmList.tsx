import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";

// query definition  ( not breing used anymore)
const GET_FILM = gql`
  query {
    allFilms{
      films{
        id
        title
        }
      }
}`;

interface FILMS {
  id: string;
  title: string;
}

// query definition with pagination
const PAGE_SIZE = 2;

const GET_FILM_SLICE = gql`
  query ($first: Int!, $after: String){
    allFilms(first:$first, after: $after){
      edges {
        node {
          id
          title
        }
      cursor
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
`;

interface Film {
  id: string;
  title: string;
}

interface FilmEdge {
  node: Film;
  cursor: string;
}

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

interface AllFilmsResult {
  allFilms: {
    edges: FilmEdge[];
    pageInfo: PageInfo;
  }
}



// component definition
export default function FilmList(){

  // fetch films two by two Pagination
  const {data, loading, error, fetchMore} = useQuery<AllFilmsResult>(GET_FILM_SLICE, {
    variables: {first: PAGE_SIZE},
    notifyOnNetworkStatusChange: true,
  });

  const [films, setFilms] = useState<FilmEdge[]>([])

  useEffect(()=>{
    if (data?.allFilms?.edges) {
      setFilms(data.allFilms.edges)
    }
  }, [data])

  async function handleLoadMore(){
    const endCursor = data?.allFilms?.pageInfo?.endCursor;

    const { data: moreData } = await fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: endCursor,
      }, 
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
        return {
          allFilms: {
            edges: [...prev.allFilms.edges, ...fetchMoreResult.allFilms.edges],
            pageInfo: fetchMoreResult.allFilms.pageInfo,
          },
        }
      }
    });

    if(moreData?.allFilms?.edges) {
      setFilms((prev) => [...prev, ...moreData.allFilms.edges])
    }
  };

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error: {error.message}</p>

  
  return (
    <div>

      {films.length != 0 && (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Film Name</th>
            
          </tr>
        </thead>
        <tbody>

          {films.map(({node}) => (
            <tr key={node.id} className={styles.trow}>
              <td>
                <Link href={`pages/${node.id}`}>
                  {node.title}
                </Link>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>)}

      {data?.allFilms.pageInfo.hasNextPage && (
        <button className={styles.loadButton} onClick={handleLoadMore}>Load More</button>
      )}  
    </div>
  )

}