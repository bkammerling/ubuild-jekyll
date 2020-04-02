---
layout: blocks
title: Wunder Fleet | Tecnología integral para compartir coches y patinetes
date: 2019-10-18T11:00:00.000+00:00
permalink: "/es/fleet"
lang: es
lang-ref: fleet
component_scripts:
- animatedHeadline.js
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-es
  sub_logo: "/uploads/global/Wunder_Fleet_White.svg"
  cta:
    url: "#section-contact"
    button_text: Contacto
- template: hero-banner-w-image
  block: hero-2
  headline: <div class="cd-headline push">Una <strong>solución integral</strong> para compartir <span class="cd-words-wrapper"><b class="is-visible">patinetes</b><b>bicicletas</b><b>coches</b></span>
  cta:
    button_text: Contáctenos
    url: "#section-contact"
    enabled: true
  cta_2:
    url: "#main-video"
    button_text: Ver vídeo
    enabled: true
  background_video: fleet_loop
  show_logos: true
  background_image: "/uploads/global/fleet-frame.jpg"
- block: fleet-main
  subdirectory: static/es
  template: static-file
- template: detail-content
  block: contact-form
  subdirectory: es
  title: Hablemos
  content: ¡Pondremos en marcha su flota en poco tiempo! Envíenos los siguientes datos y nos pondremos en contacto con usted en las próximas 24 horas.
  headline: Let's Talk
  background_image: "/uploads/2019/02/05/skyline-bg@2x.jpg"
- block: custom-html
  content: "</main>"
- template: simple-footer
  block: footer-1
menu:
  wunder-main:
    weight: 6
    parent: solutions
    identifier: fleet

---
