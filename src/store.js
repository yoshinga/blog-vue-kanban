import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    titles: ["Not Started", "In Progress", "Completed"],
    card: {
      not_started: [
	{
	  id: 1,
	  name: 'task1',
	  manager: 'person1',
	},
	{
	  id: 2,
	  name: 'task2',
	  manager: 'person2',
	},
      ],
      in_progress: [
	{
	  id: 3,
	  name: 'task3',
	  manager: 'person3',
	}
      ],
      completed: [
	{
	  id: 4,
	  name: 'task4',
	  manager: 'person4',
	}
      ],
    }
  },
  mutations: {
    changeTitle(state, input) {
      if(input[1] == 0) {
	state.titles.splice(0, 1, input[0])
      }
      else if (input[1] == 1) {
	state.titles.splice(1, 1, input[0])
      }
      else {
	state.titles.splice(2, 1, input[0])
      }
    },
    update_form(state, input) {
      if(input.board_id == 0) {
	if(input.form_index == 0) {
	  state.card.not_started[input.card_index].name = input.value;
	}
	else {
	  state.card.not_started[input.card_index].manager = input.value;
	}
      } 
      else if(input.board_id == 1) {
	if(input.form_index == 0) {
	  state.card.in_progress[input.card_index].name = input.value;
	}
	else {
	  state.card.in_progress[input.card_index].manager = input.value;
	}
      }
      else if(input.board_id == 2) {
	if(input.form_index == 0) {
	  state.card.completed[input.card_index].name = input.value;
	}
	else {
	  state.card.completed[input.card_index].manager = input.value;
	}
      }
    },
    add(state, input) {
      var id = state.card.not_started.length 
	+ state.card.in_progress.length
	+ state.card.completed.length
	+ 1;
      state.card.not_started.push({
	id: id,
	name: input.name,
	manager: input.manager
      })
    },
    remove(state, input) {
      if(confirm('Are you sure?')) {
	if(input.board_id == 0) {
	  state.card.not_started.splice(input.index, 1);
	}
	else if(input.board_id == 1) {
	  state.card.in_progress.splice(input.index, 1);
	}
	else if(input.board_id == 2) {
	  state.card.completed.splice(input.index, 1);
	}
      }
    },
    not_started_to_in_progress(state, index) {
      var deleted_item = state.card.not_started.splice(index, 1);
      state.card.in_progress.unshift({
	id: deleted_item[0].id,
	name: deleted_item[0].name,
	manager: deleted_item[0].manager
      })
    },
    in_progress_to_completed(state, index) {
      var deleted_item = state.card.in_progress.splice(index, 1);
      state.card.completed.unshift({
	id: deleted_item[0].id,
	name: deleted_item[0].name,
	manager: deleted_item[0].manager
      })
    },
    in_progress_to_not_started(state, index) {
      var deleted_item = state.card.in_progress.splice(index, 1);
      state.card.not_started.push({
	id: deleted_item[0].id,
	name: deleted_item[0].name,
	manager: deleted_item[0].manager
      })
    },
    completed_to_in_progress(state, index) {
      var deleted_item = state.card.completed.splice(index, 1);
      state.card.in_progress.push({
	id: deleted_item[0].id,
	name: deleted_item[0].name,
	manager: deleted_item[0].manager
      })
    }
  }
});
