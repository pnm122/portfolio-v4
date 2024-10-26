<script lang="ts">
	import createClasses from '$utils/createClasses'
	import isTouchDevice from '$utils/isTouchDevice'
	import gsap from 'gsap'

	interface Props {
		src: string
		alt: string
		placement:
			| 'small-first'
			| 'small-last'
			| 'large-first'
			| 'large-last'
			| 'half-first'
			| 'half-last'
			| 'half-center'
			| 'full-width'
		// Must set an explicit aspect ratio to get rid of layout shifting (which can break GSAP animations, also bad UX)
		aspectRatio: string
		contain?: boolean
	}

	const { src, alt, placement, aspectRatio, contain = false }: Props = $props()

	$effect(() => {
		// A little buggy when testing on my phone, just disable for now
		if (isTouchDevice()) return

		const ctx = gsap.context(() => {
			const wrapper = document.querySelector(`#${getId()}`)!
			const image = wrapper.querySelector('.case-study-image__image')
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: wrapper,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1
				}
			})

			tl.from(
				wrapper,
				{
					scale: 0.75,
					transformOrigin: 'center 600px',
					duration: 0.4,
					ease: 'power4.out'
				},
				0
			)
			tl.fromTo(
				image,
				{
					y: '-32px'
				},
				{
					y: '32px',
					ease: 'none',
					duration: 1
				},
				0
			)
		})

		return () => {
			ctx.revert()
		}
	})

	function getId() {
		return `${src}_${alt.slice(0, 25)}`.replaceAll(/[^a-zA-Z]/g, '').toLowerCase()
	}
</script>

<div
	class="case-study-image case-study-image--{placement}"
	style="aspect-ratio: {aspectRatio}"
	id={getId()}
>
	<img
		class={createClasses({
			'case-study-image__image': true,
			'case-study-image__image--contain': contain
		})}
		{alt}
		{src}
	/>
</div>

<style lang="scss">
	@import '$scss/case-study';

	.case-study-image {
		border-radius: 8px;
		overflow: hidden;

		&--full-width {
			width: 100%;
			@include grid-column(1, 13);
		}

		&--small-first {
			@include grid-column(1, 5);
		}

		&--large-last {
			@include grid-column(5, 13);
		}

		&--large-first {
			@include grid-column(1, 9);
		}

		&--small-last {
			@include grid-column(9, 13);
		}

		&--half-first {
			@include grid-column(1, 7);
		}

		&--half-last {
			@include grid-column(7, 13);
		}

		&--half-center {
			@include grid-column(4, 10);
		}

		&__image {
			object-fit: cover;
			height: 100%;
			width: 100%;

			&--contain {
				object-fit: contain;
			}
		}
	}
</style>
