import React, {useState} from "react";
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap';

const InputText = ({
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  min,
  max,
  error='',
  label,
  multiple,
  disabled,
  value
}) => {
  const [hidden, setHidden] = useState(false);

  const handleClick = e => {
    hidden === false ? setHidden(true) : setHidden(false);
  }

  return (
    <Form.Group>
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control className={error.length ? "is-invalid" : ""} type={hidden ? "text" : type} placeholder={placeholder} minLength={min} maxLength={max} name={name} value={value} onChange={onChange} disabled={disabled} required/>
      {name==="password" && <Form.Check type="checkbox" label={hidden ? "Hide password" : "Show password"} onClick={handleClick} />}
      {error.length && <div className="invalid-feedback">
        {error}
      </div>}
    </Form.Group>
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  error: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
}

InputText.defaultProps = {
  name: 'name',
  type: 'text',
  placeholder: '',
  onChange: ()=>{},
  onBlur: ()=>{},
  min: 6,
  max: 100,
  error: '',
  label: '',
  multiple: false,
  disabled: false,
  value: ''
}

export default InputText;
