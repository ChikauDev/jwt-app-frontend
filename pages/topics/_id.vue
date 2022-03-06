<template>
    <div class="container mt-5">
        <div class="bg-light mt-5 mb-5" style="padding:20px">
            <h2>{{topic.title}}</h2>
            <hr>
            <div v-for="(content,index) in topic.posts" :key="index">
                <p>{{content.body}}</p>
                <div v-if="authenticated">
                    <div v-if="user.id === content.user.id">
                        <button @click="deletePost(content.id)" class="btn btn-danger fa-solid fa-trash-can float-right"></button>
                        <nuxt-link :to="{name: 'topics-posts-edit', params: {id: $route.params.id, body:content.id}}">
                            <button class="btn btn-outline-success fa fa-edit float-right"></button>
                        </nuxt-link>
                    </div>
                </div>
                <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
            </div>
        </div>

        <div class="mt-5 ml-5 mb-5" v-if="authenticated">
            <form @submit.prevent="create">
                <div class="form-group">
                    <h4>Add a new post</h4>
                    <textarea type="text" rows="5" v-model="body" class="form-control"></textarea>
                    <small v-if="errors.body" class="form-text text-danger">{{errors.body[0]}}</small>                  
                </div>
                <button class="btn btn-outline-primary">Add a new post</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            topic: '',
            body: ''
        }
    },
    async asyncData({$axios, params}){
        const {data} = await $axios.$get(`/topics/${params.id}`)
        return {
            topic: data
        }
    },
    methods:{
        async create(){
            try{
                await this.$axios.post(`/topics/${this.$route.params.id}/posts`, {body: this.body})
                this.$router.push(`/topics/${this.$route.params.id}`)
            }
            catch(err){
                console.log(err)
            }
        },
        async deletePost(id){
            try{
                await this.$axios.$delete(`/topics/${this.$route.params.id}/posts/${id}`)
                this.$router.push('/')
            }
            catch(err){
                console.log(err)
            }
        }
    }
}
</script>