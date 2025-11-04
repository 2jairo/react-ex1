import { useState } from "react"
import './Conecta4Config.css'

export const Conecta4Config = ({ setInGame, config, setConfig }) => {
    const [validJSon, setValidJson] = useState(true)
    const [text, setText] = useState(JSON.stringify(config, null, 4))


    const handleStartGame = () => {
        if(!validJSon) {
            return
        }
        
        const parsed = JSON.parse(text)
        setConfig(parsed)
        setInGame(true) 
    }

    const onTextChange = (value) => {
        setText(value)
        
        try {
            JSON.parse(value)
            setValidJson(true)
        } catch {
            setValidJson(false)
        }
    }

    const handleFormatText = () => {
        if(!validJSon) {
            return
        }

        const parsed = JSON.parse(text)
        setText(JSON.stringify(parsed, null, 4))
    }

    const handleResetConf = () => {
        onTextChange(JSON.stringify(config, null, 4))
    }

    return (
        <main>
            <button onClick={handleStartGame} disabled={!validJSon}>
                Start Game
            </button>

            <div className={validJSon ? 'valid' : 'invalid'}>
                {validJSon ? 'Configuration is valid' : 'Invalid JSON configuration'}
            </div>

            <button onClick={handleResetConf}>
                Reset Configuration
            </button>

            <textarea
                placeholder="Config"
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
            />

            <button onClick={handleFormatText} disabled={!validJSon}>
                Format JSON
            </button>
        </main>
    )
}