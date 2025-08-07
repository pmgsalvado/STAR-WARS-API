import { gql, useQuery } from "@apollo/client";

// query definition with pagination
const PAGE_SIZE = 2;

export const GET_FILM_SLICE = gql`
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

export interface Film {
  id: string;
  title: string;
}

export interface FilmEdge {
  node: Film;
  cursor: string;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface AllFilmsResult {
  allFilms: {
    edges: FilmEdge[];
    pageInfo: PageInfo;
  }
}

export default function useFIlmList(){

  const {data, loading, error, fetchMore} = useQuery<AllFilmsResult>(GET_FILM_SLICE, {
      variables: {first: PAGE_SIZE},
      notifyOnNetworkStatusChange: true,
    });
  
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
    };




  return {
    allFilms: data?.allFilms,
    loading,
    error,
    handleLoadMore
  };

}