"use client"
import {gql, useQuery} from "@apollo/client"

const GET_CHARACTER_LIST = gql`
  query{
    allPeople{
      edges {
        node{
          id
          name
        }
      }
    }
  }
`;

export interface AllPeopleResult {
  allPeople: {
    edges: PEOPLE[];
  }
}

export interface PEOPLE{
  node: PEOPLENODE;
  
}

export interface PEOPLENODE{
  name: string;
  id: string;
}

export default function useCharacterList(){

  const {data, loading, error} = useQuery<AllPeopleResult>(GET_CHARACTER_LIST);

  return {
    allPeople: data?.allPeople?.edges,
    loading,
    error
  };
}