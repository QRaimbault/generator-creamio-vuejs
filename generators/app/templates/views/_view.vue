<template>
</template>

<script>
  <% if (true === createStyle) { %>import '../scss/views/<%= name %>.scss';<% } %>
  
  export default {
    name: '<%= name %>',
    components: {},
    data () {
      return {};
    },
    created () {

    }
  }
</script>