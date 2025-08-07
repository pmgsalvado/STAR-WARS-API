import { render, screen, waitFor} from "@testing-library/react"
import { MockedProvider} from "@apollo/client/testing"
import FilmList from "./FilmList"

import { GET_FILM_SLICE, AllFilmsResult } from "./useFilmList";

// Create a mock response matching the GraphQL query shape
const Filmmocks = [
  {
    request: {
      query: GET_FILM_SLICE,
      variables: {
        first: 2
      }
    },
    result:{
      data: {
        allFilms:{
          edges: [
            {
              node: {
                id: "1",
                title: "A New Hope"
              },
              cursor: "cursor-1",
            }
          ],
          pageInfo:{
            endCursor: "cursor-1",
            hasNextPage: false,
          },
        },
      },
    },
  },
];


test("renders a film title", async () => {
    render(
      <MockedProvider mocks={Filmmocks} addTypename={false}>
        <FilmList />
      </MockedProvider>
    );
  expect(screen.getByText("Loading....")).toBeInTheDocument();
  await waitFor(()=>{
    expect(screen.getByText("A New Hope")).toBeInTheDocument()});
  })


  const errorMocks = [
    {
      request: {
        query: GET_FILM_SLICE,
        variables: {first: 2}
      },
      error: new Error("Query Failed"),
    },
  ];

  test("render error if query fails", async ()=>{
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <FilmList />
      </MockedProvider>
    );

    await waitFor(()=> {
      expect(screen.getByText("Error: Query Failed")).toBeInTheDocument();
    })
  })