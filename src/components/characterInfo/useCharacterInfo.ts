import { gql, useQuery } from "@apollo/client";


export const GET_CHARACTER_INFO = gql`
  query getCharacterInfo($id: ID){
    person(id: $id){
      name
      birthYear
      eyeColor
      gender
      height
      homeworld{
        name
        id
      }
      species {
        name
      }
    }
  }
`;

export interface PERSON {
  name: string;
  birthYear: string;
  eyeColor: string
  gender: string;
  homeWorld: HomeWorld;
  species: Species; 
};

export interface HomeWorld{
  name: string;
  id: string;
}

export interface Species {
  name: string;
}

export default function useCharacterInfo(characterId: string){

  const {loading, error, data} = useQuery(GET_CHARACTER_INFO, {
      variables: {id: characterId}
    });

  return {
    person: data?.person,
    loading,
    error
  }
}