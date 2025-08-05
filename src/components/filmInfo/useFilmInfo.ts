"use client"
import { gql, useQuery } from "@apollo/client";


// query definition
const GET_FILM_INFO = gql`
  query getFilmInfo($id: ID){
    film(id: $id){
          id
          title
          producers
          planetConnection{
            planets {
              id
              name
            }
          }
          characterConnection{
            characters {
              id
              name
            }
          }
        }
  }
`;

// variable type definition
export interface PLANET {
  id: string;
  name: string;
}

export interface CHARACTER {
  id: string;
  name: string;
}

export interface FILMS {
  id: string;
  title: string;
  producers: string[];
  planetConnection: {
    planets: PLANET[]
  }
  characterConnection: {
    characters: CHARACTER[]
  }

}


export default function useFilmInfo(filmId: string){
  const {loading, error, data} = useQuery<{film: FILMS}>(GET_FILM_INFO, {
      variables: {id: filmId},
      fetchPolicy: "network-only",
    })
  
    return {
      film: data?.film,
      loading,
      error
    };
}
