<script lang="ts">
	import createClasses from '$utils/createClasses'
	import gsap from 'gsap'

	interface Props {
		src: string
		alt: string
		class?: string
	}

	const { src, alt, class: className }: Props = $props()

	$effect(() => {
		const ctx = gsap.context(() => {
			const wrapper = document.querySelector(`#${getId()}`)!
			console.log('id', `#${getId()}`)
			console.log('wrapper', wrapper)
			const image = wrapper.querySelector('.image')

			gsap.set(image, {
				scale: 1.2
			})
			gsap.fromTo(
				image,
				{
					y: '-10%'
				},
				{
					y: '10%',
					ease: 'none',
					scrollTrigger: {
						trigger: wrapper,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1
					}
				}
			)
		})

		return () => {
			ctx.revert()
		}
	})

	function getId() {
		return `${src}_${alt}`.replaceAll(/[/.# ]/g, '').toLowerCase()
	}
</script>

<div
	class={createClasses({
		'image-wrapper': true,
		...(className ? { [className]: true } : undefined)
	})}
	id={getId()}
>
	<img class="image" {alt} {src} />
</div>

<style lang="scss">
	.image-wrapper {
		border-radius: 8px;
		overflow: hidden;

		.image {
			object-fit: cover;
			height: 100%;
			width: 100%;
		}
	}
</style>
