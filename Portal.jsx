import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { useEffect } from "react"
import { DoubleSide, WebGLRenderTarget, EquirectangularReflectionMapping, Scene, TextureLoader, AlwaysStencilFunc, ReplaceStencilOp } from "three"
import { FillQuad } from "./FillQuad"

const scene = new Scene()
scene.background = new TextureLoader().load(
    "/textures/galaxy.jpg",
    (texture) => {
        texture.mapping = EquirectangularReflectionMapping;
    }
)

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
    target.setSize(window.innerWidth, window.innerHeight);
})

export function Portal() {
    const model = useLoader(GLTFLoader, '/models/portal.glb')
    const mask = useLoader(GLTFLoader, '/models/portal_mask.glb')

    useFrame((state) => {
        state.gl.setRenderTarget(target);
        state.gl.render(scene, state.camera);
        state.gl.setRenderTarget(null);
    })

    useEffect(() => {
        if (!model) return;

        let mesh = model.scene.children[0];
        mesh.material.envMapIntensity = 3.5;

        let maskMesh = mask.scene.children[0];
        maskMesh.material.side = DoubleSide;

        // The mask must NOT be transparent — transparent objects render
        // AFTER opaque ones, but the FillQuad (opaque) needs the stencil
        // values to already be written when it renders.
        maskMesh.material.transparent = false;

        // Hide the mask visually — it should only write to the stencil buffer
        maskMesh.material.colorWrite = false;
        maskMesh.material.depthWrite = false;

        // Stencil config: write ref=1 wherever the mask is visible
        maskMesh.material.stencilWrite = true;
        maskMesh.material.stencilRef = 1;
        maskMesh.material.stencilFunc = AlwaysStencilFunc;
        maskMesh.material.stencilZPass = ReplaceStencilOp;

        // Render mask before the FillQuad so stencil is ready
        maskMesh.renderOrder = 1;
    }, [model, mask])

    return (
        <group>
            <primitive object={model.scene} />
            <primitive object={mask.scene} />
            <FillQuad map={target.texture} maskId={1} />
        </group>
    )
}