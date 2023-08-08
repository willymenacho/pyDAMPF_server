/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

export const wrapRootElement = ({ element }) => {
  if (!window.Motivus.gaTrackEvent) {
    window.Motivus.gaTrackEvent = trackCustomEvent
  }
  return element
}

export const onClientEntry = () => {
  if (!/^\/account\//.test(window.location.pathname)) {
    const element = document.getElementById('static-loading')
    if (element) {
      element.className = 'hidden-static-loading'
    }
  }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  const newPathname = location.pathname

  if (!/^\/account\//.test(newPathname)) {
    const element = document.getElementById('static-loading')
    if (element) {
      element.className = 'hidden-static-loading'
    }
  }
}
