// vim: tabstop=2 shiftwidth=2 expandtab

var dom = require('./dom');

function onSubmit (callback) {
  return function(event) {
    event.preventDefault();
    callback(inputUsername.value,
        inputDomain.value,
        inputPassword.value,
        select.value);
  };
}

var tabIndex = 0;
var createInput = function (type) {
  tabIndex++;
  var className = 'input-' + type.toLowerCase();
  return dom.input(className, {
    placeholder: type,
    required: 'required',
    tabindex: tabIndex,
    type: type === 'Password' ? 'password' : 'text',
  });
};
var inputUsername = createInput('Username');
var inputDomain = createInput('Domain');
var inputPassword = createInput('Password');

var select = dom.select(false, {
  tabindex: 4
});
for (var i = 1; i <= 20; i++) {
  var option = dom.option(false, {
    value: i,
    text: i
  });
  if (i === 8) {
    option.selected = 'selected';
  }
  select.appendChild(option);
}

function render (onSubmitCallback) {
  var form = dom.form(false, {
    onSubmit: onSubmit(onSubmitCallback)
  }, [
    dom.fieldset('inputs', null, [
      dom.p(['input-wrapper', 'username-wrapper'], null, [inputUsername]),
      dom.p(['input-wrapper', 'domain-wrapper'], null, [
        inputDomain,
        dom.datalist()
      ]),
      dom.p(['input-wrapper', 'password-wrapper'], null, [
        inputPassword,
        dom.span('password-reset', {
          text: 'Re-enter password'
        })
      ])
    ]),
    dom.fieldset('checkboxes', null, [
      dom.p('count-wrapper', null, [
        dom.label(false, {
          'for': 'count',
          text: 'length'
        }),
        select
      ])
    ]),
    dom.p(false, null, [
      dom.input(false, {
        type: 'submit',
        value: 'Получить пароль'
      })
    ])
  ]);

  var output = dom.div('output');

  var body = document.getElementsByTagName('body')[0];
  body.appendChild(output);
  body.appendChild(form);

  return {
    form: form,
    output: output
  };
}

module.exports = {
  render: render
};
