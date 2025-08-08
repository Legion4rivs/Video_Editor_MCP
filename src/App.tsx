import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Cube } from './components/Cube'
import { ControlsPanel } from './components/ControlsPanel'
import { HUD } from './components/HUD'
import { MoveLog } from './components/MoveLog'
import './App.css'

function App() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Cube />
        <OrbitControls />
      </Canvas>
      <ControlsPanel />
      <HUD />
      <MoveLog />
    </>
  )
}

export default App
