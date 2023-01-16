import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import './QuickQuote.css';

export const QuickQuote = (props:any) => {
	const [text, setText] = useState('loading...');
	const [author, setAuthor] = useState('');
	const [increment, setIncrement] = useState(0);

	useEffect(() => {
		async function fetchText() {
			const response = await fetch(
				`https://type.fit/api/quotes`
			).then(response => response.json())
            .then(data => {
                const selectedQuote:number = Math.floor(Math.random()*data.length);
                setText(data[selectedQuote].text);
				setAuthor(data[selectedQuote].author)
            });
		}
		fetchText();
	}, [increment]);

	return (
		<div className="quote-body">
		<div className="quote-text">❝{text}❞<span className="author-text"> -{author}</span></div>
		</div>
	)
};

export default QuickQuote;
