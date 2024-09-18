export default function slowRollInAnimation(
	options?: gsap.TweenVars
): [gsap.TweenVars, gsap.TweenVars] {
	return [
		{
			y: '100%'
		},
		{
			y: 0,
			stagger: 0.005,
			ease: 'expo.inOut',
			duration: 1.5,
			...options
		}
	]
}
