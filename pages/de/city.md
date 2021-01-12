---
layout: blocks
title: Wunder City | Stärkung der Städte auf der ganzen Welt
date: 2020-01-11 23:00:00 +0000
permalink: "/de/city"
version: hp
lang: de
lang-ref: city
published: true
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-de
  cta:
    url: "#section-contact"
    button_text: Kontakt
    enabled: true
- template: hero-banner-center
  block: hero-hp
  sub_logo: "/uploads/global/wunder-city-white.svg"
  headline: Stärkung der Städte auf der ganzen Welt
  cta:
    button_text: Mehr
    url: "#section-challenges"
    enabled: false
  cta_2:  
    button_text: Kontakt
    url: "#section-contact"
    enabled: false
  background_video: city/city-drone-loop_compressed
  background_image: "/uploads/global/city/city-firstframe.jpg"
- block: city-main
  subdirectory: static/de
  template: static-file
- template: detail-content
  block: contact-form
  title: Schreiben Sie uns
  content: Lassen Sie uns unsere Städte noch intelligenter machen! Schicken Sie uns ein paar Informationen und wir melden uns in den nächsten 24 Stunden bei Ihnen.
  subdirectory: de
- template: simple-footer
  block: footer-1

---
