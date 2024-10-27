<script lang="ts">
	import gsap from 'gsap'
	import Button from './Button.svelte'
	import { goto } from '$app/navigation'
	import isTouchDevice from '$utils/isTouchDevice'
	import ExternalLinkIcon from './ExternalLinkIcon.svelte'

	interface Props {
		slug: string
		title: string
		image: string
	}

	const { slug, title, image }: Props = $props()

	let progress = $state(0)
	let touch = $state(false)

	$effect(() => {
		if (isTouchDevice()) {
			touch = true
			return
		}

		let navigation = 0
		const ctx = gsap.context(() => {
			const container = document.querySelector('.next')!
			const progressbar = container.querySelector('.progress')
			const image = container.querySelector('.image')
			const updateProgress = gsap.quickTo('.progress__bar', 'width', {
				duration: 0.5,
				ease: 'power4.out'
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: 'top top',
					end: '+=1200px',
					pin: true,
					scrub: 1,
					onUpdate: (self) => {
						updateProgress(self.progress * progressbar!.clientWidth)

						if (self.progress > 0.99 && !navigation) {
							navigation = setTimeout(() => {
								goto(`/case-study/${slug}`)
							}, 500)
						}
					}
				}
			})

			tl.fromTo(
				image,
				{
					y: -50,
					rotate: -8
				},
				{
					y: 50,
					rotate: 8,
					scale: 2.75,
					duration: 1,
					ease: 'sine.in'
				},
				0
			)
		})

		return () => {
			ctx.revert()
			if (navigation) {
				clearTimeout(navigation)
			}
		}
	})
</script>

<div class="next{touch ? ' next--touch-device' : ''}">
	<div class="next__inner">
		<img class="image" src={image} alt="{title} preview image 1" />
		<div class="text">
			<h2 class="text__up-next">Up next</h2>
			<div class="above-progress">
				<h1 class="above-progress__title">
					{title}
				</h1>
				<Button type="link" href="/case-study/{slug}" class="above-progress__skip" style="text">
					Skip
				</Button>
			</div>
			<a href="/case-study/{slug}" class="next-case-study-touch">
				View case study
				<ExternalLinkIcon />
			</a>
		</div>
		<div
			role="progressbar"
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={progress}
			class="progress"
		>
			<div role="" class="progress__bar"></div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '$scss/mixins';
	@import '$scss/variables';

	.next-case-study-touch {
		height: 48px;
		line-height: 48px;
		font-size: $font-size-10;
		font-weight: 600;
		background-color: $primary;
		padding-inline: 16px;
		border-radius: 8px;
		margin-bottom: 24px;
		margin-top: 4px;
		display: none;
		align-items: center;
		gap: 4px;
	}

	.next {
		overflow: hidden;
		position: relative;

		&__inner {
			@include container;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		}

		.image {
			position: absolute;
			z-index: -1;
			right: 10vw;
			bottom: 30vh;
			width: 45vw;
			height: 45vh;
			object-fit: contain;
			filter: drop-shadow(3px 5px 8px rgba(0, 0, 0, 0.13));
			transform: rotate(12deg);
		}

		.text {
			@include v-gap(0px);

			&__up-next {
				font-family: $font-body;
				text-transform: lowercase;
				font-weight: 500;
			}

			.above-progress {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				&__title {
					font-size: $font-size-16;
					text-transform: lowercase;

					@media screen and (min-width: $screen-sm) {
						font-size: $font-size-24;
					}

					@media screen and (min-width: $screen-md) {
						font-size: $font-size-40;
					}

					@media screen and (min-width: $screen-lg) {
						font-size: $font-size-60;
					}
				}
			}
		}

		.progress {
			width: 100%;
			height: 4px;
			border-radius: 999px;
			overflow: hidden;
			background-color: $gray-1;
			margin: 6px 0 24px 0;

			&__bar {
				background-color: $black;
				height: 100%;
				width: 0;
			}
		}

		&--touch-device {
			.next__inner {
				height: unset;
			}

			.next-case-study-touch {
				display: flex;
			}

			:global(.above-progress__skip),
			.progress {
				display: none;
			}

			.image {
				position: static;
				transform: none;
				filter: none;
				width: 100%;
				max-width: 600px;
				height: auto;
				margin-bottom: 32px;
			}
		}
	}
</style>
