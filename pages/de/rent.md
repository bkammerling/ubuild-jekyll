---
layout: blocks
title: Wunder Rent | Fahrzeugvermietung im digitalen Zeitalter
description: "Digitalisieren Sie Ihr Unternehmen: Online-Fahrzeugvermietung und eine Vielfalt von Features machen es möglich."
date: 2019-07-28T23:00:00.000+00:00
permalink: "/de/rent"
lang: de
lang-ref: rent
share_image: "/uploads/global/rent-shareimage.jpg"
version: hp
published: true
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-de
  cta:
    url: "#section-contact"
    button_text: Demo anfordern
    enabled: true
- template: hero-banner-w-image
  block: hero-hp
  headline: Fahrzeugvermietung im digitalen Zeitalter
  sub_logo: "/uploads/global/wunder-rent-white.svg"
  cta:
    button_text: Film ansehen
    url: "https://vimeo.com/361066939"
    enabled: true
  cta_2:
    url: "#"
    button_text:
    enabled: false
  background_video: rent-loop
  show_logos: false
  background_image: "/uploads/global/rent-herobg@2x.jpg"
- block: rent-main
  template: static-file
  subdirectory: static/de
- template: detail-content
  block: contact-form
  title: Demo anfordern
  content: Schicken Sie uns Infos, und wir werden uns in den nächsten 24 Stunden mit Ihnen in Verbindung setzen.
  subdirectory: de
  background_image: ''
- template: simple-footer
  block: footer-1
menu:
  wunder-main:
    weight: 8
    parent: solutions
    identifier: rent

---
