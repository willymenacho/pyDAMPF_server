const _ = require('lodash')

const transformAlgorithm = (a) => {
  //console.log(a.versions)
  const lastVersion = _.sortBy(a.versions, 'inserted_at')[
    a.versions.length - 1
  ] || {
    metadata: {},
  }
  //console.log(lastVersion, a.versions)
  const metadata = lastVersion.metadata
  return {
    ...a,
    publishDate: lastVersion.inserted_at || a.inserted_at,
    cost: a.cost,
    chargeSchema: a.charge_schema,
    stars: 0,
    image:
      'https://motivus.cl/favicon-32x32.png?v=e8b9681aacb5205f5c0c047f77d351df',
    lastVersion,
    author: metadata.author,
    abstract: metadata.short_description,
    description: metadata.short_description,
    longDescription: metadata.long_description,
    web: metadata.url,
    github: metadata.upstream_url,
    license: metadata.license,
    version: lastVersion.name,
  }
}

module.exports = {
  transformAlgorithm,
}
