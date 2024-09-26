import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/'contact form'/i)
    expect(header).toBeInTheDocument
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const fNameInput = screen.queryByLabelText(/first name*/i)
    userEvent.type(fNameInput, 'Abc')
    const error = screen.queryByText('must have at least 5 characters')
    expect(error).toBeInTheDocument
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submitBtn = screen.getByRole('button')
    userEvent.click(submitBtn);
    const errorArr = screen.queryAllByText(/error/i)
    expect(errorArr.length).toBe(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const fNameInput = screen.getByLabelText(/first name/i)
    const lNameInput = screen.getByLabelText(/last name/i)
    const submitBtn = screen.getByRole('button')
    userEvent.type(fNameInput, 'RomyK')
    userEvent.type(lNameInput, 'Shockey')
    userEvent.click(submitBtn)
    const error = screen.queryByText(/error/i)
    expect(error).toBeInTheDocument
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'blarp')
    const emailError = screen.queryByText(/email must be a valid email address/i)
    expect(emailError).toBeInTheDocument
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const submitBtn = screen.getByRole('button')
    userEvent.click(submitBtn)
    const error = screen.queryByText(/lastname is a required field/i)
    expect(error).toBeInTheDocument
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    function input (text, label) {
        const labelInput = screen.getByLabelText(label)
        userEvent.type(labelInput, text)
        return text
    }
    function output (text) {
        const value = screen.queryByText(text)
        expect(value).toBeInTheDocument
    }
    const fName = input('RomyK', /first name/i)
    const lName = input('Shockey', /last name/i)
    const email = input('rks@e.mail', /email/i)
    const submitBtn = screen.getByRole('button')
    userEvent.click(submitBtn)
    output(fName)
    output(lName)
    output(email)
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    function input (text, label) {
        const labelInput = screen.getByLabelText(label)
        userEvent.type(labelInput, text)
        return text
    }
    function output (text) {
        const value = screen.queryByText(text)
        expect(value).toBeInTheDocument
    }
    const fName = input('RomyK', /first name/i)
    const lName = input('Shockey', /last name/i)
    const email = input('rks@e.mail', /email/i)
    const message = input('Hello there', /message/i)
    const submitBtn = screen.getByRole('button')
    userEvent.click(submitBtn)
    output(fName)
    output(lName)
    output(email)
    const nMessage = screen.queryAllByText(message)
    expect(nMessage).toBeInTheDocument
});