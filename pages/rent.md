---
layout: blocks
title: Wunder Rent | Digitalize Your Rental Operations
date: 2019-07-28T23:00:00.000+00:00
permalink: "/rent"
lang: en
lang-ref: rent
version: hp
component_scripts:
- rellax.min.js
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-main
  cta:
    url: "#section-contact"
    button_text: Contact
    enabled: true
- template: hero-banner-w-image
  block: hero-hp
  headline: Upgrade your rental services for the digital age
  sub_logo: "/uploads/global/wunder-rent-white.svg"
  cta:
    button_text: Watch how it works
    url: "https://vimeo.com/318402556"
    enabled: true
  cta_2:
    url: "#"
    button_text:
    enabled: false
  background_video:
  show_logos: false
  background_image: "/uploads/global/rent-bg@2x.jpg"
- block: rent-main
  template: static-file
  subdirectory: static
- template: detail-content
  block: contact-form
  title: Request a demo
  content: We'll get you up and running in no time! Send over
    some info and we'll get in touch in the next 24h.
  headline: Let's Talk
  background_image: ''
- template: simple-footer
  block: footer-1
menu:
  wunder-main:
    weight: 8
    parent: solutions
    identifier: rent

---
