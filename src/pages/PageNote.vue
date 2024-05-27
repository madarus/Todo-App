<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLocalNotes } from "src/helper";
import NoteContainer from "src/components/NoteContainer.vue";

export default {
  components: { NoteContainer },
  name: "PageNote",
  setup() {
    const notes = useLocalNotes();
    const route = useRoute();
    const noteId = computed(() => parseInt(route.params.id));
    const note = computed(() => notes.value[noteId.value]);

    const router = useRouter();
    const remove = () => {
      notes.value.splice(noteId.value, 1);
      router.push("/");
    };

    const editing = ref(false);

    const addTodo = () => {
      note.value.todos.push({ text: "", done: false });
    };

    const removeTodo = (index) => {
      note.value.todos.splice(index, 1);
    };

    return { note, editing, remove, addTodo, removeTodo };
  },
};
</script>

<template>
  <q-page padding>
    <NoteContainer>
      <div v-if="editing">
        <form @submit.prevent="editing = false">
          <q-input v-model="note.title" label="Title" filled />
          <q-input
            v-model="note.description"
            label="Description"
            filled
            class="q-mt-sm"
            dense
          />

          <div class="q-mt-sm">
            <h5>Todo List</h5>
            <q-btn flat label="Add Todo" icon="add" @click="addTodo" />
            <div
              v-for="(todo, index) in note.todos"
              :key="index"
              class="q-mt-sm"
            >
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
            <q-btn class="q-ml-sm" color="positive" type="submit"> Done </q-btn>
          </div>
        </form>
      </div>

      <div v-else>
        <div class="row items-center justify-between">
          <h3 class="q-mb-md q-mt-md">{{ note.title }}</h3>
          <div>
            <q-btn
              round
              color="secondary"
              icon="edit"
              @click="editing = true"
            />
            <q-btn
              class="q-ml-sm"
              round
              color="red"
              icon="delete"
              @click="remove"
            />
          </div>
        </div>
        <div>{{ note.description }}</div>
        <div class="q-mt-md">
          <h5>Todo List</h5>
          <div v-for="(todo, index) in note.todos" :key="index" class="q-mt-sm">
            <q-item>
              <q-item-section>
                <q-checkbox v-model="todo.done" />
              </q-item-section>
              <q-item-section>{{ todo.text }}</q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </NoteContainer>
  </q-page>
</template>
