import {render, screen, waitFor} from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import CharacterInfo from "./CharacterInfo"
import { GET_CHARACTER_INFO, PERSON } from "./useCharacterInfo"

/**
 * Basically the CharacterInfo has a function useCharacterInfo that
 * returns the information of a character.
 * 
 * We use jest.mock to mock the response that the component expects to 
 * test that it renders all information correctly
 */

jest.mock("./useCharacterInfo", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useCharacterInfo from "./useCharacterInfo";

const mockedUseCharacterInfo = useCharacterInfo as jest.Mock;

test("it renders loading state", ()=>{
  mockedUseCharacterInfo.mockReturnValue({
      loading: true,
  });
  render(<CharacterInfo characterId="1"/>)
  expect(screen.getByText("Loading...")).toBeInTheDocument();
})

test("it renders error state", ()=>{
  mockedUseCharacterInfo.mockReturnValue({
      error: true,
  });
  render(<CharacterInfo characterId="1"/>)
  expect(screen.getByText("Error:")).toBeInTheDocument();
})


test("it renders character info", ()=>{  
  mockedUseCharacterInfo.mockReturnValue({
      loading: false,
      error: null,
      person: {
        name: "Luke Skywalker",
        birthYear: "19BBY",
        eyeColor: "Blue",
        gender: "Male",
        homeWorld: "Tatooine",
        species: "Human",
      },
    });

  render( 
    <CharacterInfo characterId="1"/>
  )

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("Birth Year: 19BBY")).toBeInTheDocument();
  expect(screen.getByText("Eye Color: Blue")).toBeInTheDocument();
  expect(screen.getByText("Gender: Male")).toBeInTheDocument();
  expect(screen.getByText("HomeWorld: Tatooine")).toBeInTheDocument();
  expect(screen.getByText("Species: Human")).toBeInTheDocument();
})