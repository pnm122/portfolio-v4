export default function popInAnimation(options?: gsap.TweenVars): [gsap.TweenVars, gsap.TweenVars] {
  return [{
    scale: 0
  }, {
    scale: 1,
    ease: 'power4.out',
    duration: 0.25,
    ...options
  }]
}