import { render, screen, waitFor} from "@testing-library/react"
import { MockedProvider} from "@apollo/client/testing"
import FilmList from "./FilmList"

import { GET_FILM_SLICE, AllFilmsResult } from "./useFilmList";
import { GraphQLError } from "graphql";

// Create a mock response matching the GraphQL query shape
const FilmmocksBtnLoadMore = [
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
            hasNextPage: true,
          },
        },
      },
    },
  },
];


test("renders a film title and button Load More", async () => {
  render(
    <MockedProvider mocks={FilmmocksBtnLoadMore} addTypename={false}>
      <FilmList />
    </MockedProvider>
  );
expect(screen.getByText("Loading....")).toBeInTheDocument();
await waitFor(()=>{
  expect(screen.getByText("A New Hope")).toBeInTheDocument()});
 expect(screen.getByText("Load More")).toBeInTheDocument(); 
})

const FilmmocksNotBtnLoadMore = [
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


test("renders a film title and no button Load More", async () => {
  render(
    <MockedProvider mocks={FilmmocksNotBtnLoadMore} addTypename={false}>
      <FilmList />
    </MockedProvider>
  );
expect(screen.getByText("Loading....")).toBeInTheDocument();
await waitFor(()=>{
  expect(screen.getByText("A New Hope")).toBeInTheDocument()});
 expect(screen.queryByText("Load More")).not.toBeInTheDocument(); 
})

const networkErrorMocks = [
  {
    request: {
      query: GET_FILM_SLICE,
      variables: {first: 2}
    },
    error: new Error("Query Failed"),
  },
];

test("render network error if query fails", async ()=>{
  render(
    <MockedProvider mocks={networkErrorMocks} addTypename={false}>
      <FilmList />
    </MockedProvider>
  );

  await waitFor(()=> {
    expect(screen.getByText("Error: Query Failed")).toBeInTheDocument();
  })
})


const graphQLErrorMock = [
  {
    request: {
      query: GET_FILM_SLICE,
      variables: {first: 2}
    },
    result: {
      errors: [new GraphQLError("Error")],
    },
  },
];

test("render GRaphQl Error", async ()=>{
  render(
    <MockedProvider mocks={graphQLErrorMock} addTypename={false}>
      <FilmList />
    </MockedProvider>
  )
  await waitFor(()=> {
  expect(screen.getByText("Error: Error")).toBeInTheDocument();
  })
})