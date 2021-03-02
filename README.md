# Wunder Mobility Website - based on uBuild for Forestry.io

Built as a static site with the help of [Jekyll](https://jekyllrb.com/) and `ubuild-jekyll` which is a Jekyll theme designed to work with [Forestry](https://forestry.io/), a Static Site CMS.

## Setting up the dev environment
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
## The Client page and collection:
### Where the data lives
The Client pages in both English and German utilize the `data_yml` frontmatter to determine which client testimonials/case studies are featured in the Banner and Quote carousels. 

### Layout used for client testimonials
Both english and german client collections use the `case-study.html` 

### Troubelshooting
If the carousels are not working, it is likely an issue with this line:
```
<div class="carousel-item {% if forloop.first %} active {% endif %}">
```
At the point of writing, we are looping over collections, one separate one for each language. This is because if we used a filter and integrated both languages into 1 collection, this would cause the `forloop.first` to break. Eg Blueduck is the first item, and de/Blueduck is the second item. If we looped over the collection containing both sets of languages, even if de/Blueduck is the first item in the German language, it will not be the 1st item in the collections array, and hence will not be assigned the `active` class.

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
