<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />

    <!-- AdSense placeholder: bottom bar -->
    <div id="adsense-bottom" class="hidden lg:block" aria-hidden="true" />
  </div>
</template>
