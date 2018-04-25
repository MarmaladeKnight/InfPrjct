var classList = new Vue({
    el: '#classList',
    data: {
        posts: []
    },
    methods: {
        getPostsViaREST: function() {
            axios.get("https://jsonplaceholder.typicode.com/posts")
                .then(response => {
                    this.posts = response.data
                })
        }
    },
    beforeMount() {
        this.getPostsViaREST()
    }
})