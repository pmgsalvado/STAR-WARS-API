import { renderHook, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import useCharacterInfo, {GET_CHARACTER_INFO, PERSON} from "./useCharacterInfo";

const mockData = {
  person: {
    name: "Luke Skywalker",
    birthYear: "19BBY",
    eyeColor: "Blue",
    gender: "Male",
    homeWorld: {
      name: "Tatooine",
      id: "asdqw"
    },
    species: {
      name: "Human",
    },
  },
}

const mock = [
  {
    request: {
      query: GET_CHARACTER_INFO,
      variables: {id: "1"},
    },
    result: {data: mockData}
  }
]

test("it should shoe loading state followed by the data", async ()=>{
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <MockedProvider mocks={mock} addTypename={false}>
      {children}
    </MockedProvider>
  );
  
  const {result} = renderHook(()=> useCharacterInfo("1"), { wrapper });

  expect(result.current.loading).toBe(true)

  await waitFor(()=>{
    expect(result.current.loading).toBe(false)
  });
  expect(result.current.person.name).toBe("Luke Skywalker");
})
