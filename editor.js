var editorTextArea = document.getElementById("editor");

var myCodeMirror = CodeMirror.fromTextArea(editorTextArea, {
    mode:  "python",
    lineNumbers: true
});

myCodeMirror.setValue("print(\"hello!\")\n");

new Vue({
    el:"#app",
    data:{
        result: "test",
    },
    methods: {
        submit: function(){
            const vm = this;
            const cmValue = myCodeMirror.getValue()
            // console.log(cmValue)
            // axios.get("http://localhost:8000").then( function(response){
            //     vm.result = response.data;
            //     console.log(response.data);
            // })
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
        }
   }
})