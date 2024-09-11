<script lang="ts">
	import { browser } from '$app/environment';
	import '$scss/index.scss';
	import gsap from 'gsap';
	import { Observer } from 'gsap/dist/Observer';

  if(browser) {
    gsap.registerPlugin(Observer)
  }
</script>

<slot></slot>
