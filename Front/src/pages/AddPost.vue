<template>
  <q-page>
    <q-card
      style="background-color:#42455a; width:50%"
      class="absolute-center q-pa-md"
    >
    <q-item class="text-h5 text-white q-ml-l">
        Write a post
    </q-item>
      <q-form >
        <div class="q-pa-md">
          <q-input v-model="title" label="Post Title"></q-input>
          <q-editor
            v-model="editor"
            flat
            style="background-color:#42455a"
            class="text-white"
            :toolbar="[
              ['bold', 'italic', 'underline'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                }
              ]
            ]"
          />
          <q-file
            color="white"
            v-model="files"
            label="Choose files (optional)"
            counter
            :counter-label="counterLabelFn"
            max-files="10"
            multiple
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-btn
            color="white-3"
            text-color="white"
            icon="send"
            class="q-ml-auto"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
    data(){
        return{
            editor: null,
            files: null,
            title: null
        }
    },
    methods: {
    counterLabelFn({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`;
    },
  }
}
</script>
