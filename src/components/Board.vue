<template>
  <div>
    <template v-if="isTitleEdit">
      <input class="title_form" ref="focusForm" :value="propsForBoard.title" @blur="changeTitle($event.target.value); isTitleEdit = false">
    </template>
    <template v-else style="display: flex;">
      <div @click="titleFocus();" style="display: flex">
	<div class="title">{{ propsForBoard.title }}</div><div class="counter">{{ propsForBoard.length }}</div>
      </div>
    </template>
    <draggable tag="ul">
      <transition-group name="fade">
	<li class="board" v-for="(card, card_index) in propsForBoard.cards" :key="card.id">
	  <template v-for="(form, form_index) in [card.name, card.manager]">
	    <template v-if="isFormEdit == form_index && isCardEdit == card_index">
	      <input 
		ref="focusTarget" 
		:value="form" 
		@blur="clear(); update(card_index, form_index, $event.target.value)"
	      >
	    </template>
	    <template v-else>
	      <div @click="formFocus(card_index, form_index)">{{form}}</div>
	    </template>
	  </template>
	  <hr>
	  <button @click="left(card_index)">&lt;</button>
	  <button @click="right(card_index)">&gt;</button>
	  <button class="form_button" @click="remove(card_index)">remove</button>
	</li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      isTitleEdit: false,
      isCardEdit: null,
      isFormEdit: null,
    }
  },
  components: {
    'draggable': draggable,
  },
  props: ["propsForBoard"],
  methods: {
    clear() {
      this.isCardEdit = null;
      this.isFormEdit = null;
    },
    titleFocus() {
      this.isTitleEdit = true;
      setTimeout(this.focusInput, 10);
    },
    formFocus(card_index, form_index) {
      this.isCardEdit = card_index;
      this.isFormEdit = form_index;
      setTimeout(this.focus, 10)
    },
    focus() {
      this.$refs.focusTarget[0].focus();
    },
    focusInput() {
      this.$refs.focusForm.focus();
    },
    changeTitle(input) {
      input = [input, this.propsForBoard.board_id]
      this.$store.commit("changeTitle", input);
    },
    right(index) {
      if(this.propsForBoard.board_id == 0) {
	this.$store.commit("not_started_to_in_progress", index);
      }
      else if(this.propsForBoard.board_id == 1) {
	this.$store.commit("in_progress_to_completed", index);
      }
    },
    left(index) {
      if(this.propsForBoard.board_id == 1) {
	this.$store.commit("in_progress_to_not_started", index);
      }
      else if(this.propsForBoard.board_id == 2) {
	this.$store.commit("completed_to_in_progress", index);
      }
    },
    remove(index) {
      var input = {
	index,
	board_id: this.propsForBoard.board_id
      }
      this.$store.commit('remove', input);
    },
    update(card_index, form_index, value) {
      var input = {
	board_id: this.propsForBoard.board_id,
	card_index,
	form_index,
	value,
      }
      this.$store.commit("update_form", input)
    }
  }
}
</script>


<style scoped>
.board {
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 5px;
}
.board:not(:last-child) {
  margin-bottom: 10px;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.form_button {float: right;}
.title_form {
  height: 20px;
  font-size: 18px;
  margin-bottom: 7px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.counter {
  width: 25px;
  height: 100%;
  background-color: black;
  border-radius: 5px;
  color: white;
  text-align: center;
  padding: 2px;
  margin-left: 5px;
}
input {
  outline: none;
  border: none;
}
</style>
