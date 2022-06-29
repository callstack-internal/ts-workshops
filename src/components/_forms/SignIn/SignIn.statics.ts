import {BaseValidationRules} from '@@types/forms';
import {FieldValues} from 'react-hook-form';
import {SignInFormFields} from './SignIn';

const emailValidationRegex = new RegExp(/^\S+@\S+\.\S+$/, 'g');

type ExampleValidationRules<Values extends FieldValues> = {
  [key in keyof Partial<Values>]: BaseValidationRules;
};

export const validationRules: ExampleValidationRules<SignInFormFields> = {
  email: {
    required: {
      value: true,
      message: 'This field is required',
    },
    pattern: {
      value: emailValidationRegex,
      message:
        'Invalid email, please provide a real one so that we can get back to you later!',
    },
  },
  password: {
    required: {
      value: true,
      message: 'This field is required',
    },
    min: 10,
  },
};
