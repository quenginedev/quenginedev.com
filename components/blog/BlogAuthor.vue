<template>
  <aside class="blog-author panel">
    <img :src="hero.avatar" :alt="contact.name" class="blog-author__avatar" width="64" height="64" />
    <div>
      <p class="blog-author__label label-caps">Author</p>
      <p class="blog-author__name">{{ contact.name }}</p>
      <p class="blog-author__bio">{{ contact.title }} · {{ contact.location }}</p>
    </div>
  </aside>
</template>

<script
  setup
  lang="ts"
>
  import { contact, hero } from '~/data/portfolio'
</script>