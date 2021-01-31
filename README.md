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

## Plugins

Currently using:
- [jekyll-menus](https://github.com/forestryio/jekyll-menus) - helps us with the setup of our navigation menus
- [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) - automatically produces a sitemap which is being used by Google search tools
- [jekyll-minifier](https://github.com/digitalsparky/jekyll-minifier) - minifies assets to speed us up!
