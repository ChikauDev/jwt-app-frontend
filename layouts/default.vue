<template>
    <div>
      <Navbar/>
      <div class="mt-5">
        <Nuxt/>
      </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components:{
    Navbar
  }
}
</script>