import { useState } from "react"
import { Conecta4 } from "./components/Conecta4/Conecta4"
import { Conecta4Config } from "./components/Conecta4Config/Conecta4Config"

function App() {
  const [inGame, setInGame] = useState(false)
  const [config, setConfig] = useState({
    players: [
      { name: 'A', background: '#ff6b6b' },
      { name: 'B', background: '#4d9cff' },
    ],
    gridWidth: 6,
    gridHeight: 5,
    conecta: 4,
  })

  return (
    <>
      {inGame
        ? <Conecta4 players={config.players} gridW={config.gridWidth} gridH={config.gridHeight} conecta={config.conecta} setInGame={setInGame} />
        : <Conecta4Config config={config} setConfig={setConfig} setInGame={setInGame}/>
      }
    </>
  )

}

export default App
