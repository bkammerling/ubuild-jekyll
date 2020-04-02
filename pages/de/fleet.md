---
layout: blocks
title: Fleet | Wunder Mobility
date: 2019-01-08 23:00:00 +0000
permalink: "/de/fleet"
lang: de
lang-ref: fleet
component_scripts:
- animatedHeadline.js
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-de
  sub_logo: "/uploads/global/Wunder_Fleet_White.svg"
  cta:
    url: "#section-contact"
    button_text: Kontakt
- template: hero-banner-w-image
  block: hero-2
  headline: <div class="cd-headline push">Eine <strong>all-in-one</strong> sharing-plattform für <span class="cd-words-wrapper"><b class="is-visible">autos</b><b>e-scooter</b><b>fahrräder</b><b>roller</b></span>
  cta:
    button_text: Kontakt
    url: "#section-contact"
    enabled: true
  cta_2:
    url: "#main-video"
    button_text: Fleet Film Sehen
    enabled: true
  background_video: fleet_loop
  show_logos: true
  background_image: "/uploads/global/fleet-frame.jpg"
- block: fleet-main
  template: static-file
  subdirectory: static/de
- template: detail-content
  block: contact-form
  title: Let's Talk
  content: Wir antworten innerhalb der nächsten 24 Stunden
  headline: Let's Talk
  subdirectory: de
  background_image: "/uploads/2019/02/05/skyline-bg@2x.jpg"
- block: custom-html
  content: "</main>"
- template: simple-footer
  block: footer-1


---
