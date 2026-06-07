import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { useEffect } from "react"
import { DoubleSide } from "three"

export function Portal() {
    const model = useLoader(GLTFLoader, '/models/portal.glb')
    const mask = useLoader(GLTFLoader, '/models/portal_mask.glb')

    useEffect(() => {
        if (!model) return;

        let mesh = model.scene.children[0];
        mesh.material.envMapIntensity = 3.5;

        let meshMask = mask.scene.children[0];
        meshMask.material.side = DoubleSide;
    }, [model, mask])

    return (
        <group>
            <primitive object={model.scene} />
            <primitive object={mask.scene} />
        </group>
    )
}