<script lang="ts">
  import gsap from "gsap";

  $effect(() => {
    const xTo = gsap.quickTo("#mouse-follower", "x", {duration: 0.25, ease: "power4.out"}),
          yTo = gsap.quickTo("#mouse-follower", "y", {duration: 0.25, ease: "power4.out"})

    function onMouseMove(e: MouseEvent) {
      gsap.set('#mouse-follower', { opacity: 1 })
      xTo(e.clientX);
      yTo(e.clientY);
      if((e.target as HTMLElement).closest('button, a')) {
        gsap.to('#mouse-follower', { width: 32, opacity: 0.25, duration: 0.5, ease: 'expo.out' })
      } else {
        gsap.to('#mouse-follower', { width: 12, opacity: 1, duration: 0.5, ease: 'expo.out' })
      }
    }

    window.addEventListener("mousemove", onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  })
</script>

<div id='mouse-follower'></div>

<style lang="scss">
  @import '$scss/variables';

  #mouse-follower {
    width: 12px;
    aspect-ratio: 1;
    border-radius: 999px;
    background-color: $purple-3;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s;
    z-index: 9999;
    position: fixed;
  }
</style>