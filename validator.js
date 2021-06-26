const validator = (formClass, callback) => {
  const validateScroll = (el) => {
    el.parentElement.querySelector(".validate").scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
    // break;
  };
  //form validation message
  const validateMsg = (el, msg, inputError) => {
    let errorMsg = el.parentElement.querySelectorAll(".validate");
    [].forEach.call(errorMsg, (el) => {
      el.innerText = inputError
        ? msg !== undefined && msg !== null
          ? msg
          : "wrong Input"
        : "";
    });
  };

  let form = document.querySelectorAll(formClass);
  [].forEach.call(form, (el) => {
    el.addEventListener("submit", (e) => {
      e.preventDefault();
      let errorSections = [];
      var formGroup = el.querySelectorAll(".form-group");
      let password = el.querySelector(".password");
      var formGroupError = false;
      var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
      [].forEach.call(formGroup, (el) => {
        (function () {
          //validate input field
          let input = el.querySelectorAll("input, select, textarea");
          [].forEach.call(input, (el) => {
            let rule = el.getAttribute("data-rule");
            let msg = el.getAttribute("data-msg");
            if (rule !== undefined && rule !== null) {
              var inputError = false;
              var pos = rule.indexOf(":", 0);
              //   el.style.display = "none";

              if (pos >= 0) {
                var exp = rule.substr(pos + 1, rule.length);
                rule = rule.substr(0, pos);
                // console.log(exp);
              } else {
                rule = rule.substr(pos + 1, rule.length);
              }
              //   console.log(rule);
              //   console.log(msg);
              switch (rule) {
                case "required":
                  if (el.value === "") {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "minLen":
                  // console.log(el.value);
                  if (el.value.length < parseInt(exp)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "maxLen":
                  // console.log(el.value);
                  if (el.value.length > parseInt(exp)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "minValue":
                  // console.log(el.value);
                  if (el.value < parseInt(exp)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "maxValue":
                  // console.log(el.value);
                  if (el.value > parseInt(exp)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "confirmPassword":
                  if (password.value !== el.value) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "email":
                  if (!emailExp.test(el.value)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "checked":
                  if (!el.checked) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "select":
                  if (
                    el.value === "" ||
                    el.value === null ||
                    el.value === undefined
                  ) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "radio":
                  let radio = el.querySelectorAll("input[type=radio]:checked");

                  if (!radio.length > 0) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }

                case "regexp":
                  exp = `${exp}`;
                  if (!exp.test(el.value)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;
              }

              validateMsg(el, msg, inputError);
            }
          });
          // validateScroll(elem, inputError);
        })();
        (function () {
          //validate custom field
          let validateInput = el.querySelectorAll(".validate-input");
          [].forEach.call(validateInput, (el) => {
            let rule = el.getAttribute("data-rule");
            let msg = el.getAttribute("data-msg");
            let radios = el.querySelectorAll("input[type='radio']:checked");
            let checkboxes = el.querySelectorAll(
              "input[type='checkbox']:checked"
            );
            if (rule !== undefined && rule !== null) {
              var inputError = false;
              var pos = rule.indexOf(":", 0);
              //   el.style.display = "none";

              if (pos >= 0) {
                var exp = rule.substr(pos + 1, rule.length);
                rule = rule.substr(0, pos);
                // console.log(exp);
              } else {
                rule = rule.substr(pos + 1, rule.length);
              }
              //   console.log(rule);
              //   console.log(msg);
              switch (rule) {
                case "radio":
                  if (radios.length <= 0) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  //   console.log(radios.length);
                  break;

                case "maxCheck":
                  if (checkboxes.length > parseInt(exp)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;

                case "minCheck":
                  if (checkboxes.length < parseInt(exp)) {
                    formGroupError = inputError = true;
                    errorSections.push(el);
                  }
                  break;
              }
              validateMsg(el, msg, inputError);
            }
          });
        })();
      });
      if (errorSections.length > 0) {
        validateScroll(errorSections[0]);
      }
      if (formGroupError) return false;

      callback();
    });
  });
};
