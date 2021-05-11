# Wunder Mobility Website - based on uBuild for Forestry.io

Built as a static site with the help of [Jekyll](https://jekyllrb.com/) and `ubuild-jekyll` which is a Jekyll theme designed to work with [Forestry](https://forestry.io/), a Static Site CMS.

## Setting up the dev environment

In your terminal,

1. Install Jekyll

```
gem install bundler jekyll
```

2. Install packages

```
bundle install
```

3. Run local server

```
bundle exec jekyll serve
```

OR,

3. Run local server with 0.0.0.0 host to run tests on forms

```
bundle exec jekyll serve --host 0.0.0.0
```

## Menus and Footer

### Updating the footer

1. In the file directory, find the `menus.yml` file:

```
- /_data
  - menus.yml
```

2. Scroll to `footer` and make edits as necessary:

```
...
footer:
- identifier: solutions
  title: Products
  col: 1
  weight: 4
  items:
  - identifier: fleet
    url: "/fleet"
    weight: 1
    title: Wunder Fleet
    parent: solutions
  - url: "/rent"
    weight: 2
    parent: solutions
    identifier: rent
    title: Wunder Rent
...
```

### Enabling CTAs on the top navbar

In the page's frontmatter, under `page_sections`

```
---
...
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: [wunder-main] OR [wunder-de]
  cta:
    url: "#id-of-section" OR "https://example.com"
    button_text: Example button text
    enabled: true
...
---
```

## The Client page and collection:

### Where the data lives

The Client pages in both English and German utilize the `data_yml` frontmatter to determine which client testimonials/case studies are featured in the Banner and Quote carousels.

### Layout used for client testimonials

Both english and german client collections use the `case-study.html`

### Jump links and offsets

Add `data-offset="[value]"` to `<a>` tags to adjust offsets. Values of 50-100 usually work.

### Troubelshooting

If the carousels are not working, it is likely an issue with this line:

```
<div class="carousel-item {% if forloop.first %} active {% endif %}">
```

At the point of writing, we are looping over collections, one separate one for each language. This is because if we used a filter and integrated both languages into 1 collection, this would cause the `forloop.first` to break. Eg Blueduck is the first item, and de/Blueduck is the second item. If we looped over the collection containing both sets of languages, even if de/Blueduck is the first item in the German language, it will not be the 1st item in the collections array, and hence will not be assigned the `active` class.

## Google Tag Manager, Google Ads, and all that fun stuff

### Google Offline Conversion Imports (GCLID)

- A `<input type="hidden" id="gclid_field" name="gclid_field" value="">` was added to all forms (that I can find)
- The example code given on [this instructional site](https://support.google.com/google-ads/answer/7012522?hl=en#:~:text=Tip%3A%20Use%20Google%20Tag%20Manager%20to%20collect%20the%20GCLID&text=Under%20%22Accounts%2C%22%20click%20the,from%20the%20drop%2Ddown%20menu.) was added to Google Tag Manager via a Custom HTML tag (Named "Google Ads Click ID Collection for Conversion Import"), to both the WunderMobility (GTM-THSMP8S) and the Wunder Marketplace (GTM-KJS2Q9H) containers.
- A tweak was added to the code to loop through all fields with the same ID (I'm sorry - should've used classes instead, probably, instead of IDs - but this was done to ensure easy maintenance... I hope). This is due to the fact that we can have more than 1 form on a page.

## JavaScript Libraries

- [Rellax](https://dixonandmoe.com/rellax/) - Parallax
- [AOS/Animate on Scroll](https://michalsnik.github.io/aos/)
- plyr.js
- Carousel

### Add it to your page front matter:

```
component_scripts:
- clientCarousel.js
- rellax.js
- rellax.min.js
```

## Environment

Git LFS is enabled in both local and Netlify deploy environments.
[Read more about LFS](https://docs.netlify.com/large-media/setup/)

## Plugins

Currently using:

- [jekyll-menus](https://github.com/forestryio/jekyll-menus) - helps us with the setup of our navigation menus
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) - automatically produces a sitemap which is being used by Google search tools
- [jekyll-minifier](https://github.com/digitalsparky/jekyll-minifier) - minifies assets to speed us up!
