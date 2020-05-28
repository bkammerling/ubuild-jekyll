---
layout: blocks
title: Wunder Vehicles | Get your sharing-ready electric vehicles
date: '2020-05-08T22:00:00.000+00:00'
description: Build your dream fleet of sharing-ready electric bikes, scooters and
  mopeds with Wunder Vehicles. The future of mobility has arrived.
permalink: "/vehicles"
version: hp
lang: en
lang-ref: vehicles
component_scripts:
- wunderCommerce.js
- clientCarousel.js
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-main
  sub_logo: ''
  cta:
    url: "#section-contact"
    button_text: Contact
    enabled: true
- template: hero-banner-w-image
  block: hero-hp
  headline: The future of mobility has arrived.
  sub_logo: "/uploads/global/wunder-vehicles-white.svg"
  cta:
    button_text: ''
    url: ''
    enabled: false
  cta_2:
    enabled: false
    url: ''
    button_text: ''
  background_video: vehicles-loop
  show_logos: false
  logo_row: ''
  background_image: "/uploads/global/fleet-frame.jpg"
  intro_text: ''
- block: vehicles-main
  template: static-file
  subdirectory: static
- template: detail-content
  block: contact-form
  title: Your new fleet awaits
  content: Send over some info and we'll get in touch in the next 24 hours.
  background_image: ''
  headline: ''
- template: simple-footer
  block: footer-1
  content: ''
  hide_menu: false
  show_poweredby: false
share_image: "/uploads/2020/05/28/social_share_image_vehicles.jpg"
menu:
  wunder-main:
    weight: 7
    parent: solutions
    identifier: vehicles

---
