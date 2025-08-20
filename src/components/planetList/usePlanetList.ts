import {gql, useQuery} from "@apollo/client"


const GET_PLANET_LIST = gql`
  query{
    allPlanets{
      edges{
        node{
          id
          name
        }
      }
    }
  }
`;


export interface Planet{
  name: string;
  id: string;
}

export interface PlanetEdge{
  node: Planet;

}

export interface AllPlanetsResult{
  allPlanets: {
    edges: PlanetEdge[];
  }
}


export default function usePlanetList(){

  const {loading, error, data} = useQuery<AllPlanetsResult>(GET_PLANET_LIST)

  return {
    allPlanets: data?.allPlanets?.edges,
    loading,
    error,
  }
}