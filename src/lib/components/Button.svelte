<script lang="ts">
	import createClasses from '$utils/createClasses'
	import gsap from 'gsap'
	import { Observer } from 'gsap/dist/Observer'
	import type { Snippet } from 'svelte'

	interface Props {
		size?: 'small' | 'medium' | 'large'
		style?: 'primary' | 'text'
		type?: 'link' | 'button'
		href?: string
		newTab?: boolean
		onClick?: (e: MouseEvent) => void
		class?: string
		children: Snippet
	}

	const {
		size = 'medium',
		style = 'primary',
		type = 'button',
		href = '#',
		newTab = false,
		onClick,
		class: className,
		children
	}: Props = $props()

	const classes = createClasses({
		button: true,
		[`button--${style}`]: true,
		'button--small': size === 'small',
		'button--medium': size === 'medium',
		'button--large': size === 'large',
		...(className ? { [className]: true } : {})
	})

	let button = $state<HTMLElement>()
	let buttonBackground = $state<HTMLElement>()
	// Needed to guarantee that the onHoverEnd animation happens after the last onMove animation
	let isHovering = $state(false)

	function scaleOffset(offset: number, scale: number, max: number) {
		let flip = false
		if (offset < 0) {
			flip = true
			offset = -1 * offset
		}

		const res = (-1 * max) / (scale * offset + 1) + max
		if (flip) return res * -1
		else return res
	}

	$effect(() => {
		const ctx = gsap.context(() => {
			Observer.create({
				target: button,
				type: 'pointer',
				onMove: ({ x, y }) => {
					if (!isHovering) return

					const { x: bgX, y: bgY, width, height } = buttonBackground!.getBoundingClientRect()
					const xOffset = x! - bgX - width / 2
					const yOffset = y! - bgY - height / 2
					gsap.to(buttonBackground!, {
						x: scaleOffset(xOffset, 0.08, 24),
						y: scaleOffset(yOffset, 0.08, 24),
						rotateY: scaleOffset(xOffset / 4, 0.08, 20),
						rotateX: scaleOffset(yOffset * -2, 0.08, 20),
						ease: 'elastic.out',
						duration: 0.75
					})
				},
				onHover: () => {
					isHovering = true
				},
				onHoverEnd: () => {
					isHovering = false
					gsap.to(buttonBackground!, {
						x: 0,
						y: 0,
						rotateY: 0,
						rotateX: 0,
						ease: 'elastic.out',
						duration: 0.75
					})
				}
			})
		})

		return () => ctx.revert()
	})
</script>

{#if type === 'button'}
	<button bind:this={button} class={classes} onclick={(e) => onClick && onClick(e)}>
		<div bind:this={buttonBackground} class="button__background">
			{#if style === 'text'}
				{@render children()}
			{/if}
		</div>
		<span class="button__inner">
			{@render children()}
		</span>
	</button>
{:else}
	<a
		bind:this={button}
		{href}
		class={classes}
		onclick={(e) => onClick && onClick(e)}
		target={newTab ? '_blank' : undefined}
		rel={newTab ? 'noopener noreferrer' : undefined}
	>
		<div bind:this={buttonBackground} class="button__background">
			{#if style === 'text'}
				{@render children()}
			{/if}
		</div>
		<span class="button__inner">
			{@render children()}
		</span>
	</a>
{/if}

<style lang="scss">
	@import '$scss/variables';
	@import '$scss/mixins';

	.button {
		color: var(--button-inner-color);
		border-radius: 999px;
		position: relative;
		font-weight: 500;
		width: fit-content;
		text-transform: lowercase;
		outline: none;
		perspective: 100px;
		@include centered;

		&:focus-visible &__background {
			@include focus;
		}

		&--primary {
			--button-color: #{$primary};
			--button-inner-color: #{$primary-dark};
		}

		&--small {
			height: 32px;
			padding-inline: 14px;
		}

		&--medium {
			height: 40px;
			padding-inline: 18px;
		}

		&--large {
			height: 48px;
			padding-inline: 24px;
			font-size: $font-size-10;
		}

		&--text {
			--button-color: transparent;
			--button-inner-color: #{$black};

			padding-inline: 8px;
			border-radius: 0;

			.button__inner {
				visibility: hidden;
			}
		}

		&__background {
			position: absolute;
			inset: 0;
			z-index: 0;
			border-radius: 999px;
			background-color: var(--button-color);
			pointer-events: none;
			@include centered;
		}

		&__inner {
			position: relative;
			z-index: 1;
			color: inherit;
		}
	}
</style>
