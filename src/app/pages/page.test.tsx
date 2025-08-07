import React from 'react';
import {render, screen} from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from '../page';

//Mock FilmList.tsx
jest.mock("@/components/filmList/FilmList",(() => { 
  const MockFilmeList = () => <div>Mocked FilmList</div>
  return MockFilmeList;}))
  

test('renders page and element', () => {
  render(<Home />);
  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent("SWAPI - Star Wars API Fetch Characters - GraphQl");
  expect(screen.getByText("Mocked FilmList")).toBeInTheDocument();
});
