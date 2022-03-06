<template>
    <div class="container col-md-6 mt-5">
        <h2>Login</h2>
        <br>
        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" v-model.trim="form.email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" autofocus>
                <small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" v-model.trim="form.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                <small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <br>
        <p>Don't have an account ? <nuxt-link to="/register">Register</nuxt-link></p>
    </div>
</template>

<script>
export default {

    middleware: ['guest'],

    data(){
        return {
            form:{
                email: 'test@gmail.com',
                password: 'password',
            }
        }
    },
    methods:{
        async submit(){
            try{
                await this.$auth.login({data: this.form})
                this.$router.push({
                    path: this.$route.query.redirect || '/dashboard'
                })
            }
            catch(err){
                console.log(err)
            }
        }
    }
}
</script>