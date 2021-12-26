<template>
  <div class="all_wrap">
    <Form></Form>
    <hr>
    <div>
      <ul class="box_wrap">
	<li v-for="attribute in attributes" class="wrap" :class="[attribute.bg]">
	  <Board :props-for-board="attribute"></Board>
	</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Form from './components/Form.vue';
import Board from './components/Board.vue';

export default {
  data() {
    return {
      items: [
	{
	  no: 1,
	  name: 'name1'
	},
	{
	  no: 2,
	  name: 'name2'
	}
      ]
    }
  },
  components: {
    Form, 
    Board,
  },
  computed: {
    attributes() {
      return [
	{
	  title: this.$store.state.titles[0],
	  length: this.$store.state.card.not_started.length,
	  board_id: '0',
	  cards: this.$store.state.card.not_started,
	  wrap: 'wrap',
	  bg: 'left'
	},
	{
	  title: this.$store.state.titles[1],
	  length: this.$store.state.card.in_progress.length,
	  board_id: '1',
	  cards: this.$store.state.card.in_progress,
	  bg: 'center'
	},
	{
	  title: this.$store.state.titles[2],
	  length: this.$store.state.card.completed.length,
	  board_id: '2',
	  cards: this.$store.state.card.completed,
	  bg: 'right'
	}
      ]
    }
  }
}
</script>

<style>
.all_wrap {
  width: 1000px;
  background-color: white;
  margin: auto;
  color: black;
}
.box_wrap {
  display: flex
}
.wrap {
  width: calc(100% / 3);
  background-color: gray;
  padding: 15px;
}
.left {background-color: #ed8077;}
.center {background-color: #4488c5}
.right {background-color: #5eb5a6}
ul {
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}
</style>
