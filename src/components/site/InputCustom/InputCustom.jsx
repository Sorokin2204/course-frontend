import clsx from 'clsx';
import React, { useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import styles from './InputCustom.module.scss';

import Select from 'react-select';
import { Controller } from 'react-hook-form';
const InputCustom = ({ isPassword, radioList, form, name, label, placeholder, isPhone, isPrice, isTextarea, isCheckbox, isEmail, control, isNumber, isRadio, disabled = false, errorText, rules, style, styleInput, styleLabel, size, isSelect, options }) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = form?.formState?.errors?.[name];
  return isRadio ? (
    <div style={{ fontWeight: 400, fontSize: '16px', lineHeight: '22px', userSelect: 'none' }}>
      <div style={{ marginBottom: '0px' }} className="input-lable input-label-required">
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {radioList?.map((itemRadio, itemIndex) => (
          <label style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <input disabled={disabled} style={{ margin: '0 5px 0 0' }} {...form.register(name)} type="radio" value={itemRadio?.value} />
            {itemRadio?.label}
          </label>
        ))}
      </div>
    </div>
  ) : isNumber ? (
    <label class={clsx('input-wrap', error && 'input-error')}>
      <div className="input-lable input-label-required">{label}</div>
      <Controller rules={rules} control={control} name={name} render={({ field: { onChange, name, value } }) => <NumericFormat {...(isPrice && { suffix: ' тг', thousandSeparator: ' ' })} name={name} className="input-custom" value={value} onChange={onChange} disabled={disabled} />} />
    </label>
  ) : isSelect ? (
    <div>
      <div className="input-lable input-label-required" style={styleLabel}>
        {label}
      </div>
      <Controller
        render={({ field }) => (
          <Select
            options={options}
            classNamePrefix="custom-select"
            placeholder={' '}
            noOptionsMessage={({ inputValue: string }) => 'Нет опций'}
            {...field}
            onChange={(selectVal) => {
              field.onChange(selectVal);
            }}
          />
        )}
        name={name}
        rules={rules}
        control={control}
      />
    </div>
  ) : // <Controller control={control} defaultValue={options[0]} name={name} render={({ onChange, value, name, ref }) => <Select inputRef={ref} classNamePrefix="addl-class" options={options} value={options.find((c) => c.value === value)} onChange={(val) => onChange(val.value)} />} />
  // <label class={clsx('input-wrap', error && 'input-error')}>
  //   <div className="input-lable input-label-required">{label}</div>
  //   <Controller rules={rules} control={control} name={name} render={({ field: { onChange, name, value } }) => <NumericFormat {...(isPrice && { suffix: ' тг', thousandSeparator: ' ' })} name={name} className="input-custom" value={value} onChange={onChange} disabled={disabled} />} />
  // </label>
  isPhone ? (
    <label class={clsx('input-wrap', error && 'input-error')} style={{ ...style }}>
      <div className="input-lable input-label-required" style={styleLabel}>
        {label}
      </div>
      <Controller
        rules={{
          required: true,
          pattern: {
            value: /^(\+\ 7|7|8|\+7)[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/m,
            message: 'Неверный формат телефона',
          },
        }}
        control={control}
        name={name}
        render={({ field: { onChange, name, value } }) => <PatternFormat style={{ ...styleInput }} format="+ 7 (###) ###-##-##" mask="_" name={name} className="input-custom" value={value} onChange={onChange} disabled={disabled} />}
      />
      {errorText && <div style={{ marginTop: '10px', color: '#EB5757', fontSize: '20px' }}>{errorText}</div>}
    </label>
  ) : isTextarea ? (
    <label class={clsx('input-wrap textarea-wrap', error && 'input-error')}>
      <div className="input-lable input-label-required" style={styleLabel}>
        {label}
      </div>
      <textarea {...form.register(name, { required: true })} rows="6" className="input-custom" placeholder={placeholder} style={{ height: 'auto' }} />
    </label>
  ) : isCheckbox ? (
    <label class={clsx('checkbox-custom', error && 'checkbox-error')}>
      <input {...form.register(name, rules ? rules : { required: true })} type={'checkbox'} />
      <div></div>
      <span className="">{label}</span>
    </label>
  ) : (
    <label class={clsx('input-wrap', error && 'input-error')} style={{ ...style }}>
      <div className="input-lable input-label-required" style={styleLabel}>
        {label}
      </div>
      <div style={{ ...(isPassword && { display: 'grid', gridTemplateColumns: `1fr ${size == 'small' ? '38px' : '52px'}` }) }}>
        <input
          {...form.register(
            name,
            rules
              ? rules
              : {
                  required: true,
                  ...(isEmail && {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  }),
                },
          )}
          disabled={disabled}
          type={isPassword && !showPassword ? 'password' : 'text'}
          className="input-custom"
          placeholder={placeholder}
          style={{ ...styleInput, ...(isPassword && { borderRadius: ' 10px 0 0 10px', borderRight: 'none', paddingRight: 0 }) }}
        />{' '}
        {isPassword && (
          <>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowPassword(!showPassword);
              }}
              style={{
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff',
                height: '52px',
                width: '52px',
                cursor: 'pointer',
                borderTop: '1px solid #e0e0e0',
                borderRight: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0',
                borderRadius: '0 10px 10px 0',
                ...(size === 'small' && { width: '38px', height: '38px' }),
              }}>
              <img style={{ display: 'block', marginRight: size === 'small' ? '17px' : 0 }} src={showPassword ? 'img/eye.svg' : 'img/eye-off.svg'} />
            </div>
          </>
        )}
      </div>
      {errorText && <div style={{ marginTop: '10px', color: '#EB5757', fontSize: '20px' }}>{errorText}</div>}
    </label>
  );
};

export default InputCustom;
