import { renderHook, waitFor} from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import useFilmList, { GET_FILM_SLICE, AllFilmsResult } from "./useFilmList"

const PAGE_SIZE = 2;

const mockData: AllFilmsResult = {
  allFilms:{
    edges: [
      {node: {id: "1", title: "A New Hope"}, cursor: "cursor1"},
      {node: {id: "2", title: "Empire Strikes Back"}, cursor: "cursor2"}
    ],
    pageInfo: {
      endCursor: "cursor2",
      hasNextPage: true,
    }
  }
}

const mock = [
  {
    request: {
      query: GET_FILM_SLICE,
      variables: { first: PAGE_SIZE}
    },
    result: {
      data:  mockData
    }
  }
];

test(" it should show Loading state and then data", async ()=>{
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <MockedProvider mocks={mock} addTypename={false}>
      {children}
    </MockedProvider>
  );

  const {result} = renderHook(() => useFilmList(), {
      wrapper,
    });

   expect(result.current.loading).toBe(true);

   await waitFor(()=>{
    expect(result.current.loading).toBe(false);
   })

   
   expect(result.current.error).toBeUndefined();
   expect(result.current.allFilms?.edges.length).toBe(2);
   expect(result.current.allFilms?.edges[0].node.title).toBe("A New Hope");

})