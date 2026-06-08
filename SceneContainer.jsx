import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import { FloatingIsland } from "./FloatingIsland";
import { Portal } from "./Portal";
import { FloatingRocks } from "./FloatingRocks";
import { Rocks } from "./Rocks";
import { Trees } from "./Trees";
import { Word } from "./Word";
import { Grass } from "./Grass";

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
                <FloatingIsland />
                <Portal />
                <Rocks />
                <Trees />
                <Word />
                <Grass />
            </Float>

            <FloatingRocks />

        </Suspense>
    )
}