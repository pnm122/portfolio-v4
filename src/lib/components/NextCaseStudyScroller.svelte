<script lang="ts">
	import gsap from 'gsap'
	import Button from './Button.svelte'
	import { goto } from '$app/navigation'
	import isTouchDevice from '$utils/isTouchDevice'

	interface Props {
		slug: string
		title: string
		image: string
	}

	const { slug, title, image }: Props = $props()

	let progress = $state(0)
  let touch = $state(false)

	$effect(() => {
    if(isTouchDevice()) {
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

<div class="next{touch ? " next--touch-device" : ""}">
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
      <a
        href="/case-study/{slug}"
        class="next-case-study-touch">
        View case study
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M15.8075 9.82182L7.90554 17.7237C7.70519 17.9241 7.46949 18.024 7.19843 18.0236C6.92737 18.0231 6.69167 17.9231 6.49133 17.7237C6.29098 17.5243 6.1908 17.2884 6.1908 17.0159C6.1908 16.7435 6.29098 16.508 6.49133 16.3095L14.3932 8.40761L7.4636 8.40761C7.18075 8.40761 6.94788 8.3105 6.76498 8.11628C6.58207 7.92206 6.49085 7.6833 6.49133 7.39998C6.50311 7.12893 6.60046 6.89629 6.78336 6.70207C6.96627 6.50785 7.1989 6.41051 7.48128 6.41003H16.8151C16.9565 6.41003 17.0833 6.43643 17.1955 6.48923C17.3077 6.54203 17.4107 6.6158 17.5045 6.71055C17.5983 6.80531 17.6721 6.90831 17.7258 7.01956C17.7796 7.13081 17.806 7.25762 17.805 7.39998L17.805 16.7338C17.805 16.9931 17.7079 17.2198 17.5137 17.414C17.3195 17.6082 17.0866 17.7115 16.8151 17.7237C16.5322 17.7237 16.2935 17.6264 16.0988 17.4317C15.9041 17.237 15.807 16.9985 15.8075 16.7161L15.8075 9.82182Z"
          />
        </svg>
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
