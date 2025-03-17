// src/components/Globe.js
import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

const Globe: React.FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 2 }}
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Sphere args={[3, 32, 32]}>
					<meshStandardMaterial color="lightblue" />
				</Sphere>
				<OrbitControls />
			</Canvas>
		</motion.div>
	);
};

export default Globe;
