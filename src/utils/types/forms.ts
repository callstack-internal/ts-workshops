import {FieldPath, FieldValues, RegisterOptions} from 'react-hook-form';

export type BaseValidationRules<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<
  RegisterOptions<TFieldValues, TFieldName>,
  | 'required'
  | 'min'
  | 'max'
  | 'maxLength'
  | 'minLength'
  | 'pattern'
  | 'validate'
>;
