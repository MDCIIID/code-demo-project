import React, { Component } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { GameTitle } from './GameTitle';

describe('GameTitle', () => {
    const testTitle:string = "TestTitle";
    //Given
    afterEach(() =>{
        cleanup();
    })
    
    describe('Rendering GameTitle', () => {

        test('Letters of title in separate divs for spacing', () => {
            render(<GameTitle title={testTitle} />)
            const component = screen.getByTestId("gameTitle");
            const divs = screen.getAllByTestId('titleLetter');
            expect(component).toBeInTheDocument();
            expect(divs.length).toEqual(testTitle.length)
            });
        })
  });
