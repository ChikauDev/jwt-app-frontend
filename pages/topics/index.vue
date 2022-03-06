<template>
    <div class="container">
        <h2>Latest Topics</h2>
        <div v-for="(topic, index) in topics" :key="`topic-${index}`" class="bg-light mt-5 mb-5" style="padding:20px">
            <h2><nuxt-link :to="{name: 'topics-id', params: {id: topic.id}}">{{topic.title}}</nuxt-link></h2>
            
            <div v-if="authenticated">
                <div v-if="user.id === topic.user.id">
                    <nuxt-link :to="{name: 'topics-edit', params: {id: topic.id}}">
                        <button class="btn btn-success fa fa-edit fa fa-2x float-right"></button>
                    </nuxt-link>
                    <button @click="deleteTopic(topic.id)" class="btn btn-danger fa-solid fa-trash-can float-right"></button>
                </div>
            </div>

            <div v-for="(content,index) in topic.posts" :key="`content-${index}`" class="d-flex">
                {{content.body}}
                <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
                <div class="btn btn-outline-primary fa fa-thumbs-up ml-5 mb-2" @click="likePost(topic.id, content)">
                    <span class="badge">{{content.like_count}}</span>
                </div>
            </div>
        </div>

        <nav>
            <ul class="pagination justify-content-cecçnter">
                <li v-for="(key,value) in links" :key="`link-${value}`">
                    <a @click="loadMore(key)" class="page-link">{{value}}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
            topics: [],
        links: []
        }
    },
    async asyncData({$axios}){
        try{
            let {data, links} = await $axios.$get('/topics')
            console.log(data)
            return {
                topics: data,
                links
            }
        }
        catch(err){
            console.log(err)
        }
    },
    methods:{
        async loadMore(key){
            try{
                let {data} = await this.$axios.$get(key)
                return this.topics = {...this.topics, ...data};
            }
            catch(err){
                console.log(err)
            }
        },
        async deleteTopic(id){
            try{
                await this.$axios.$delete(`/topics/${id}`)
                this.$router.push('/')
            }
            catch(err){
                console.log(err)
            }
        },
        async likePost(topicId, content){
            const userFromVuex = this.$store.getters["user"]
            if(userFromVuex){
                // cannot like your own post
                if(userFromVuex.id === content.user.id){
                    alert('You cannot like your own post')
                }
                // if user have already liked
                if(content.users){
                    if(content.users.some(user => user.id === userFromVuex.id)){
                        alert('You have already liked this post')
                    }
                    else{
                        try{
                            await this.$axios.$post(`/topics/${topicId}/posts/${content.id}/likes`)
                            let {data, links} = await this.$axios.$get(`/topics`)
                            this.topics = data
                            this.links = links
                            console.log('data', data)
                            console.log('links', links)
                        }
                        catch(err){
                            console.log(err)
                        }
                    }
                }
            }
            else {
                alert('Please log in')
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style scoped>
    .content{
        border-left: 10px solid white;
        padding: 0 10px 0 10px;
    }
</style>