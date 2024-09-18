<script lang="ts">
	import { browser } from '$app/environment'
	import Navigation from '$components/Navigation.svelte'
	import '$scss/index.scss'
	import gsap from 'gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
	import { Observer } from 'gsap/dist/Observer'

	if (browser) {
		gsap.registerPlugin(Observer, ScrollTrigger)
	}
</script>

<Navigation />
<slot></slot>
