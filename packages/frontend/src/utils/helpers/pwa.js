const fs = require('fs')
const path = require('path')
// utility functions copied from lib/data.js since you can't import it
function readJsonFile(dataFile) {
  let json = fs.readFileSync(dataFile, { encoding: 'utf8' })
  return JSON.parse(json)
}

function getPageJSONPath(buildId, pageRoute) {
  return path.posix.join('/_next/data/', buildId, `${pageRoute}.json`)
}

function getJSONEntry(buildId, pageRoute) {
  return {
    url: getPageJSONPath(buildId, pageRoute),
    revision: null,
  }
}

function getHTMLEntry(buildId, pageRoute) {
  return {
    url: pageRoute,
    revision: buildId,
  }
}

function getNormalPageEntries(buildId, page) {
  let entries = []
  if (page.precacheHtml) {
    entries.push(getHTMLEntry(buildId, page.route))
  }
  if (page.precacheJson) {
    entries.push(getJSONEntry(buildId, page.route))
  }
  return entries
}

function getDynamicPageEntries(buildId, page) {
  let pageList = page.dynamicPages.map(actualPage =>
    path.posix.join(page.route, actualPage)
  )
  let entries = pageList.map(route =>
    getNormalPageEntries(buildId, {
      route: route,
      precacheHtml: page.precacheHtml,
      precacheJson: page.precacheJson,
    })
  )
  return entries.reduce((acc, curr) => acc.concat(curr), [])
}
function getPageEntries(buildId, page) {
  if (Array.isArray(page.dynamicPages)) {
    return getDynamicPageEntries(buildId, page)
  } else {
    return getNormalPageEntries(buildId, page)
  }
}

function getGeneratedPreCacheEntries(buildId, pages) {
  if (typeof buildId !== 'string') {
    console.error(
      'getGeneratedPreCacheEntries: buildId should be a string',
      buildId
    )
    return
  } else if (buildId === '') {
    console.error(
      'getGeneratedPreCacheEntries: buildId cannot be an empty string'
    )
    return
  }

  return pages
    .map(page => getPageEntries(buildId, page))
    .reduce((acc, curr) => acc.concat(curr), [])
}

module.exports = getGeneratedPreCacheEntries
