<script lang="ts">
	import createClasses from "$utils/createClasses"
	import vEase from "$utils/vEase"
	import gsap from "gsap"

  interface Project {
    name: string
    description: string
    imgSrc: string
    slug: string
    skills: string[]
  }

  const projects: Project[] = [{
    name: 'Spelling Bee',
    description: 'A replica of the New York Times’ Spelling Bee game with additional features, including hints and leaderboards.',
    imgSrc: 'spelling-bee.png',
    slug: 'spelling-bee',
    skills: ['Svelte', 'MongoDB', 'Figma', 'Node.js', 'Express.js', 'TypeScript', 'Python']
  }, {
    name: 'Chatham Financial',
    description: 'A collection of projects from working as an intern at Chatham Financial, primarily focused on improving their design system.',
    imgSrc: 'chatham-financial.png',
    slug: 'chatham-financial',
    skills: ['Stencil', 'SCSS', 'Jasmine', 'Gitlab CI', 'Git', 'TypeScript', 'Figma']
  }, {
    name: 'Club Tennis',
    description: 'A website created for the Club Tennis team at the University of Pittsburgh, featuring a bespoke design and admin panel made from scratch.',
    imgSrc: 'club-tennis.png',
    slug: 'club-tennis',
    skills: ['React', 'Figma', 'Firebase', 'GSAP', 'TypeScript']
  }, {
    name: 'Flex',
    description: 'A fitness tracker created as part of a Software Engineering course at the University of Pittsburgh.',
    imgSrc: 'flex.png',
    slug: 'flex',
    skills: ['React', 'Spring Boot', 'Figma', 'TypeScript']
  }]

  let showing = $state(false)
  let currentShowViewProjectTimeline = $state<gsap.core.Timeline | undefined>()
  let selectedProject = $state(0)
  let projectsTween: gsap.core.Tween

  function createViewProjectFollower() {
    if(!window.matchMedia('(pointer: fine)')) {
      return () => {}
    }

    const xTo = gsap.quickTo(".view-project", "x", { duration: 0.5, ease: 'expo.out' }),
          yTo = gsap.quickTo(".view-project", "y", { duration: 0.5, ease: 'expo.out' })

    const viewProject = document.querySelector('.view-project')!
    const { height } = viewProject.getBoundingClientRect()
    gsap.set(viewProject, { visibility: 'hidden', scale: 0 })
    const callback = (e: MouseEvent) => {
      xTo(e.clientX - 12)
      yTo(e.clientY - (height / 2))
      const withinProjects = (e.target as HTMLElement).closest('.project')
      if(withinProjects && !showing) {
        showViewProject()
      } else if(!withinProjects && showing) {
        hideViewProject()
      }
    }

    window.addEventListener('mousemove', callback)

    const cleanup = () => {
      window.removeEventListener('mousemove', callback)
    }

    return cleanup
  }

  $effect(() => {
    const ctx = gsap.context(() => {
      const projectImages = gsap.utils.toArray('.project-image')
      const projectsContainer = document.querySelector('.projects') as HTMLElement
      // Scale the projects themselves rather than the whole container
      // If you scale the container, GSAP's calculations on its position get wonky
      gsap.from(projectImages, {
        scale: 0.333,
        transformOrigin: '50vw center',
        ease: 'none',
        scrollTrigger: {
          trigger: projectsContainer,
          scrub: 1,
          start: 'top bottom',
          end: 'top top'
        }
      })

      const buttonsTo = gsap.quickTo(
        document.querySelector('.project-buttons'),
        'x'
      )

      const setPaddingTop = gsap.quickTo(
        gsap.utils.toArray('.project-image__padding-box'),
        'paddingTop',
        {
          duration: 1,
          ease: 'power4.out'
        }
      )

      const setPaddingBottom = gsap.quickTo(
        gsap.utils.toArray('.project-image__padding-box'),
        'paddingBottom',
        {
          duration: 1,
          ease: 'power4.out'
        }
      )
      
      const paddingProxy = { padding: 0 }
      projectsTween = gsap.to(projectImages, {
        xPercent: -100 * (projects.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: projectsContainer,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (projects.length - 1),
            duration: { min: 0.5, max: 1 },
            ease: 'power4.out',
            directional: false
          },
          start: 'top top',
          // base vertical scrolling on how wide the container is so it feels more natural
          end: () => `${Math.min(window.innerWidth, 1000) * projects.length}px`,
          onUpdate({ progress, getVelocity }) {
            // Vertically crop the project images based on scroll velocity
            // Faster scroll ==> more cropping
            const clamp = gsap.utils.clamp(0, 100)
            // Add negative offset so small scroll speeds don't affect cropping (which can be somewhat jarring)
            const scrollSpeed = (Math.abs(getVelocity()) / 8000) - 0.1
            const padding = clamp(scrollSpeed * 100)
            if(padding > paddingProxy.padding) {
              paddingProxy.padding = padding
              gsap.to(paddingProxy, {
                padding: 0,
                duration: 1,
                ease: 'power4.out',
                overwrite: true,
                onUpdate() {
                  setPaddingTop(paddingProxy.padding)
                  setPaddingBottom(paddingProxy.padding)
                }
              })
            }

            // Update button locations based on progress
            // Keeps currently selected button in the center of the screen
            const buttonWidth = 120
            const containerWidth = document.querySelector('.project-buttons')!.getBoundingClientRect().width
            const endPosition = -1 * (containerWidth - buttonWidth)
            buttonsTo(progress * endPosition)

            // Mark a project as selected when the scroll velocity is low enough and
            // the project is roughly in the center of the page
            // Velocity check makes sure projects don't get selected as a user scrolls quickly by them
            // or clicks a button that skips over a project
            if(Math.abs(getVelocity()) > 100) return
            const selected = projects.findIndex((_, index) => {
              const ACCEPTABLE_RANGE = 0.1
              const progressIfSelected = index / (projects.length - 1)
              return progress >= progressIfSelected - ACCEPTABLE_RANGE && progress <= progressIfSelected + ACCEPTABLE_RANGE
            })
            if(selectedProject !== selected) {
              selectedProject = selected
            }
          }
        }
      })

      gsap.utils.toArray<HTMLElement>('.project-buttons__button').forEach((btn, index) => {
        gsap.to(btn, {
          y: -24,
          // The button will go back to y=0 at the end of the animation
          ease: vEase,
          scrollTrigger: {
            containerAnimation: projectsTween,
            trigger: `.project-image:nth-of-type(${index + 1})`,
            // Start when the project appears from the right
            start: 'left right',
            // End when the project is fully out of frame on the left
            // The peak of the animation will then be right in the middle, when the project is fully onscreen
            end: 'right left',
            scrub: true
          }
        })
      })

      gsap.utils.toArray<HTMLElement>('.project').forEach((project, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            containerAnimation: projectsTween,
            trigger: `.project-image:nth-of-type(${index + 1})`,
            start: 'left right-=50%',
            end: 'right left+=50%',
            scrub: true
          }
        })

        gsap.set(project, { visibility: 'hidden' })
        
        tl.fromTo(project, {
          visibility: 'hidden',
          opacity: 0,
          scale: 0.5
        }, {
          visibility: 'visible',
          opacity: 1,
          scale: 1,
          ease: 'none'
        })

        tl.to(project, {
          opacity: 0,
          scale: 1.5,
          ease: 'none'
        })

        tl.set(project, { visibility: 'hidden' })
      })
    })

    const cleanup = createViewProjectFollower()

    return () => {
      cleanup()
      ctx.revert()
    }
  })

  function showViewProject() {
    showing = true
    const viewProject = document.querySelector('.view-project')!

    // cancel old timeline so that it doesn't override the new timeline we're creating
    if(currentShowViewProjectTimeline && currentShowViewProjectTimeline.isActive()) {
      currentShowViewProjectTimeline.kill()
    }

    const tl = gsap.timeline()
    tl.set(viewProject, { visibility: 'visible' })
    tl.to(viewProject, {
      scale: 1,
      duration: 0.25,
      ease: 'power4.out'
    })
    currentShowViewProjectTimeline = tl
  }

  function hideViewProject() {
    showing = false
    const viewProject = document.querySelector('.view-project')!

    // cancel old timeline so that it doesn't override the new timeline we're creating
    if(currentShowViewProjectTimeline && currentShowViewProjectTimeline.isActive()) {
      currentShowViewProjectTimeline.kill()
    }

    const tl = gsap.timeline()
    tl.to(viewProject, {
      scale: 0,
      duration: 0.25,
      ease: 'power4.out'
    })
    tl.set(viewProject, { visibility: 'hidden' })
    currentShowViewProjectTimeline = tl
  }

  function scrollToProject(n: number) {
    const { start, end } = projectsTween.scrollTrigger!
    const projectScrollSize = ((end - start) / (projects.length - 1))
    gsap.to(window, {
      ease: 'expo.inOut',
      duration: 1,
      scrollTo: {
        y: start + (projectScrollSize * n)
      }
    })
  }

  function onProjectLinkKeydown(e: KeyboardEvent) {
    function focusCurrentProjectButton() {
      document.querySelector<HTMLElement>(`.project-buttons__button:nth-of-type(${selectedProject + 1})`)?.focus()
    }
    if((e.key === 'Tab' && !e.shiftKey) || e.key === 'ArrowDown') {
      e.preventDefault();
      focusCurrentProjectButton()
    }
  }

  function onButtonGroupKeydown(e: KeyboardEvent) {
    if(e.key === 'ArrowUp') {
      e.preventDefault();
      document.querySelector<HTMLElement>('.project--selected .project__link')?.focus()
    }
  }

  function onButtonFocus(index: number) {
    scrollToProject(index);
    // Stop container from scrolling on focus (which breaks the view of the projects)
    (document.querySelector('.projects') as HTMLElement).scrollLeft = 0
  }
</script>

<div class='view-project' aria-hidden='true'>
  <span>View project</span>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8075 9.82182L7.90554 17.7237C7.70519 17.9241 7.46949 18.024 7.19843 18.0236C6.92737 18.0231 6.69167 17.9231 6.49133 17.7237C6.29098 17.5243 6.1908 17.2884 6.1908 17.0159C6.1908 16.7435 6.29098 16.508 6.49133 16.3095L14.3932 8.40761L7.4636 8.40761C7.18075 8.40761 6.94788 8.3105 6.76498 8.11628C6.58207 7.92206 6.49085 7.6833 6.49133 7.39998C6.50311 7.12893 6.60046 6.89629 6.78336 6.70207C6.96627 6.50785 7.1989 6.41051 7.48128 6.41003H16.8151C16.9565 6.41003 17.0833 6.43643 17.1955 6.48923C17.3077 6.54203 17.4107 6.6158 17.5045 6.71055C17.5983 6.80531 17.6721 6.90831 17.7258 7.01956C17.7796 7.13081 17.806 7.25762 17.805 7.39998L17.805 16.7338C17.805 16.9931 17.7079 17.2198 17.5137 17.414C17.3195 17.6082 17.0866 17.7115 16.8151 17.7237C16.5322 17.7237 16.2935 17.6264 16.0988 17.4317C15.9041 17.237 15.807 16.9985 15.8075 16.7161L15.8075 9.82182Z" fill="#182A1F"/>
  </svg>      
</div>
<section 
  class='projects'
  aria-live='polite'
  aria-roledescription='carousel'
  aria-label='Projects'>
  {#each projects as { imgSrc, name }}
    <div class='project-image'>
      <div class='project-image__padding-box'>
        <img
          class='project-image__image'
          src={`images/homepage/project-covers/${imgSrc}`}
          alt={name}>
      </div>
    </div>
  {/each}
  {#each projects as { name, description, skills, slug }, index}
    <div
      class={createClasses({
        'project': true,
        'project--selected': index === selectedProject
      })}
      role='group'
      aria-labelledby={`project__title--${name}`}
      aria-roledescription='slide'>
      <a
        class='project__link'
        aria-label='View project'
        href={`/project/${slug}`}
        onkeydown={onProjectLinkKeydown}>
        <h1
          class='project__title'
          id={`project__title--${name}`}>
          {name}
        </h1>
        <p
          class='project__description'>
          {description}
        </p>
        <ul class='project__skills'>
          {#each skills.slice(0, 4) as skill}
            <li class='skill'>{skill}</li>
          {/each}
          {#if skills.length > 4}
            <span class='skill'>+{skills.length - 4}</span>
          {/if}
        </ul>
      </a>
    </div>
  {/each}
  <div
    class='project-buttons'
    role='tablist'
    tabindex="-1"
    onkeydown={onButtonGroupKeydown}>
    {#each projects as { name, imgSrc }, i}
      <button
        class='project-buttons__button'
        role='tab'
        aria-label={name}
        aria-selected={selectedProject === i}
        onfocus={() => onButtonFocus(i)}>
        <img
          src={`images/homepage/project-covers/${imgSrc}`}
          alt={name}
          class='button-image'>
      </button>
    {/each}
  </div>
</section>

<style lang="scss">
  @import '$scss/mixins';

  .view-project {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: $accent-light;
    padding-inline: 10px;
    height: 32px;
    border-radius: 999px;
    font-size: $font-size-8;
    text-transform: lowercase;
    @include h-gap(8px);
    align-items: center;
    pointer-events: none;
    display: none;

    @media (pointer: fine) {
      display: flex;
    }

    svg {
      @include force-size(1.25rem, 1.25rem);
    }
  }

  .projects {
    --button-width: 120px;
    --button-height: calc(9 / 16 * var(--button-width));
    --button-bottom-padding: 24px;
    --selected-button-offset: 24px;

    margin-top: 200px;
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;

    .project {
      position: absolute;
      z-index: 1;
      inset: 0;

      &__link {
        height: 100%;
        width: 100%;
        // Place project info above buttons
        padding-bottom: calc(16px + var(--button-bottom-padding) + var(--selected-button-offset) + var(--button-height));
        padding-left: 24px;
        justify-content: flex-end;
        @include v-gap(0px);

        &:focus-visible {
          outline: none;
          
          .project__title,
          .project__description {
            text-decoration: underline;
          }
        }

      }

      &__title {
        font-size: $font-size-24;
        text-transform: lowercase;

        @media screen and (min-width: $screen-md) {
          font-size: $font-size-40;
        }
      }

      &__description {
        width: 100%;
        max-width: 340px;
        color: $black;
      }

      &__skills {
        @include h-gap(8px);
        flex-wrap: wrap;
        margin: 6px 0 0 0;
        padding: 0;

        .skill {
          display: block;
          font-size: $font-size-6;
          color: $black;
        }
      }
    }

    .project-image {
      @include force-size(100vw, 100%);
      padding: clamp(24px, 7.5%, 80px);

      &__padding-box {
        width: 100%;
        height: 100%;
      }
      
      &__image {
        background-color: $gray-1;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        object-fit: cover;
      }
    }

    .project-buttons {
      position: absolute;
      z-index: 2;
      bottom: var(--button-bottom-padding);
      left: calc(50% - (var(--button-width) / 2));
      @include h-gap(12px);

      &__button {
        white-space: nowrap;
        width: var(--button-width);
        aspect-ratio: 16 / 9;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        &:focus-visible {
          outline: 2px solid $black;
        }

        .button-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>