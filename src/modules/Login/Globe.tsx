"use client";
import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Trail, Float, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { motion } from "framer-motion-3d";

export default function App() {
	return (
		<Canvas camera={{ position: [0, 0, 10] }}>
			<color attach="background" args={["black"]} />
			<Float speed={4} rotationIntensity={1} floatIntensity={2}>
				<Atom />
			</Float>
			{/* <Stars saturation={0} count={400} speed={0.5} /> */}
			{/* <motion.g whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }}> */}
			<Stars saturation={0} count={400} speed={0.5} />
			{/* </motion.g> */}
			<EffectComposer>
				<Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
			</EffectComposer>
		</Canvas>
	);
}

function Atom(props) {
	return (
		<group {...props}>
			<Electron position={[0, 0, 0.5]} speed={6} />
			<Electron
				position={[0, 0, 0.5]}
				rotation={[0, 0, Math.PI / 3]}
				speed={6.5}
			/>
			<Electron
				position={[0, 0, 0.5]}
				rotation={[0, 0, -Math.PI / 3]}
				speed={7}
			/>
			<Sphere args={[0.35, 64, 64]}>
				<meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
			</Sphere>
		</group>
	);
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
	const ref = useRef<any>();
	useFrame((state) => {
		const t = state.clock.getElapsedTime() * speed;
		ref.current!.position.set(
			Math.sin(t) * radius,
			(Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
			0
		);
	});
	return (
		<group {...props}>
			<Trail
				local
				width={5}
				length={10}
				color={new THREE.Color(2, 1, 10)}
				attenuation={(t) => t * t}
			>
				<mesh ref={ref}>
					<sphereGeometry args={[0.25]} />
					<meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
				</mesh>
			</Trail>
		</group>
	);
}
