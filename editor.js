Vue.component('editor', {
    data: function() {
        return {
           result: "test",
           myCodeMirror: null
        }
    },
    template: '<div><textarea id="editor"></textarea>\
    <form v-on:submit.prevent>\
    <button @click="submit">Run Code</button>\
    </form>\
    <p>\
        <h3>Output</h3>\
        <pre>{{ result }}</pre>\
    </p></div>',
    mounted() {
        var editorTextArea = document.getElementById("editor");

        this.myCodeMirror = CodeMirror.fromTextArea(editorTextArea, {
            mode:  "python",
            lineNumbers: true
        });
        this.updateValue()
        // this.myCodeMirror.setValue("print(\"hello!\")\n");        
    },
    update() {
        this.updateValue()
    },
    methods: {
        submit: function(){
            const vm = this;
            const cmValue = vm.myCodeMirror.getValue()
            console.log(cmValue)
            axios({
                method: 'post',
                url: 'http://localhost:8000/run',
                headers: {
                    'content-type':'application/json'
                },
                data: {
                    code: cmValue,
                }
            }).then( response => {
                console.log(response.data);
                vm.result = response.data['message'];
            });
        },
        updateValue: function() {
            const vm = this;
            var textId = this.$route.params.id;
            var url = "http://localhost:8000/data/code/"+textId+"/";
            // console.log(url);
            axios.get(url).then( function(response){
              var text = response.data['message'];
                vm.myCodeMirror.setValue(text);
            })
        }
   }
})