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
			const image = wrapper.querySelector('.image')
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
          transformOrigin: 'bottom center',
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
