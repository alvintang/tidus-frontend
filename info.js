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
            var textId = this.$route.params.id;
            var url = "http://localhost:8000/data/info/"+textId+"/";
            // console.log(url);
            axios.get(url).then( function(response){
                vm.text = response.data['message'];
            })
          return marked(vm.text, { sanitize: true });
        }
      },
    methods: {    
    }
})