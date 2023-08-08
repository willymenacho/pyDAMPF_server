/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <React.Fragment key='widget-motivus'>
      <script src='https://widget.motivus.cl/loader.js' async></script>
      <script
        dangerouslySetInnerHTML={{
          __html:
            'var Motivus = window.Motivus || {}; Motivus.client_id = \'1234\';',
        }}
      ></script>
    </React.Fragment>,
  ])
}
