import { useState } from "react"
import './Conecta4Config.css'

export const Conecta4Config = ({ setInGame, config, setConfig }) => {
    const [validJSon, setValidJson] = useState(true)
    const [text, setText] = useState(() => JSON.stringify(config, null, 2))


    const handleStartGame = () => {
        if(!validJSon) {
            return
        }
        
        const parsed = JSON.parse(text)
        setConfig(parsed)
        setInGame(true) 
    }

    const onTextChange = (e) => {
        const value = e.target.value
        setText(value)
        try {
            JSON.parse(value)
            setValidJson(true)
        } catch {
            setValidJson(false)
        }
    }

    return (
        <main>
            <button onClick={handleStartGame} disabled={!validJSon}>
                Start Game
            </button>

            <div className={validJSon ? 'valid' : 'invalid'}>
                {validJSon ? 'Configuration is valid' : 'Invalid JSON configuration'}
            </div>

            <textarea
                placeholder="Config"
                value={text}
                onChange={onTextChange}
            />
        </main>
    )
}