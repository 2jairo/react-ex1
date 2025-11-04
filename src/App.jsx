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
    gridWidth: 7,
    gridHeight: 6,
    conecta: 4,
  })


  const setConfigWrapper = (conf) => {
    const players = Array.isArray(conf.players)
      ? conf.players.filter((p) => p.name && p.background)
      : config.players

    setConfig(prev => ({
      players,
      gridWidth: parseInt(conf.gridWidth) || prev.gridWidth,
      gridHeight: parseInt(conf.gridHeight) || prev.gridHeight,
      conecta: parseInt(conf.conecta) || prev.conecta,
    }))

  }

  return (
    <>
      {inGame
        ? <Conecta4 players={config.players} gridW={config.gridWidth} gridH={config.gridHeight} conecta={config.conecta} setInGame={setInGame} />
        : <Conecta4Config config={config} setConfig={setConfigWrapper} setInGame={setInGame} />
      }
    </>
  )

}

export default App
