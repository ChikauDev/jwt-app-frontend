<template>
    <div class="container">
        <h2>Update topic Title</h2>

        <form @submit.prevent="update">
            <div class="form-group mt-5">
                <input type="text" class="fm-control" v-model="topic.title">
                <small v-if="errors.title" class="form-text text-danger">{{errors.title[0]}}</small>
            </div>
            <button class="btn btn-outline-success">Update</button>
        </form>
        <p class="mt-5 btn btn-outline-warning">
            <nuxt-link to="/topics">Back to topics</nuxt-link>
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            topic: {
                title: ''
            }
        }
    },
    async asyncData({$axios, params}){
        console.log('loaded')
        const {data} = await $axios.$get(`/topics/${params.id}`)
        return {topic: data}
    },
    methods: {
        async update(){
            try{
                await this.$axios.patch(`/topics/${this.$route.params.id}`,{
                    title: this.topic.title
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