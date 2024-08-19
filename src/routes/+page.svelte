<script lang="ts">
	import { Canvas, Circle } from "svelte-physics-renderer";

  const skills = [
    'JavaScript',
    'TypeScript',
    'HTML',
    'CSS',
    'React',
    'Svelte',
    'Stencil',
    'Flutter',
    'SCSS',
    'Tailwind',
    'Node',
    'Express',
    'Flask',
    'MongoDB',
    'Firebase',
    'Git',
    'GitLab CI',
    'Web Components',
    'Figma',
    'Adobe XD',
    'GSAP',
    'Matter.js',
    'OpenGL'
  ]

  let canvas = $state<Canvas>()
  let renderedSkills = $state<string[]>([])

  $effect(() => {
    canvas?.context.start()

    let interval: number

    function maybeAddRenderedSkill() {
      if(renderedSkills.length === skills.length) return clearInterval(interval)

      renderedSkills.push(skills[renderedSkills.length])
    }

    interval = setInterval(maybeAddRenderedSkill, 150)

    function resetRenderedSkills() {
      renderedSkills = []
      if(interval) clearInterval(interval)
      interval = setInterval(maybeAddRenderedSkill, 150)
    }

    window.addEventListener('resize', resetRenderedSkills)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resetRenderedSkills)
    }
  })
</script>
<div class="main">
  <Canvas width="100%" height="100%" interactive bind:this={canvas}>
    {#each renderedSkills as skill}
      <Circle size={96} class="skill-circle">
        <div class="skill-circle__inner">
          {skill}
        </div>
      </Circle>
    {/each}
  </Canvas>
</div>

<style lang="scss">
  @import '$scss/variables';
  @import '$scss/mixins';

  .main {
    width: 100%;
    height: 100vh;
    max-height: -webkit-fill-available;
  }

  :global(.skill-circle) {
    pointer-events: none;
  }

  :global(.skill-circle__inner) {
    color: $primary-75;
    font-size: $font-size-7;
    font-weight: 500;
    text-align: center;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    animation: appear $transition-duration-4;
    background-color: $primary-10;
    @include centered;
  }

  @keyframes appear {
    from { transform: scale(0) }
    to { transform: scale(1) }
  }
</style>