<template>
    <div class="container col-md-6 mt-5">
        <h2>Register</h2>
        <br>
        <form @submit.prevent="submit">
            <div class="form-group">
                <label>Full name</label>
                <input type="name" v-model.trim="form.name" class="form-control" id="exampleInputEmail1" placeholder="Enter name">
                <small class="form-text text-danger" v-if="errors.name">{{ errors.name[0] }}</small>
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model.trim="form.email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" autofocus>
                <small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" v-model.trim="form.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                <small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password (Confirmation)</label>
                <input type="password" v-model.trim="form.password_confirmation" class="form-control" id="exampleInputPassword1" placeholder="Password">
                <small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <br>
        <p>Already have an account ?<nuxt-link to="/login">Login</nuxt-link></p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    methods:{
        async submit(){
            try{
                await this.$axios.$post('register', this.form)
                await this.$auth.login({
                    data: {
                        email: this.form.email,
                        password: this.form.password,
                    }
                })

                // redirect
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