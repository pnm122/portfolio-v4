<script lang="ts">
	import SplitText from '$components/SplitText.svelte'
	import { finishedPreloading } from '$utils/preloader'
	import gsap from 'gsap'
	import ScrollTrigger from 'gsap/dist/ScrollTrigger'
	import { untrack } from 'svelte'
	import { Canvas, Circle, Rectangle } from 'svelte-physics-renderer'

	interface Props {
		projectsLoaded: Promise<void>
		onLoad: () => void
	}

	const { projectsLoaded, onLoad }: Props = $props()

	const format = new Intl.DateTimeFormat([], {
		timeZone: 'America/New_York',
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})

	let canvas = $state<Canvas | undefined>()
	let time = $state(new Date())
	let animationCompleted = $state(false)

	$effect(() => {
		const ctx = gsap.context(async () => {
			await document.fonts.ready
			// Wait for projects section to load first since it pins a section and causes the whole page to offset
			await projectsLoaded

			const contact = document.querySelector<HTMLElement>('.contact')
			const letsTalk = document.querySelector<HTMLElement>('.lets-talk')
			const initialLetsTalkScale =
				contact && letsTalk ? contact.offsetWidth / letsTalk.offsetWidth : 1.5

			gsap.set(letsTalk, {
				transformOrigin: 'bottom left'
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: '.contact',
					start: 'bottom-=400px bottom',
					end: 'bottom bottom',
					scrub: true
				},
				onStart: () => {
					untrack(async () => {
						if (animationCompleted) animationCompleted = false
            // Must wait until preloader is completed to make sure canvas positions
	          // are calculated correctly
						await finishedPreloading
						canvas?.context.stop()
					})
				},
				onUpdate: () => {
					untrack(() => {
						if (animationCompleted) animationCompleted = false
					})
				},
				onComplete: () => {
					untrack(async () => {
						if (!animationCompleted) animationCompleted = true
            // Must wait until preloader is completed to make sure canvas positions
	          // are calculated correctly
						await finishedPreloading
						canvas?.context.start()
					})
				}
			})

			tl.from(
				letsTalk,
				{
					y: '-400px',
					ease: 'none',
					duration: 1
				},
				0
			)

			tl.from(
				letsTalk,
				{
					scale: initialLetsTalkScale,
					ease: 'none',
					duration: 0.5
				},
				0.5
			)

			gsap.from('.contact-link, .contact__image', {
				opacity: 0,
				scrollTrigger: {
					trigger: '.contact',
					start: 'bottom-=100px bottom',
					end: 'bottom bottom',
					scrub: true
				}
			})

			// Should be called after a refresh in theory but it doesn't seem to get called?
			// This should be fine anyways?
			onLoad()
		})

		function onResize() {
			untrack(async () => {
				await finishedPreloading
				if (canvas?.context.state === 'running') {
					if (animationCompleted) {
						canvas.context.stop()
						canvas.context.start()
					} else {
						canvas.context.stop()
					}
				}
			})
		}

		window.addEventListener('resize', onResize)

		const interval = setInterval(() => {
			time = new Date(time.getTime() + 1000)
		}, 1000)

		return () => {
			ScrollTrigger.removeEventListener('refresh', onLoad)
			window.removeEventListener('resize', onResize)
			untrack(() => {
				canvas?.context.stop()
			})
			clearInterval(interval)
			ctx.revert()
		}
	})

	function onLetsTalkClicked() {
		gsap.to(window, {
			scrollTo: {
				y: 'max'
			},
			ease: 'expo.out',
			duration: 1
		})
	}
</script>

<div class="contact">
	<Canvas
		bind:this={canvas}
		width="100%"
		height="100%"
		gravity={{ scale: 0.00067 }}
		bounded={false}
	>
		<div class="contact__canvas">
			<div class="contact__body">
				<Rectangle isStatic>
					<h1 class="lets-talk">
						<button
							class="lets-talk__button"
							disabled={animationCompleted}
							onclick={onLetsTalkClicked}
						>
							<SplitText text="let's talk!" />
						</button>
					</h1>
				</Rectangle>
				<p class="time">
					{#each format.format(time).split(',') as timeSection}
						<Rectangle class="time__inner" isStatic>
							<span>{timeSection}</span>
						</Rectangle>
					{/each}
				</p>
			</div>
			<div class="drop-in-items">
				<Circle class="contact-link contact-link--email" radius={16} restitution={0.75} size={160}>
					<a
						aria-disabled={canvas?.context.state !== 'running'}
						class="contact-link__inner"
						href="mailto:pnmartin02@gmail.com"
					>
						Email
					</a>
				</Circle>
				<Circle class="contact-link contact-link--github" radius={16} restitution={0.75} size={160}>
					<a
						aria-disabled={canvas?.context.state !== 'running'}
						class="contact-link__inner"
						href="https://github.com/pnm122"
						target="_blank"
						rel="noopener noreferrer"
					>
						Github
					</a>
				</Circle>
				<Circle
					class="contact-link contact-link--linkedin"
					radius={16}
					restitution={0.75}
					size={160}
				>
					<a
						aria-disabled={canvas?.context.state !== 'running'}
						class="contact-link__inner"
						href="https://www.linkedin.com/in/pierce-martin-02/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Linkedin
					</a>
				</Circle>
				<Rectangle class="contact__image" restitution={0.75} radius={16}>
					<img alt="Pierce Martin" src="images/homepage/pierce.jfif" />
				</Rectangle>
			</div>
			<Rectangle class="wall wall--left" isStatic />
			<Rectangle class="wall wall--right" isStatic />
			<Rectangle class="wall wall--bottom" isStatic />
		</div>
	</Canvas>
</div>
<div id="contact"></div>

<style lang="scss">
	@import '$scss/mixins';
	@import '$scss/variables';

	.contact {
		@include container;
		height: 850px;
		position: relative;
		margin-top: 350px;
		// A little margin to make sure that the animation end triggers
		margin-bottom: 4px;

		&__canvas {
			display: flex;
			flex-direction: column-reverse;
			height: 100%;
		}

		&__body {
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
		}

		:global(.contact__image) {
			width: 200px;
			height: 200px;
			overflow: hidden;

			:global(img) {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}

		:global(.lets-talk) {
			font-size: $font-size-40;
			line-height: 0.825;
			margin-bottom: -0.11em;
			white-space: nowrap;

			:global(.lets-talk__button) {
				color: $black;
			}

			:global(.lets-talk__button:disabled) {
				cursor: default;
			}

			@media screen and (min-width: $screen-sm) {
				font-size: $font-size-60;
			}

			@media screen and (min-width: $screen-md) {
				font-size: $font-size-96;
			}

			@media screen and (min-width: $screen-lg) {
				font-size: $font-size-128;
			}
		}

		.drop-in-items {
			@include v-gap(320px);
			padding-bottom: 1500px;
			padding-left: 15%;

			@media screen and (min-width: $screen-sm) {
				padding-left: 41%;
			}
		}

		.time {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			text-align: right;
			font-size: $font-size-6;

			@media screen and (min-width: $screen-sm) {
				font-size: $font-size-8;
			}
		}

		:global(.time__inner) {
			width: fit-content;
			white-space: nowrap;
		}

		:global(.contact-link) {
			text-transform: lowercase;
			font-family: $font-heading;
			font-size: $font-size-24;
			color: $heading;

			:global(.contact-link__inner) {
				width: 100%;
				height: 100%;
				border-radius: 999px;
				@include centered;
			}
		}

		:global(.contact-link__inner:focus-visible),
		:global(.contact-link__inner:hover) {
			text-decoration: underline;
			outline: none;
		}

		:global(.contact-link--email) {
			background-color: $primary;
		}

		:global(.contact-link--github) {
			background-color: $accent;
		}

		:global(.contact-link--linkedin) {
			background-color: $tertiary;
		}

		:global(.wall) {
			position: absolute;
		}

		:global(.wall--left),
		:global(.wall--right) {
			top: 0;
			bottom: 0;
			width: 200px;
		}
		:global(.wall--bottom) {
			left: 0;
			right: 0;
			height: 200px;
			top: 100%;
		}

		:global(.wall--left) {
			right: 100%;
		}

		:global(.wall--right) {
			left: 100%;
		}
	}
</style>
