import { browser } from '$app/environment'

let markSiteLoadedCallback = () => {}
let siteLoaded = new Promise<void>((res) => (markSiteLoadedCallback = res))

if (browser) {
	document.body.setAttribute('data-loaded', 'false')
}

function markSiteLoaded() {
	document.body.setAttribute('data-loaded', 'true')
	markSiteLoadedCallback()
}

function isSiteLoaded() {
	return document.body.getAttribute('data-loaded') === 'true'
}

export { markSiteLoaded, siteLoaded, isSiteLoaded }
