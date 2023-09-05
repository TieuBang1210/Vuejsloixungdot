<template>
    <div>
      <b-button v-b-modal.modal-prevent-closing>Post</b-button>
 
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Andon Issues"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Setting"          
          >
           <div>
                  <b-container fluid>
                    <b-form-group label="ANDON_ISSUE_ID">
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-small">ID:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="AppIssue.id" placeholder="Nhập id" 
                      ></b-form-input>
                    </b-col>
                  </b-row>
                    </b-form-group>

                    <b-form-group label="ANDON_ISSUE_TYPE_ID" >
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-default">Types:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="AppIssue.types" placeholder="Nhập Types" 
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </b-form-group>

              <b-form-group label="ANDON_ISSUE_NAME"> 
                  <b-row class="my-1">
                    <b-col sm="2">
                      <label for="input-large">Name:</label>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="AppIssue.name" placeholder="Nhập name" 

                        ></b-form-input>
                    </b-col>
                  </b-row>
                </b-form-group>
                </b-container>
                </div> 
                             
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
    export default {
      name: 'popup',
      props:{
        edit:{
          type:Object,
          default:null
        }
      },
      watch: {
                edit() {
                  if (this.edit) {
                    // Nếu có dữ liệu trong edit prop, gán vào this.AppIssue để hiển thị trong modal
                    this.AppIssue = Object.assign({}, this.edit);
                  } else {
                    // Nếu không có dữ liệu trong edit prop, reset this.AppIssue để tạo một ANDON issue mới
                    this.AppIssue = {
                      id: "",
                      types: "",
                      name: "",
                    };
                  }
                },
  },
  data() {
    return {
      AppIssue: {
        id: "",
        types: "",
        name: "",
      },
      nameState: null,
      submittedNames: [],
    };
  },
      methods: {
        checkFormValidity() {
          const valid = this.$refs.form.checkValidity()
          this.nameState = valid
          return valid
        },
              resetModal() {
            this.AppIssue = {
              id: "",
              types: "",
              name: "",
            };
            this.nameState = null;
          },
        // resetModal() {
        //   this.name = ''
        //   this.nameState = null
        // },
    //     handleOk(bvModalEvent) {
    //   if (this.checkFormValidity()) {
    //     // Khi nhấn nút "OK" trong modal, kiểm tra tính hợp lệ của form
    //     this.$emit("save", this.AppIssue); // Gửi sự kiện "save" với ANDON issue để thêm vào danh sách
    //     this.resetModal(); // Reset modal để tạo một ANDON issue mới
    //     bvModalEvent.preventDefault(); // Ngăn modal đóng mặc định
    //     this.handleSubmit(); // Xử lý submit form
    //   }
    // },
        handleOk(bvModalEvent) {
          console.log(this.AppIssue)
          this.$emit("save",this.AppIssue)
          this.popup={
            id: "",
            types: "", // Dữ liệu nhập liệu từ trường Types
            name: "", // Dữ liệu nhập liệu từ trường Name
          }
          // Prevent modal from closing
          bvModalEvent.preventDefault()
          // Trigger submit handler
          this.handleSubmit()
        },
        handleSubmit() {
          // Exit when the form isn't valid
          if (!this.checkFormValidity()) {
            return
          }
          // Push the name to submitted names
          this.submittedNames.push(this.name)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
          })
        }
      }
    }
  </script>