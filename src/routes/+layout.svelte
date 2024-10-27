<script lang="ts">
	import { browser } from '$app/environment'
	import Navigation from '$components/Navigation.svelte'
	import '$scss/index.scss'
	import gsap from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
	import { Observer } from 'gsap/dist/Observer'
	import MouseFollower from '$components/MouseFollower.svelte'
	import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
	import { onNavigate } from '$app/navigation'

	if (browser) {
		gsap.registerPlugin(Observer, ScrollTrigger, ScrollToPlugin)
	}

	function isCaseStudyPage(path: string | undefined) {
		return path && path.startsWith('/case-study')
	}

	function isHomePage(path: string | undefined) {
		return path === '/'
	}

	// An ID maintained by svelte that lets me determine if the user is going forward or backward in navigation
	let currentPageHistoryId = $state<number>(browser ? history.state['sveltekit:history'] : -1)

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		const nextPageHistoryId = history.state['sveltekit:history']
		const fromPath = navigation.from?.url.pathname
		const toPath = navigation.to?.url.pathname

    // No need to do view transitions if the page isn't changing
    if(fromPath === toPath) return

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
<slot></slot>
