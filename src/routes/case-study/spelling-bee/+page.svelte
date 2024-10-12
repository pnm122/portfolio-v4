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
		<div class="intro__description">
			<p>
				A replica of the New York Times’ Spelling Bee game with additional features, including hints
				and leaderboards.
			</p>
		</div>
		<div class="intro__buttons">
			<Button type="link" href="https://github.com/pnm122/spelling-bee" newTab>Source</Button>
			<Button type="link" href="https://www.thebetterspellingbee.com" newTab>View live site</Button>
		</div>
	</section>
	<section>
	  <CaseStudyImage
  		src="/images/homepage/project-covers/spelling-bee.png"
  		alt="Screenshot of the Spelling Bee game"
  		class="case-study-image--full-width"
  	/>
	</section>
  <section class="section">
    <h2 class="section__title">Overview</h2>
    <div class="section__text">
      <p>
        Spelling Bee is an improved version of the New York Times’ Spelling Bee game, which I designed and developed from scratch. It includes a replica of the original game, with custom-built solutions for accounts, a points system, in-game hints, game generation, and leaderboards. I was inspired to create the Spelling Bee by the original game both being locked behind a paywall and missing features that I believed would improve the game.
      </p>
      <p>
        In the Spelling Bee, the player tries to find as many words as possible using the provided letters, with the only restriction being that they must use the center letter.
      </p>
    </div>
    <ul class="section__details skill-list">
      <li class="skill-list__item">Svelte</li>
      <li class="skill-list__item">MongoDB</li>
      <li class="skill-list__item">Figma</li>
      <li class="skill-list__item">Node.js</li>
      <li class="skill-list__item">Express.js</li>
      <li class="skill-list__item">TypeScript</li>
      <li class="skill-list__item">Python</li>
    </ul>
  </section>
  <section class="section">
    <CaseStudyImage
  		src="/images/homepage/project-covers/spelling-bee.png"
  		alt="First image"
  		class="case-study-image--small-first"
  	/>
    <CaseStudyImage
  		src="/images/homepage/project-covers/spelling-bee.png"
  		alt="Second image"
  		class="case-study-image--large-last"
  	/>
  </section>
  <section class="section">
    <h2 class="section__title">Process</h2>
    <div class="section__text">
      <p>
        I started creating the Spelling Bee by outlining what features I wanted to keep from the original, and what I believed needed improvement. Following this, I created layout mockups to figure out how to organize the content I wanted on the page. The layout needed to include the main game, header, leaderboard, found words list, and more, while remaining mobile-friendly.
      </p>
      <p>
        I then decided on the style of the game, choosing typography and colors, and molding a visual identity. I aimed to create a design that was light and fun, but also soft and smooth. I chose bright accent colors with soft supporting colors, a friendly yet readable and inobtrusive font, and crafted micro-interactions and animations to build a full, exciting user experience.
      </p>
    </div>
  </section>
  <section class="section">
    <CaseStudyImage
  		src="/images/homepage/project-covers/spelling-bee.png"
  		alt="Third image"
  		class="case-study-image--large-first"
  	/>
    <CaseStudyImage
  		src="/images/homepage/project-covers/spelling-bee.png"
  		alt="Fourth image"
  		class="case-study-image--small-last"
  	/>
  </section>
</main>

<style lang="scss">
	@import '$scss/variables';
	@import '$scss/mixins';

	:global(.case-study-image--full-width) {
		width: 100%;
	}

  :global(.case-study-image--small-first) {
    @include grid-column(1, 5);
		height: 100%;
	}

  :global(.case-study-image--large-last) {
    @include grid-column(5, 13);
		height: 100%;
	}

  :global(.case-study-image--large-first) {
    @include grid-column(1, 9);
		height: 100%;
	}

  :global(.case-study-image--small-last) {
    @include grid-column(9, 13);
		height: 100%;
	}

	.case-study {
		@include container;
		// place below navigation
		padding-top: 80px;
    padding-bottom: 128px;
		@include v-gap(64px);

		@media screen and (min-width: $screen-md) {
			@include v-gap(128px);
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
      @include page-grid;

      p {
        font-size: $font-size-10;
        grid-column: 1 / 9;
        color: $black;
        view-transition-name: project-description--spelling-bee;
  
        @media screen and (min-width: $screen-sm) {
          font-size: $font-size-16;
        }
  
        @media screen and (min-width: $screen-md) {
          font-size: $font-size-24;
        }
      }
		}

		&__buttons {
			display: flex;
			gap: 16px;
		}
	}

  .section {
    @include page-grid;

    &__title {
      font-size: $font-size-16;
      text-transform: lowercase;

      @media screen and (min-width: $screen-lg) {
        grid-column: 1 / 3;
      }
    }

    &__text {
      @include v-gap(1em);
      max-width: 600px;
      font-size: $font-size-9;

      @media screen and (min-width: $screen-lg) {
        max-width: unset;
        grid-column: 3 / 9;
      }
    }

    &__details {
      @media screen and (min-width: $screen-lg) {
        grid-column: 10 / 13;
      }
    }
  }

  .skill-list {
    @include v-gap(0px);
    margin: 0;
    padding: 0;

    &__item {
      font-size: $font-size-7;
      display: block;
    }
  }
</style>
