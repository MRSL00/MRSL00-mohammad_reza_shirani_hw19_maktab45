const $button = document.querySelector("#sidebar-toggle");
const $wrapper = document.querySelector("#wrapper");

document.querySelector(".style-eight").style.setProperty("--left", "7rem");

$button.addEventListener("click", (e) => {
  e.preventDefault();

  $wrapper.classList.toggle("toggled");
  if ($wrapper.classList.value) {
    document.getElementById("photo").style.cssText =
      "margin-left: -2rem !important;";
    document.querySelector(".style-eight").style.setProperty("--left", "1rem");
  } else {
    document.getElementById("photo").style.cssText =
      "margin-left: -2rem !important;";
    document.querySelector(".style-eight").style.setProperty("--left", "7rem");
  }
});

$(document).ready(function () {
  // #################### profile ####################
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#imageUpload").change(function () {
    readURL(this);
  });
  // ################# put req for update user info ####################
  $(".sub").click(function (e) {
    e.preventDefault();

    let info = {
      firstname: $("input[name=firstname]").val(),
      lastname: $("input[name=lastname]").val(),
      username: $("input[name=username]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=password]").val(),
      gender: $("select").children("option:selected").val(),
      mobile: $("input[name=mobile]").val(),
      newpassword: $("input[name=newpassword]").val(),
    };

    $.ajax({
      type: "PUT",
      url: "/profile/edit",
      data: info,
      success: function (response) {
        if (response) {
          $(location).attr("href", "http://localhost:5000/profile/edit");
        }
      },
      error: function (err) {
        if (err) {
          $(location).attr("href", "http://localhost:5000/profile/edit");
        }
      },
    });
  });

  // put req for update profile image

  // $(document).on("input", "#imageUpload", function () {
  //   // let img = {
  //   //   avatar: $("input[name=avatar]").val().substr(12),
  //   // };
  //   let myForm = document.getElementById("img");
  //   let formData = new FormData(myForm);
  //   console.log(formData);

  //   $.ajax({
  //     type: "POST",
  //     url: "/profile/edit/avatar",
  //     data: formData,
  //     cache: false,
  //     contentType: "multipart/form-data",
  //     processData: false,
  //     success: function (response) {
  //       if (response) {
  //         $(location).attr("href", "http://localhost:5000/profile/edit");
  //       }
  //     },
  //     error: function (err) {
  //       if (err) {
  //         $(location).attr("href", "http://localhost:5000/profile/edit");
  //       }
  //     },
  //   });
  // });
});
