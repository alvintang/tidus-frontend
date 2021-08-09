Vue.component('info', {
    data: function() {
        return {
           text: "# hello text!"
        }
    },
    template: '<div v-html="compiledMarkdown"></div>',
    mounted() {
    },
    computed: {
        compiledMarkdown: function() {
            const vm = this;
            axios.get("http://localhost:8000/info").then( function(response){
                vm.text = response.data['message'];
            })
          return marked(vm.text, { sanitize: true });
        }
      },
    methods: {    
    }
})