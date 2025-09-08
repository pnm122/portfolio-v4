<script lang="ts">
	import { browser } from '$app/environment'
	import Button from '$components/Button.svelte'
	import Contact from '$components/homepage/Contact.svelte'
	import Projects from '$components/homepage/Projects.svelte'
	import SplitText from '$components/SplitText.svelte'
	import slowRollInAnimation from '$utils/animation/slowRollInAnimation'
	import isTouchDevice from '$utils/isTouchDevice'
	import { finishedPreloading, setPreloadingState } from '$utils/preloader'
	import scrollToLink from '$utils/scrollToLink'
	import { markSiteLoaded, isSiteLoaded } from '$utils/siteLoaded'
	import { skills } from '$utils/skills'
	import gsap from 'gsap'
	import { untrack } from 'svelte'
	import { Canvas, Rectangle, Circle } from 'svelte-physics-renderer'

	let skillsCanvas: Canvas | undefined = $state()
	let screenWidth = $state(browser ? window.innerWidth : 0)
	let loadPercent = $state(0)

	function createScrollBasedAnimations(tl: gsap.core.Timeline) {
		if (!isSiteLoaded()) {
			gsap.fromTo(
				'.about-heading__text .letter',
				...slowRollInAnimation({
					visibility: 'visible',
					scrollTrigger: {
						trigger: '.about-heading__text',
						start: 'top bottom'
					}
				})
			)

			gsap.fromTo(
				'.about__content .word',
				...slowRollInAnimation({
					visibility: 'visible',
					scrollTrigger: {
						trigger: '.about__content',
						start: 'top bottom'
					}
				})
			)
		}

		const pictureAnimationData = {
			'#spellingbee': {
				parallax: 50,
				rotate: 8,
				rotateRange: -18
			},
			'#typing-race': {
				parallax: 100,
				rotate: 30,
				rotateRange: 20
			},
			'#datepicker': {
				parallax: 125,
				rotate: -30,
				rotateRange: 10
			}
		}

		Object.keys(pictureAnimationData).forEach((el) => {
			if (!isSiteLoaded()) {
				gsap.fromTo(
					el,
					{
						opacity: 0
					},
					{
						opacity: 1,
						duration: 1,
						ease: 'expo.inOut',
						visibility: 'visible',
						scrollTrigger: {
							trigger: el
						}
					}
				)
			}

			const { parallax, rotate, rotateRange } = pictureAnimationData[el as '#spellingbee']
			tl.fromTo(
				el,
				{
					rotate: rotate - rotateRange / 2,
					y: parallax
				},
				{
					rotate: rotate + rotateRange / 2,
					y: -1 * parallax,
					scrollTrigger: {
						trigger: el,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1
					}
				}
			)
		})
	}

	function animatePreloader(tl: gsap.core.Timeline) {
		if (isSiteLoaded()) return

		setPreloadingState('active')
		document.body.setAttribute('data-loading', 'true')

		const loadPercentProxy = { value: 0 }
		tl.to(loadPercentProxy, {
			value: 100,
			ease: 'power4.out',
			duration: 1,
			onUpdate: () => {
				untrack(() => {
					loadPercent = Math.round(loadPercentProxy.value)
				})
			}
		})

		tl.to(
			'.preloader__background',
			{
				y: '-100%',
				duration: 0.75,
				ease: 'power4.inOut',
				stagger: 0.05
			},
			'0.5'
		)

		tl.set('.preloader', {
			display: 'none'
		})

		tl.fromTo(
			'.homepage, .navigation-container',
			{
				y: '100vh'
			},
			{
				y: 0,
				duration: 0.75,
				ease: 'power4.inOut'
			},
			'>-0.75'
		)

		tl.fromTo(
			'.homepage, .navigation-container',
			{
				borderRadius: 32,
				scale: 0.8,
				transformOrigin: 'center 50vh'
			},
			{
				borderRadius: 0,
				scale: 1,
				duration: 0.5,
				ease: 'power4.inOut'
			}
		)

		tl.set('body', {
			overflow: 'auto'
		})
	}

	function hideAnimatingElements() {
		if (isSiteLoaded()) return
		gsap.set(
			`
      .about-heading__text .letter,
      .about__content .word,
      #spellingbee,
      #typing-race,
      #datepicker
    `,
			{
				visibility: 'hidden'
			}
		)
	}

	let projectsLoadResolve = () => {}
	const projectsLoad = new Promise<void>((res) => (projectsLoadResolve = res))
	let contactLoadResolve = () => {}
	const contactLoad = new Promise<void>((res) => (contactLoadResolve = res))

	$effect(() => {
		// Preloader won't be shown if homepage was already visited
		if (isSiteLoaded()) setPreloadingState('finished')

		const ctx = gsap.context(() => {
			const preloaderTimeline = gsap.timeline()
			const scrollTimeline = gsap.timeline()

			untrack(async () => {
				await Promise.all([projectsLoad, contactLoad])
				hideAnimatingElements()
				animatePreloader(preloaderTimeline)

				preloaderTimeline.eventCallback('onComplete', () => {
					setPreloadingState('finished')
				})

				await finishedPreloading

				document.body.setAttribute('data-loading', 'false')
				// Manually reset transform to stop homepage and nav from creating a stacking context
				// Otherwise, the projects section gets positioned incorrectly and goes offscreen when pinned
				// and inner navigation positioning is incorrect
				document.querySelector<HTMLElement>('.homepage')!.style.transform = ''
				document.querySelector<HTMLElement>('.navigation-container')!.style.transform = ''
				createScrollBasedAnimations(scrollTimeline)
				markSiteLoaded()
			})
		})

		function onResize() {
			screenWidth = window.innerWidth
			if (skillsCanvas?.context.state === 'running') {
				skillsCanvas.context.stop()
				skillsCanvas.context.start()
			}
		}

		window.addEventListener('resize', onResize)

		const observer = new IntersectionObserver(async (e) => {
			// Wait for preloader to be complete to (1) make sure circles dropping in is shown and
			// (2) make sure the positions aren't calculated before the animation is finished
			await finishedPreloading
			if (e[0].isIntersecting) {
				skillsCanvas?.context.start()
			} else {
				skillsCanvas?.context.stop()
			}
		})

		observer.observe(document.querySelector('.skills')!)

		return () => {
			observer.disconnect()
			ctx.revert()
			window.removeEventListener('resize', onResize)
			skillsCanvas?.context.stop()
		}
	})

	function getRandomAlignment() {
		return ['flex-start', 'center', 'flex-end'][Math.round(Math.random() * 2)]
	}

	function onProjectsLoad() {
		projectsLoadResolve()
	}

	function onContactLoad() {
		contactLoadResolve()
	}
</script>

<svelte:head>
	<title>Pierce Martin | Web Developer and Designer</title>
</svelte:head>

<div class="preloader">
	<div class="preloader__background">
		<div class="preloader-text">
			<h1>{loadPercent}%</h1>
		</div>
	</div>
	<div class="preloader__background"></div>
	<div class="preloader__background"></div>
	<div class="preloader__background"></div>
</div>
<main class="homepage">
	<section class="hero" id="hero">
		<div class="hero__inner">
			<h1 class="hero__heading">Pierce Martin</h1>
			<p class="hero__description">
				I am a software developer and designer passionate about <i>human-centered</i>,
				<b>intuitive</b>
				design and <u>modern</u> web development.
			</p>
			<Button
				size="large"
				type="link"
				class="hero__cta"
				onClick={(e) => scrollToLink(e, '#contact')}
			>
				Contact Me
			</Button>
		</div>
	</section>
	<section class="about" id="about">
		<div class="about__heading-wrapper">
			<div class="about-heading">
				<h1 class="about-heading__text">
					<SplitText
						noOverflow
						text="Creativity is at my core. I love creating rich digital experiences — from perfecting the smallest details to scaffolding the biggest ideas."
					/>
				</h1>
				<img
					class="about-heading__image"
					id="datepicker"
					src="images/homepage/datepicker.png"
					alt="date picker"
				/>
				<img
					class="about-heading__image"
					id="spellingbee"
					src="images/homepage/spellingbee.png"
					alt="spelling bee app"
				/>
				<img
					class="about-heading__image"
					id="typing-race"
					src="images/homepage/typing-race.png"
					alt="chat app"
				/>
			</div>
		</div>
		<div class="about__content">
			<p>
				<SplitText
					noOverflow
					wordsOnly
					text="I am currently working as a Software Developer at Katara. As the sole frontend developer and designer, I am focused on creating the best user experience possible. I also manage the technical documentation, helping users understand and navigate our complex product."
				/>
			</p>
			<p>
				<SplitText
					noOverflow
					wordsOnly
					text="Previously, I was an intern on the Design Systems team at Chatham Financial and a freelancer on Fiverr. From my experiences, I have built a diverse set of skills across web development and design."
				/>
			</p>
			<p>
				<SplitText
					noOverflow
					wordsOnly
					text="I’m an avid tennis player and fan, and I’m passionate about playing music, including guitar, piano, and drums. I also love learning new things, and I’m always seeking out new knowledge."
				/>
			</p>
		</div>
	</section>
	<section class="skills">
		<div class="skills__container">
			<Canvas
				bind:this={skillsCanvas}
				width="100%"
				height="100%"
				interactive={// Interactive canvas + touch device = annoying scroll behavior
				browser && !isTouchDevice()}
				bounded={false}
				gravity={{ scale: 0.00067 }}
			>
				<div class="skills__inner">
					<ul class="skill-list">
						{#each skills.toReversed() as skill}
							<li class="skill-list__item" style="align-self: {getRandomAlignment()};">
								{#if screenWidth < 768}
									<Circle size={76} class="skill-circle" restitution={0.75}>
										{skill}
									</Circle>
								{:else}
									<Circle size={108} class="skill-circle" restitution={0.75}>
										{skill}
									</Circle>
								{/if}
							</li>
						{/each}
					</ul>
					<div class="skills__content">
						<Rectangle class="skills__left-wall" isStatic />
						<Rectangle class="skills__right-wall" isStatic />
						<Rectangle class="skills__bottom-wall" isStatic />
						<Rectangle style="width: fit-content;" isStatic>
							<h1 class="skills__heading">Skills</h1>
						</Rectangle>
						<Rectangle style="width: fit-content;" isStatic>
							<p class="skills__description">
								Through schoolwork, personal and service projects, and professional experience as
								both a freelancer and as an intern, I've developed actionable skills with many web
								tools, technologies, and concepts.
							</p>
						</Rectangle>
					</div>
				</div>
			</Canvas>
		</div>
	</section>
	<Projects onLoad={onProjectsLoad} />
	<Contact projectsLoaded={projectsLoad} onLoad={onContactLoad} />
</main>

<style lang="scss">
	@import '$scss/variables';
	@import '$scss/mixins';

	:global(body[data-loading='true']) {
		background-color: $primary-extra-dark;
	}

	:global(body:not([data-loaded='true'])) {
		overflow: hidden;
	}

	:global(body[data-loaded='true'] .preloader) {
		display: none;
	}

	.preloader {
		z-index: 9999;
		position: fixed;
		inset: 0;

		&__background {
			width: 100%;
			height: 100%;
			position: absolute;
			inset: 0;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			&:nth-of-type(4) {
				z-index: 1;
				background-color: $primary-extra-dark;
			}

			&:nth-of-type(3) {
				z-index: 2;
				background-color: $primary-dark;
			}

			&:nth-of-type(2) {
				z-index: 3;
				background-color: $primary-semi-dark;
			}

			&:nth-of-type(1) {
				z-index: 4;
				background-color: $primary;
			}

			.preloader-text {
				@include container;
				padding-bottom: 24px;

				h1 {
					font-size: $font-size-24;
					text-transform: lowercase;

					@media screen and (min-width: $screen-md) {
						font-size: $font-size-32;
					}
				}
			}
		}
	}

	.homepage {
		overflow: hidden;
		background-color: $background;
	}

	.hero {
		height: 450px;
		@include centered;

		&__inner {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding-inline: 24px;
		}

		&__heading {
			font-size: $font-size-32;
			white-space: nowrap;
			text-transform: lowercase;

			@media screen and (min-width: $screen-xs) {
				font-size: $font-size-40;
			}

			@media screen and (min-width: $screen-sm) {
				font-size: $font-size-60;
			}
		}

		&__description {
			font-size: $font-size-8;
			max-width: 500px;

			@media screen and (min-width: $screen-sm) {
				font-size: $font-size-10;
			}
		}

		:global(.hero__cta) {
			margin-top: 24px;
		}
	}

	.about {
		@include container;

		&__heading-wrapper {
			padding-block: 300px;

			@media screen and (min-width: $screen-md) {
				padding-top: 80px;
			}
		}

		.about-heading {
			position: relative;
			margin: auto;
			width: 100%;
			max-width: 1024px;

			&__text {
				text-align: center;
				font-size: $font-size-20;
				position: relative;
				z-index: 1;

				@media screen and (min-width: $screen-sm) {
					font-size: $font-size-24;
				}

				@media screen and (min-width: $screen-md) {
					font-size: $font-size-32;
				}
			}

			&__image {
				position: absolute;
				transform: translate(-50%, -50%);
				max-width: unset;
				max-height: unset;

				&#typing-race {
					z-index: 2;
					left: 75%;
					top: -40%;
					height: 130px;

					@media screen and (min-width: $screen-md) {
						left: 15%;
						top: 170%;
						height: 170px;
					}
				}

				&#spellingbee {
					z-index: 0;
					left: 15%;
					top: -25%;
					height: 180px;

					@media screen and (min-width: $screen-md) {
						left: 75%;
						top: 150%;
						height: 240px;
					}
				}

				&#datepicker {
					z-index: 0;
					left: 50%;
					top: 125%;
					height: 180px;

					@media screen and (min-width: $screen-md) {
						left: 100%;
						top: -15%;
						height: 225px;
					}
				}
			}
		}

		&__content {
			padding-bottom: 160px;
			@include v-gap(48px);

			@media screen and (min-width: $screen-md) {
				width: 100%;
				max-width: 50%;
				margin-left: auto;
			}

			p {
				font-size: $font-size-10;
			}
		}
	}

	.skills {
		width: 100%;
		height: 100vh;
		max-height: 800px;
		background-color: $primary-dark;

		&__container {
			height: 100%;
			@include container;
		}

		&__inner {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			height: 100%;
		}

		&__content {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding-bottom: 24px;
		}

		&__heading {
			font-size: $font-size-24;
			color: $white;
			text-transform: lowercase;
			line-height: 1;
			width: fit-content;

			@media screen and (min-width: $screen-md) {
				font-size: $font-size-60;
			}
		}

		&__description {
			color: $white;
			max-width: 500px;
			width: fit-content;
		}

		:global(.skills__left-wall) {
			position: absolute;
			right: 100%;
			top: -1000%;
			bottom: 0;
			width: 100px;
		}

		:global(.skills__right-wall) {
			position: absolute;
			left: 100%;
			top: -1000%;
			bottom: 0;
			width: 100px;
		}

		:global(.skills__bottom-wall) {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			height: 100px;
		}

		.skill-list {
			margin-left: auto;
			padding: 0 15% 650px;
			display: flex;
			flex-direction: column;
			gap: 160px;
			width: 160px;

			&__item {
				display: block;

				:global(.skill-circle) {
					background-color: $primary-extra-dark;
					color: $white;
					pointer-events: none;
					font-size: $font-size-5-5;
					text-align: center;
					-webkit-user-select: none; /* Safari */
					-moz-user-select: none; /* Firefox */
					user-select: none;
					line-height: 1.15;
					@include centered;

					@media screen and (min-width: $screen-md) {
						font-size: $font-size-8;
					}
				}
			}
		}
	}
</style>
