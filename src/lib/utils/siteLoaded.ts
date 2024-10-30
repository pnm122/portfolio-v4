export function isSiteLoaded() {
	return document.body.getAttribute('data-loaded') === 'true'
}

export function setSiteLoaded(val: boolean) {
	document.body.setAttribute('data-loaded', val.toString())
}
