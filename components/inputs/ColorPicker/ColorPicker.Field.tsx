import { Field } from 'react-final-form';
import ColorPicker from './ColorPicker';

const ColorPickerAdapter = ({ onChange, ...rest }) => {
  return <ColorPicker onChange={(value) => onChange(value)} {...rest} />;
};

const ColorPickerField = ({ name = 'color', ...rest }) => {
  return (
    <Field name={name} {...rest}>
      {({ input, meta: { touched, error, submitError } }) => {
        const isErrorState = (error || submitError) && touched;

        return (
          <>
            <ColorPickerAdapter
              isErrorState={isErrorState}
              onChange={input.onChange}
              value={input.value}
              {...rest}
            />
            {isErrorState && <div className="error-input-info">{error}</div>}
          </>
        );
      }}
    </Field>
  );
};

export default ColorPickerField;
