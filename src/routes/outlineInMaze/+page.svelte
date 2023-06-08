<script lang="ts">
	import {
		Studio,
		Editable,
		Theatre,
		Sheet,
		Project
	} from '@threlte/theatre';
	import { T, Canvas } from '@threlte/core';
	import {
		OrbitControls,
		Grid,
		ContactShadows
	} from '@threlte/extras';
	import RendererWithOutlines from '../outline/RendererWithOutlines.svelte';
	import Maze from './Maze.svelte';
	import MyMaze from './MyMaze.svelte';
	import { dev } from '$app/environment';
	import theatreState from './state.json';

	// const route = [
	// 	[0, 1, -3],
	// 	[0, 1, 1],
	// 	[-3, 1, 1],
	// 	[-3, 1, 4],
	// 	[-2, 1, 4],
	// 	[-2, 1, 5],
	// 	[-5, 1, 5],
	// 	[-5, 1, -3]
	// ];

	let outlinedCube;
</script>

<svelte:head>
	<title>Outline In Maze</title>
</svelte:head>

<Studio enabled={dev} />

<div class="canvas">
	<Canvas>
		<Theatre>
			<!-- cube (TODO change to walking human) -->
			<T.Mesh position.z={-3} position.y={1} bind:ref={outlinedCube}>
				<Project name="Project A" config={{ state: theatreState }}>
					<Sheet
						name="Sheet A"
						autoPlay={{ iterationCount: Infinity }}
					>
						<!-- <Editable name="Editable A" /> -->
						<Editable name="Box / Mesh" transform controls />
					</Sheet>
				</Project>
				<T.MeshToonMaterial color="gold" />
				<T.BoxGeometry />
			</T.Mesh>

			<Maze />
			<MyMaze />

			<T.PerspectiveCamera
				makeDefault
				position={[0, 6, -10]}
				fov={15}
				zoom={0.2}
			>
				<OrbitControls enableZoom={true} enableDamping target.y={0} />
			</T.PerspectiveCamera>

			<T.DirectionalLight
				intensity={0.8}
				position.x={5}
				position.y={10}
			/>
			<T.AmbientLight intensity={0.2} />

			<Grid
				position.y={-0.001}
				cellColor="#ffffff"
				sectionColor="#ffffff"
				sectionThickness={0}
				fadeDistance={75}
				cellSize={2}
			/>

			<ContactShadows scale={12} blur={2} far={5} opacity={0.5} />

			<!-- custom renderer, has to sit inside Canvas -->
			<RendererWithOutlines selectedMesh={outlinedCube} />
		</Theatre>
	</Canvas>
</div>

<style>
	.canvas {
		background-color: rgb(50 52 60);
		width: 100%;
		height: 100%;
	}
</style>
