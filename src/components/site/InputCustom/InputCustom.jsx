import clsx from 'clsx';
import React from 'react';
import { PatternFormat } from 'react-number-format';
import styles from './InputCustom.module.scss';
const InputCustom = ({ form, name, label, placeholder, isPhone, isTextarea, isCheckbox, isEmail }) => {
  const error = form?.formState?.errors?.[name];
  return isPhone ? (
    <label class={clsx('input-wrap textarea-wrap', error && 'input-error')}>
      <div className="input-lable input-label-required">Телефон</div>
      <PatternFormat
        className="input-custom"
        format="+ 7 (###) ###-##-##"
        value={form.watch(name)}
        mask="*"
        type="text"
        placeholder="Введите телефон для связи"
        is
        onValueChange={(val) => {
          form.setValue(name, val.formattedValue);
        }}
      />
    </label>
  ) : isTextarea ? (
    <label class={clsx('input-wrap textarea-wrap', error && 'input-error')}>
      <div className="input-lable textarea-label input-label-required">{label}</div>
      <textarea {...form.register(name, { required: true })} rows="6" className="textarea-custom" placeholder={placeholder} />
    </label>
  ) : isCheckbox ? (
    <label class={clsx('checkbox-custom', error && 'checkbox-error')}>
      <input {...form.register(name, { required: true })} type={'checkbox'} />
      <div></div>
      <span className="">{label}</span>
    </label>
  ) : (
    <label class={clsx('input-wrap', error && 'input-error')}>
      <div className="input-lable input-label-required">{label}</div>
      <input
        {...form.register(name, {
          required: true,
          ...(isEmail && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }),
        })}
        type={'text'}
        className="input-custom"
        placeholder={placeholder}
      />
    </label>
  );
};

export default InputCustom;
