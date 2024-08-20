<script lang="ts">
	import { Canvas, Circle, Rectangle } from 'svelte-physics-renderer';

	const skills = [
		'JavaScript',
		'TypeScript',
		'HTML',
		'CSS',
		'React',
		'Svelte',
		'Stencil',
		'Flutter',
		'SCSS',
		'Tailwind',
		'Node',
		'Express',
		'Flask',
		'MongoDB',
		'Firebase',
		'Git',
		'GitLab CI',
		'Web Components',
		'Figma',
		'Adobe XD',
		'GSAP',
		'Matter.js',
		'OpenGL'
	];

	let canvas = $state<Canvas>();
	let renderedSkills = $state<string[]>([]);

	$effect(() => {
		// May not be necessary, but hopefully combats layout shift causing size calculations to be wrong
		// Will probably be fixed by a later version of svelte-physics-renderer anyways
		setTimeout(() => {
			canvas?.context.start();
		}, 100);
		let interval: number;

		function maybeAddRenderedSkill() {
			if (renderedSkills.length === skills.length) return clearInterval(interval);

			renderedSkills.push(skills[renderedSkills.length]);
		}

		interval = setInterval(maybeAddRenderedSkill, 100);

		function reset() {
			canvas?.context.stop();
			canvas?.context.start();
		}

		window.addEventListener('resize', reset);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', reset);
		};
	});

	$effect(() => {
		return () => {
			canvas?.context.stop();
		};
	});
</script>

<div class="main">
	<Canvas width="100%" height="100%" gravity={{ y: 1.5 }} interactive bind:this={canvas}>
		<div class="main__content">
			<!-- <h1>Pierce Martin</h1>
      <p>I am a software developer and designer passionate about human-centered, intuitive design and modern web development.</p> -->
			<Rectangle class="content__heading" isStatic>
				<h1>Pierce Martin</h1>
			</Rectangle>
			<Rectangle class="content__paragraph" isStatic>
				<p>
					I am a software developer and designer passionate about human-centered, intuitive design
					and modern web development.
				</p>
			</Rectangle>
		</div>
		{#each renderedSkills as skill}
			<Circle
				size={80}
				class="skill-circle"
				style="left: {Math.random() * (window.innerWidth - 96)}px;"
				restitution={0.5}
			>
				<div class="skill-circle__inner">
					{skill}
				</div>
			</Circle>
		{/each}
	</Canvas>
</div>

<style lang="scss">
	@import '$scss/variables';
	@import '$scss/mixins';

	.main {
		width: 100%;
		height: 100vh;
		max-height: -webkit-fill-available;

		> :global(*) {
			@include centered;
		}
	}

	.main__content {
		text-align: center;
		align-items: center;
		@include v-gap(0);

		:global(.content__heading h1) {
			font-size: $font-size-60;
			line-height: $line-height-6;
			max-width: 600px;
			width: fit-content;
			white-space: nowrap;
		}

		:global(.content__paragraph p) {
			font-size: $font-size-12;
			line-height: $line-height-6;
			max-width: 600px;
		}
	}

	:global(.skill-circle) {
		pointer-events: none;
		position: absolute;
		top: 0;
	}

	:global(.skill-circle__inner) {
		color: $primary-75;
		font-size: $font-size-6;
		font-weight: 500;
		text-align: center;
		width: 100%;
		height: 100%;
		border-radius: 999px;
		animation: appear $transition-duration-4;
		background-color: $primary-10;
		@include centered;
	}

	@keyframes appear {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
</style>
