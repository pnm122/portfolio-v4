<script lang="ts">
	import Button from '$components/Button.svelte'
	import CaseStudyImage from '$components/CaseStudyImage.svelte'
	import gsap from 'gsap'

	$effect(() => {
		const ctx = gsap.context(() => {})

		return () => {
			ctx.revert()
		}
	})
</script>

<main class="case-study">
	<section class="intro">
		<div>
			<a class="intro__case-studies" href="/#case-studies">
				<h2>Case studies</h2>
			</a>
			<h1 class="intro__title">Spelling Bee</h1>
		</div>
		<div class="has-grid">
			<p class="intro__description">
				A replica of the New York Times’ Spelling Bee game with additional features, including hints
				and leaderboards.
			</p>
		</div>
		<div class="intro__buttons">
			<Button type="link" href="https://github.com/pnm122/spelling-bee" newTab>Source</Button>
			<Button type="link" href="https://www.thebetterspellingbee.com" newTab>View live site</Button>
		</div>
	</section>
	<CaseStudyImage
		src="/images/homepage/project-covers/spelling-bee.png"
		alt="Screenshot of the Spelling Bee game"
		class="sb-image"
	/>
</main>

<style lang="scss">
	@import '$scss/variables';
	@import '$scss/mixins';

	:global(.sb-image) {
		width: 100%;
	}

	.case-study {
		@include container;
		// place below navigation
		padding-top: 80px;
		@include v-gap(64px);

		@media screen and (min-width: $screen-md) {
			@include v-gap(128px);
		}
	}

	.has-grid {
		display: grid;
		grid-template-columns: 1fr;

		@media screen and (min-width: $screen-lg) {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}

	.intro {
		@include v-gap(12px);

		@media screen and (min-width: $screen-sm) {
			@include v-gap(24px);
		}

		&__case-studies {
			background-color: $gray-1;
			width: fit-content;
			padding: 4px 6px;
			border-radius: 4px;
			@include transition($transition-duration-2, background-color);

			&:hover {
				background-color: $gray-2;

				h2 {
					color: $black;
				}
			}

			h2 {
				text-transform: lowercase;
				font-size: $font-size-8;
				font-family: $font-body;
				font-weight: 500;
				color: $gray-7;
				@include transition($transition-duration-2, color);
			}
		}

		&__title {
			font-size: $font-size-32;
			line-height: 1;
			text-transform: lowercase;
			view-transition-name: project-title--spelling-bee;

			@media screen and (min-width: $screen-sm) {
				font-size: $font-size-60;
			}

			@media screen and (min-width: $screen-md) {
				font-size: $font-size-80;
			}

			@media screen and (min-width: $screen-xl) {
				font-size: $font-size-128;
			}
		}

		&__description {
			font-size: $font-size-10;
			grid-column: 1 / 5;
			color: $black;
			view-transition-name: project-description--spelling-bee;

			@media screen and (min-width: $screen-sm) {
				font-size: $font-size-16;
			}

			@media screen and (min-width: $screen-md) {
				font-size: $font-size-24;
			}
		}

		&__buttons {
			display: flex;
			gap: 16px;
		}
	}
</style>
