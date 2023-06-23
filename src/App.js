import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [inputText, setInputText] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInputValid, setIsInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const requestData = async () => {
        const url = 'https://api.deepai.org/api/text2img';
        const apiKey = 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K';

        const formData = new FormData();
        formData.append('text', inputText);

        const headers = {
            'api-key': apiKey,
            'Content-Type': 'multipart/form-data',
        };

        try {
            setIsLoading(true);
            const response = await axios.post(url, formData, { headers, timeout: 20000 });
            const imageData = response.data;
            setImageURL(imageData.output_url);
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to generate image. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOnClick = async () => {
        if (inputText) {
            setIsInputValid(true);
            await requestData();
        } else {
            setIsInputValid(false);
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div className="container">
            <header>
                <h1 className="title">Imagify</h1>
                <p className="subtitle">"Unleash the power of AI to transform text into stunning images!"</p>
            </header>
            <main>
                <section className="feature">
                    <h2 className="feature-title">Text to Image</h2>
                    <p className="feature-description">Write a text to generate an image</p>
                    <div className="input-container">
                        <input
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            className={!isInputValid ? 'invalid' : ''}
                            placeholder="Enter text"
                        />
                        {!isInputValid && <p className="validation-error">Please enter text</p>}
                        <button onClick={handleOnClick} disabled={isLoading}>
                            {isLoading ? 'Generating...' : 'Generate Image'}
                        </button>
                    </div>
                </section>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {isLoading ? (
                    <div className="spinner">
                        <div className="loader"></div>
                    </div>
                ) : (
                    imageURL && (
                        <section className="generated-image">
                            <h2>Generated Image:</h2>
                            <img src={imageURL} alt="Generated" />
                        </section>
                    )
                )}
            </main>
            <footer>
                <p className="footer-text">Imageaify &copy; 2023. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
