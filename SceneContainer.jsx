import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import { FloatingIsland } from "./FloatingIsland";
import { Portal } from "./Portal";
import { FloatingRocks } from "./FloatingRocks";
import { Rocks } from "./Rocks";
import { Trees } from "./Trees";
import { Word } from "./Word";
import { Grass } from "./Grass";
import { BrightnessContrast, ChromaticAberration, DepthOfField, EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { Color, CylinderGeometry, Mesh, MeshStandardMaterial } from "three";

let lightColor = new Color(1, 0.2, 0.1)
let mesh = new Mesh(
    new CylinderGeometry(0.3, 0.3, 0.2, 20),
    new MeshStandardMaterial({
        color: lightColor,
        transparent: true,
        opacity: 1,
    })
)

export function SceneContainer() {
    return (
        <Suspense fallback={null}>
            <Environment background={"only"} files={'/textures/bg.hdr'} />
            <Environment background={false} files={'/textures/envmap.hdr'} />

            <PerspectiveCamera makeDefault fov={50} position={[-1.75, 10.85, 20.35]} />
            <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />

            <Float
                speed={0.5}
                rotationIntensity={0.6}
                floatIntensity={0.6}
            >
                <primitive object={mesh}/>
                <spotLight
                    penumbra={1}
                    distance={500}
                    angle={60.65}
                    attenuation={1}
                    anglePower={3}
                    intensity={0.3}
                    color={lightColor}
                    position={[1.19, 10.85, -4.45]}
                    target-position={[0, 0, -1]}
                />

                <FloatingIsland />
                <Portal />
                <Rocks />
                <Trees />
                <Word />
                <Grass />
            </Float>

            <FloatingRocks />

            <EffectComposer stencilBuffer={true}>
                <DepthOfField
                    focusDistance={0.012}
                    focalLength={0.015}
                />
                <HueSaturation hue={0} saturation={-0.15} />
                <BrightnessContrast brightness={0.0} contrast={0.035} />
                <ChromaticAberration radialModulation={true} offset={[0.00175, 0.00175]} />
            </EffectComposer>
        </Suspense>
    )
}