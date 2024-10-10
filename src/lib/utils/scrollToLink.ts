import gsap from 'gsap'

export default function scrollToLink(e: MouseEvent, link: string) {
	e.preventDefault()

	const newURL = new URL(window.location.href)
	newURL.hash = link
	history.pushState({}, '', newURL)

	gsap.to(window, {
		scrollTo: {
			y: link
		},
		ease: 'expo.out',
		duration: 1
	})
}
