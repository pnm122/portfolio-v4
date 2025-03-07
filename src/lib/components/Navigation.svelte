<script lang="ts">
	import createClasses from '$utils/createClasses'
	import Button from './Button.svelte'
	import scrollToLink from '$utils/scrollToLink'

	let open = $state(false)

	function onLinkClicked(e: MouseEvent, link: string) {
		open = false
		// GSAP overrides default smooth scrolling, replace it here
		if (window.location.pathname === '/' && link.includes('#')) {
			scrollToLink(e, link)
		}
	}
</script>

<div class="navigation-container">
	<div class="navigation">
		<div class="navigation__content">
			<nav
				class={createClasses({
					nav: true,
					'nav--expanded': open
				})}
			>
				<ul class="nav__list">
					<li class="list-item">
						<Button
							type="link"
							href="/#hero"
							onClick={(e) => onLinkClicked(e, '#hero')}
							style="text"
							size="small"
							class="list-item__desktop-link"
						>
							Home
						</Button>
						<a
							href="/#hero"
							onclick={(e) => onLinkClicked(e, '#hero')}
							class="list-item__mobile-link"
						>
							Home
						</a>
					</li>
					<li class="list-item">
						<Button
							type="link"
							href="/#case-studies"
							onClick={(e) => onLinkClicked(e, '#case-studies')}
							style="text"
							size="small"
							class="list-item__desktop-link"
						>
							Case studies
						</Button>
						<a
							href="/#case-studies"
							onclick={(e) => onLinkClicked(e, '#case-studies')}
							class="list-item__mobile-link"
						>
							Case studies
						</a>
					</li>
					<li class="list-item">
						<Button
							type="link"
							href="/#contact"
							onClick={(e) => onLinkClicked(e, '#contact')}
							style="text"
							size="small"
							class="list-item__desktop-link"
						>
							Contact Me
						</Button>
						<a
							href="/#contact"
							onclick={(e) => onLinkClicked(e, '#contact')}
							class="list-item__mobile-link"
						>
							Contact Me
						</a>
					</li>
				</ul>
			</nav>
			<button
				class="toggle"
				role="switch"
				aria-label="Open navigation"
				aria-checked={open}
				onclick={() => (open = !open)}
			>
				<div class="toggle__bar"></div>
				<div class="toggle__bar"></div>
				<div class="toggle__bar"></div>
			</button>
			<div class="navigation__mobile-background"></div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '$scss/variables';
	@import '$scss/mixins';

	$nav-items: 3;
	$nav-item-delay: 0.1s;

	.toggle {
		padding: 8px;
		justify-content: center;
		align-items: center;
		@include force-size(56px, 56px);
		@include v-gap(4px);

		&[aria-checked='true'] {
			.toggle__bar:first-of-type,
			.toggle__bar:last-of-type {
				width: 0;
			}

			.toggle__bar:nth-of-type(2) {
				width: 50%;
			}
		}

		&__bar {
			width: 100%;
			height: 2px;
			background-color: $black;
			@include transition($transition-duration-4, width);
		}
	}

	@media screen and (width < $screen-sm) {
		:global(body:has(.navigation .toggle[aria-checked='true'])) {
			overflow: hidden !important;
		}

		.toggle {
			position: fixed;
			top: 24px;
			right: 24px;
			z-index: 999;
		}

		.navigation {
			&:has(.toggle[aria-checked='false']) {
				.navigation__mobile-background {
					height: 0;
					width: 0;
					border-radius: 999px;
					transition-delay: #{$nav-item-delay * $nav-items};
				}

				.nav {
					visibility: hidden;
				}

				.list-item {
					visibility: hidden;
					opacity: 0;
					transform: translateY(-0.5em);
				}

				@for $i from 1 through $nav-items {
					.list-item:nth-of-type(#{$i}) {
						transition-delay: #{$nav-item-delay * $i};
					}
				}
			}

			&:has(.toggle[aria-checked='true']) {
				@for $i from 1 through $nav-items {
					.list-item:nth-of-type(#{$i}) {
						transition-delay: #{$nav-item-delay * $i + 0.125s};
					}
				}
			}

			&__content {
				.nav {
					position: fixed;
					inset: 0;
					z-index: 998;
					@include centered;

					&__list {
						@include v-gap(24px);
						margin: 0;
						padding: 0;

						.list-item {
							display: block;
							width: 100%;
							@include transition($transition-duration-4, visibility, opacity, transform);

							.list-item__mobile-link {
								font-family: $font-heading;
								font-size: $font-size-24;
								font-weight: 600;
								text-transform: lowercase;
								color: $black;
								width: 100%;
								text-align: right;

								&:hover {
									color: $green-6;
								}
							}

							:global(.list-item__desktop-link) {
								display: none;
							}
						}
					}
				}
			}

			&__mobile-background {
				background-color: $primary;
				position: fixed;
				z-index: 997;
				top: 0;
				right: 0;
				transform: translate(50%, -50%);
				height: 200vh;
				width: 200vw;
				border-radius: 0;
				@include transition($transition-duration-8, height, width, border-radius);
			}
		}
	}

	@media screen and (min-width: $screen-sm) {
		.navigation-container {
			@include container;
			// margin: auto; from container doesn't work for fixed elements, need to center it another way
			left: 50%;
			transform: translate(-50%);
			height: 16px;
			position: fixed;
			z-index: 999;
			top: 24px;
			view-transition-name: navigation;
		}
		.navigation {
			position: absolute;
			right: 0;
			height: 0;
			display: flex;
			justify-content: flex-end;
			/* Force nav to fit content when expanded */
			max-width: fit-content;
			/* Width of toggle button */
			min-width: 56px;

			&__content {
				width: 0;
				height: fit-content;
				border-radius: 8px;
				background-color: $primary;
				justify-content: flex-end;
				align-items: center;
				@include h-gap(16px);
				@include transition($transition-duration-4, width, padding);

				&:has(.toggle[aria-checked='true']) {
					width: 100%;
					padding-left: 8px;
				}

				&:has(.toggle[aria-checked='false']) {
					transition-delay: calc($nav-item-delay * $nav-items);
				}
			}

			&__mobile-background {
				display: none;
			}
		}

		.nav {
			&__list {
				display: flex;
				align-items: center;
				gap: 16px;
				margin: 0;
				padding: 0;

				.list-item {
					display: block;
					text-transform: lowercase;
					visibility: hidden;
					opacity: 0;
					transform: translateY(16px);
					white-space: nowrap;
					@include transition($transition-duration-4, visibility, opacity, transform);

					&__mobile-link {
						display: none;
					}
				}

				@for $i from 1 through $nav-items {
					.list-item:nth-of-type(#{$i}) {
						transition-delay: calc($nav-item-delay * $i);
					}
				}
			}

			&--expanded {
				.list-item {
					visibility: visible;
					opacity: 1;
					transform: none;
				}

				@for $i from 1 through $nav-items {
					.list-item:nth-of-type(#{$i}) {
						transition-delay: calc($nav-item-delay * (3 - $i));
					}
				}
			}
		}
	}
</style>
