<script>
import NoteContainer from "src/components/NoteContainer.vue";
import { defineComponent, reactive } from "vue";
import { useLocalNotes } from "src/helper";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { NoteContainer },
  name: "PageNew",
  setup() {
    const router = useRouter();
    const notes = useLocalNotes();

    const note = reactive({
      title: "",
      description: "",
      todos: [],
    });

    const addTodo = () => {
      note.todos.push({ text: "", done: false });
    };

    const removeTodo = (index) => {
      note.todos.splice(index, 1);
    };

    const submit = () => {
      notes.value.unshift({
        ...note,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      router.push("/");

      note.title = "";
      note.description = "";
      note.todos = [];
    };

    return { note, addTodo, removeTodo, submit };
  },
});
</script>

<template>
  <q-page padding>
    <NoteContainer>
      <h3>New Note</h3>
      <form @submit.prevent="submit">
        <q-input class="q-mt-sm" outlined v-model="note.title" label="Title" />
        <q-input
          class="q-mt-sm"
          outlined
          v-model="note.description"
          label="Description"
          dense
        />

        <div class="q-mt-sm">
          <h5>Todo List</h5>
          <q-btn flat label="Add Todo" icon="add" @click="addTodo" />
          <div v-for="(todo, index) in note.todos" :key="index" class="q-mt-sm">
            <q-input v-model="todo.text" label="Todo" />
            <q-checkbox v-model="todo.done" label="Done" />
            <q-btn
              flat
              color="negative"
              icon="delete"
              @click="removeTodo(index)"
            />
          </div>
        </div>

        <div class="q-mt-md">
          <q-btn color="grey" to="/" type="reset">Cancel</q-btn>
          <q-btn class="q-ml-sm" color="positive" type="submit"> Create </q-btn>
        </div>
      </form>
    </NoteContainer>
  </q-page>
</template>
