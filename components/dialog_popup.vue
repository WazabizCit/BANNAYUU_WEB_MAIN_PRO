<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog_status" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{txt_dialog_title}}</v-card-title>
          <v-card-text>{{txt_dialog_sub}}</v-card-text>
          <v-card-actions>            
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="closeDialog">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>



<script>
export default {
  mounted() {},
  props: {

    dialog_status: false,
    txt_dialog_sub: "",
    txt_dialog_title: "",
    
  },
  methods: {
    closeDialog() {
      let status_dialog = this.dialog_status;
      this.$emit("closeDialog",  ({"status_dialog":this.status_dialog = false}));
    }
    
  },
  data: () => ({})
};
</script>

<style>
</style>