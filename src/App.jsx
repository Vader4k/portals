import { Canvas } from "@react-three/fiber"
import { SceneContainer } from "../SceneContainer"

const App = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas >
        <SceneContainer />
      </Canvas>
    </div>
  )
}

export default App