<template>
  <div> 
    <div class="error_message" v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul style="color: red">
	<li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <span class="form">
      <label>Name</label>
    </span>
    <span class="form">
      <input type="text" v-model="input.name">
    </span>
    <span class="form">
      <label>Manager</label> <input type="text" v-model="input.manager">
    </span>
    <button @click="multipleHandler">Add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      input: {
	name: null,
	manager: null,
      }
    }
  },
  methods: {
    multipleHandler() {
      if(this.checkForm()) {
	this.add()
      }
    },
    add() {
      this.$store.commit("add", this.input)
      this.input.name = null;
      this.input.manager = null;
    },
    checkForm() {
      this.errors = [];
      if (this.input.name && this.input.manager) {
	return true;
      }
      if (!this.input.name) {
	this.errors.push('Task name required.');
      }
      if (!this.input.manager) {
	this.errors.push('Manager required.');
      }
    }
  }
}
</script>

<style scoped>
.form {
  margin-right: 5px;
}
.error_message {
  border: red 4px solid;
  padding: 5px;
  margin-bottom: 5px;
}
</style>
