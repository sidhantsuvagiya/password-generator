import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  useEffect(() => { generatePassword() }, [length, numbers, characters]);

  // Generate password Function
  const generatePassword = () => {

    let myPassword = '';
    let pwString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const pwNumbers = '0123456789';
    const pwCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (numbers) { pwString += pwNumbers; }
    if (characters) { pwString += pwCharacters; }

    for (let i = 0; i < length; i++) {
      myPassword += pwString.charAt(Math.floor(Math.random() * pwString.length) + 1);
    }
    setPassword(myPassword);
  }

  const pwInput = useRef(null);

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center'>

        <h1 className="pb-5 text-xl text-white text-center font-bold">Password Generator</h1>

        {/* Password input */}
        <div className="flex justify-center items-center">
          <input
            type="text"
            value={password}
            ref={pwInput}
            readOnly
            className="px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button onClick={() => {
            pwInput.current?.select()
            window.navigator.clipboard.writeText(password)
          }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md">
            Copy
          </button>
        </div>

        {/* Password Options */}
        <div className="flex justify-center items-center flex-wrap pt-4">
          <input type="range" defaultValue={length} onChange={(e) => setLength(e.target.value)} id="lengthInput" name="lengthInput" className="m-2" min="8" max="16" step="1" /> <label htmlFor="lengthInput" className="mr-2 text-white">Length: {length}</label>
          <div className="flex items-center">
            <input type="checkbox" checked={numbers} onChange={() => setNumbers((prev) => !prev)} id="numbersCheckbox" name="numbersCheckbox" className="m-2 h-4 w-4" /> <label htmlFor="numbersCheckbox" className="flex items-center text-white">Numbers</label>
            <input type="checkbox" checked={characters} onChange={() => setCharacters((prev) => !prev)} id="charactersCheckbox" name="charactersCheckbox" className="m-2 h-4 w-4" /> <label htmlFor="charactersCheckbox" className="flex items-center text-white">Characters</label>
          </div>
        </div>

      </div>
    </>
  )

}

export default App
