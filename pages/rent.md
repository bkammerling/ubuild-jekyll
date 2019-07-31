---
layout: blocks
title: Rent
date: 2019-07-28 23:00:00 +0000
permalink: "/rent"
lang: en
lang-ref: rent
page_sections:
- template: navigation-header-w-button
  block: header-2
  menu: wunder-main
  sub_logo: "/uploads/global/wunder-rent-white.svg"
  cta:
    url: "#section-contact"
    button_text: Contact
- template: hero-banner-w-image
  block: hero-2
  headline: Software that drives <strong>your rental services</strong> forward
  cta:
    button_text: Contact Us
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
  subdirectory: static
- template: detail-content
  block: contact-form
  title: Let's Talk
  content: We'll get your new rental operations up and running in no time! Send over some info and
    we'll get in touch in the next 24h.
  headline: Let's Talk
  background_image: "/uploads/2019/02/05/skyline-bg@2x.jpg"
- block: custom-html
  content: "</main>"
- template: simple-footer
  block: footer-1
menu:
  wunder-main:
    weight: 5
    parent: solutions
    identifier: rent

---
