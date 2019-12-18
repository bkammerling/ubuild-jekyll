---
layout: blocks
title: Wunder Rent | Digitalice sus operaciones de alquiler
date: 2019-07-28T23:00:00.000+00:00
permalink: "/es/rent"
lang: es
lang-ref: rent
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-es
  sub_logo: "/uploads/global/wunder-rent-white.svg"
  cta:
    url: "#section-contact"
    button_text: Contacto
- template: hero-banner-w-image
  block: hero-2
  headline: Tecnología que impulsa sus <strong>servicios de alquiler</strong>
  cta:
    button_text: Contáctenos
    url: "#section-contact"
    enabled: true
  cta_2:
    url: "#"
    button_text:
    enabled: false
  background_video:
  show_logos: true
  background_image: "/uploads/global/rent-bg@2x.jpg"
- block: rent-main
  subdirectory: static/es
  template: static-file
- template: detail-content
  block: contact-form
  subdirectory: es
  title: Hablemos
  content: ¡Pondremos en funcionamiento sus nuevas operaciones de alquiler en poco tiempo! Envíenos los siguientes datos y nos pondremos en contacto con usted en las próximas 24 horas.
  headline: Let's Talk
  background_image: "/uploads/2019/02/05/skyline-bg@2x.jpg"
- block: custom-html
  content: "</main>"
- template: simple-footer
  block: footer-1
menu:
  wunder-main:
    weight: 8
    parent: solutions
    identifier: rent

---
