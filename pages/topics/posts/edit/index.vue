<template>
    <div class="container">
        <h2>Update Post</h2>

        <form @submit.prevent="update">
            <div class="form-group mt-5">
                <textarea rows="5" type="text" class="form-control" v-model="post.body"></textarea>
                <small v-if="errors.body" class="form-text text-danger">{{errors.body[0]}}</small>
            </div>
            <button class="btn btn-outline-success">Update</button>
        </form>
        <p class="mt-5 btn btn-outline-warning">
            <nuxt-link to="/posts">Back to posts</nuxt-link>
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            post: {
                body: ''
            }
        }
    },
    async asyncData({$axios, params}){
        console.log('loaded')
        const {data} = await $axios.$get(`/posts/${params.id}/${params.body}`)
        return {post: data}
    },
    methods: {
        async update(){
            try{
                await this.$axios.patch(`/posts/${this.$route.params.id}/posts/${this.$route.params.body}`,{
                    body: this.post.body
                })

                this.$router.push('/topics')
            }
            catch(err){
                console.log(err)
            }
        }
    }
}
</script>