<script lang="ts">
	import { browser } from '$app/environment'
	import Navigation from '$components/Navigation.svelte'
	import '$scss/index.scss'
	import gsap from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
	import { Observer } from 'gsap/dist/Observer'
	import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
	import { onNavigate } from '$app/navigation'
	import scrollToLink from '$utils/scrollToLink'
	import { markSiteLoaded, siteLoaded } from '$utils/siteLoaded'
	import debounce from 'debounce'

	const { children } = $props()

	if (browser) {
		gsap.registerPlugin(Observer, ScrollTrigger, ScrollToPlugin)
		// Stop scroll trigger from refreshing on window resize
		// Will be manually handled later
		ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' })
	}

	function isCaseStudyPage(path: string | undefined) {
		return path && path.startsWith('/case-study')
	}

	function isHomePage(path: string | undefined) {
		return path === '/'
	}

	// An ID maintained by svelte that lets me determine if the user is going forward or backward in navigation
	let currentPageHistoryId = $state<number>(browser ? history.state['sveltekit:history'] : -1)

	const refreshScrollTrigger = debounce(async () => {
		// Wait for site to be loaded so there can never be a refresh while the preloader is animating
		// Allowing refresh while the preloader animates will cause GSAP calculations to be off
		await siteLoaded
		console.log('refresh after site loaded')
		ScrollTrigger.refresh()
	}, 100)

	$effect(() => {
		// Manually reattach custom refreshing on resize to the scroll trigger
		window.addEventListener('resize', refreshScrollTrigger)

		const hash = window.location.hash
		if (hash) {
			scrollToLink(undefined, hash, false)
		}

		// Homepage will handle this post-preloader
		if (window.location.pathname !== '/') {
			markSiteLoaded()
		}

		return () => {
			window.removeEventListener('resize', refreshScrollTrigger)
		}
	})

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		const nextPageHistoryId = history.state['sveltekit:history']
		const fromPath = navigation.from?.url.pathname
		const toPath = navigation.to?.url.pathname

		// No need to do view transitions if the page isn't changing
		if (fromPath === toPath) return

		if (!isHomePage(fromPath) && isHomePage(toPath)) {
			document.querySelector('html')!.id = 'to-home'
		} else if (!isCaseStudyPage(fromPath) && isCaseStudyPage(toPath)) {
			document.querySelector('html')!.id = 'to-case-study'
		} else if (
			isCaseStudyPage(fromPath) &&
			isCaseStudyPage(toPath) &&
			nextPageHistoryId >= currentPageHistoryId
		) {
			document.querySelector('html')!.id = 'between-case-studies-forward'
		} else if (
			isCaseStudyPage(fromPath) &&
			isCaseStudyPage(toPath) &&
			nextPageHistoryId < currentPageHistoryId
		) {
			document.querySelector('html')!.id = 'between-case-studies-backward'
		} else {
			document.querySelector('html')!.id = ''
		}

		currentPageHistoryId = nextPageHistoryId

		return new Promise((res) => {
			document.startViewTransition(async () => {
				res()
				await navigation.complete
			})
		})
	})
</script>

<Navigation />
{@render children()}
