import { render, screen, fireEvent } from '@testing-library/react';
import { replaceCamelWithSpaces } from './App';
import App from './App';

test('button has correct initial color and updates when clicked', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  });

  // expect the background color to be Medium Violet Red
  expect(colorButton).toHaveStyle({ 'background-color': 'MediumVioletRed' });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ 'background-color': 'MidnightBlue' });

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on first click and enables button on second click', () => {
  render(<App />);

  //get checkbox and click it
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  // check that button is disabled on first click
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  });
  expect(colorButton).not.toBeEnabled();

  // check that button color is gray
  expect(colorButton).toHaveStyle({ 'background-color': 'gray' });

  // check that button is enabled on second click
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();

  // check that button color is back to red
  expect(colorButton).toHaveStyle({ 'background-color': 'MediumVioletRed' });
});

test('Checkbox disables button when it is blue, changes to gray and reverts back to blue', () => {
  render(<App />);
  // get button and click it
  const button = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  });
  fireEvent.click(button);

  // get checkbox and click it
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  fireEvent.click(checkbox);

  // check that button color went to gray
  expect(button).toHaveStyle({ 'background-color': 'gray' });

  // click checkbox again and expect blue button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ 'background-color': 'MidnightBlue' });
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
