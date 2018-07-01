<template>
  <div/>
</template>

<script>
  <% if (true === createStyle) { %>import './<%= name %>.scss';<% } %>
  
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