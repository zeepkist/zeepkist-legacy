import { createReadStream } from 'node:fs'

import {
  lineSeparatedURLsToSitemapOptions,
  simpleSitemapAndIndex
} from 'sitemap'
import streamToArray from 'stream-to-array'

const urls = lineSeparatedURLsToSitemapOptions(
  createReadStream('./scripts/urls.txt')
)

await simpleSitemapAndIndex({
  hostname: 'https://zeepki.st',
  destinationDir: './public',
  sourceData: [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/adventure', changefreq: 'monthly', priority: 0.8 },
    { url: '/levels', changefreq: 'daily', priority: 0.8 },
    { url: '/users', changefreq: 'daily', priority: 0.8 },
    { url: '/super-league', changefreq: 'monthly', priority: 0.8 },
    { url: '/super-league/season-1', changefreq: 'monthly', priority: 0.8 },
    {
      url: '/super-league/season-1/2022-12-04',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/super-league/season-1/2023-01-08',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/super-league/season-1/2023-01-29',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/super-league/season-1/2023-02-26',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/super-league/season-1/2023-03-26',
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/super-league/season-1/2023-04-23',
      changefreq: 'monthly',
      priority: 0.8
    },
    ...(await streamToArray(urls))
  ]
})
