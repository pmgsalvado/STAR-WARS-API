import {render, screen, waitFor} from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"

import PlanetList from "./PlanetList"
import { GET_PLANET_LIST, AllPlanetsResult } from "./usePlanetList"

//Mock response matching the GraphQl query shape
const planetMockResponse = [
  {
    request: {
      query: GET_PLANET_LIST,
    },
    result: {
      data: {
        allPlanets:{
          edges: [
            { 
              node: {
                id: "1",
                name: "Planet 1"
              }
            },
            {
              node: {
                id: "2",
                name: "Planet 2",
              }
            }
          ]
        }
      }
    }
  }
];

test("renders a list of planets", async ()=>{
  render(
    <MockedProvider mocks={planetMockResponse} addTypename={false}>
      <PlanetList />
    </MockedProvider>
  )
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitFor(()=>{
    expect(screen.getByText("Planet 1")).toBeInTheDocument();
    expect(screen.getByText("Planet 2")).toBeInTheDocument();
  });
})