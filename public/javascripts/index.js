$(document).ready(() => {
    
    (function () {
      var input = document.getElementById("images"),
          formdata = false;

      if (window.FormData) {
        console.log("formData Support!");
        formdata = new FormData();
        document.getElementById("btn").style.display = "none";
      }

      function showUploadedItem (source) {
        var list = document.getElementById("image-list"),
            li   = document.createElement("li"),
            img  = document.createElement("img");
        img.src = source;
        li.appendChild(img);
        list.appendChild(li);
      }

      if (input.addEventListener) {
          input.addEventListener("change", function (evt) {
          var i = 0, len = this.files.length, img, reader, file;

          document.getElementById("response").innerHTML = "Uploading . . ."

          for ( ; i < len; i++ ) {
            file = this.files[i];

            if (!!file.type.match(/image.*/)) {
              if ( window.FileReader ) {
                reader = new FileReader();
                reader.onloadend = function (e) {
                  showUploadedItem(e.target.result);
                };
                reader.readAsDataURL(file);
              }
              if (formdata) {
                formdata.append("images[]", file);
              }
            }
          }

          if (formdata) {
            console.log(formdata);
            $.ajax({
              url: "/upload",
              type: "POST",
              data: formdata,
              processData: false,
              contentType: false,
              success: function (res) {
                document.getElementById("response").innerHTML = res;
              }
            });
          }

        }, false);
      }
    })();

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#my-file").change(function(){
        readURL(this);
    });

    $('#submit-btn').click(() => {
      var file = $('#my-file').prop("files");
      var form = new FormData();
      form.append("file", file);
      alert(JSON.stringify(form, null, 4));
    });

  });