module.exports = {
  siteMetadata: {
    title: 'Motivus',
    description: 'High performance computing network',
    author: 'Motivus',
    url: 'motivus.cl',
    siteUrl: 'https://www.motivus.cl',
  },
  flags: {
    PARALLEL_QUERY_RUNNING: true,
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-lodash',
    'gatsby-transformer-sharp', // Needed for dynamic images

    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-187016068-1',
        head: true,
        anonymize: true,
        respectDNT: true,
        pageTransitionDelay: 0,
        cookieDomain: 'motivus.cl',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        disableAutoprefixing: true,
      },
    },

    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '2g00hyzc',
        dataset: 'production',
        token:
          'skx93MUXy48sfHbTaOiWStQdR0iPjpjjmyDcGY73LMcdx2BrO001HimUleAC9oPvBUZbOmxbdslrBkWef4MEKyRp5N5ySywYX3FbGtNXXxY22tSTFtWb9ySwdlI4qBsOqRrA5fANaekcTzHwsCu8Fvv0JMqBd1IvaNNxD0bAoQqfnL0EenbP',
      },
    },
    /*{
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: 'http://localhost:1337',
        contentTypes: [ // List of the Content Types you want to be able to request from Gatsby.
          'article',
          'user',
          'human'
        ],
        queryLimit: 1000,
      },
    },*/

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/motivus-icon.png', // This path is relative to the root of the site.
      },
    },
  ],
}
