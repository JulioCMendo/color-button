import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color and updates when clicked', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ 'background-color': 'red' });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ 'background-color': 'blue' });

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
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
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).not.toBeEnabled();

  // check that button color is gray
  expect(colorButton).toHaveStyle({ 'background-color': 'gray' });

  // check that button is enabled on second click
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();

  // check that button color is back to red
  expect(colorButton).toHaveStyle({ 'background-color': 'red' });
});

test('Checkbox disables button when it is blue, changes to gray and reverts back to blue', () => {
  render(<App />);
  // get button and click it
  const button = screen.getByRole('button', { name: 'Change to blue' });
  fireEvent.click(button);

  // get checkbox and click it
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  fireEvent.click(checkbox);

  // check that button color went to gray
  expect(button).toHaveStyle({ 'background-color': 'gray' });

  // click checkbox again and expect blue button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ 'background-color': 'blue' });
});
