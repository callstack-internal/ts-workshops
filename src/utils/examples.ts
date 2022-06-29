import {FieldValues} from 'react-hook-form';
import {BaseValidationRules} from './types/forms';

type Payload<Values extends FieldValues> = {
  config: Config<Values>;
  values: Values;
};

type Config<Values extends FieldValues> = {
  [key in keyof Partial<Values>]: BaseValidationRules;
};

type Result<Values extends FieldValues> = {
  isValid: boolean;
  messages: {[key in keyof Values]?: string | undefined};
};

/**
 * Example utility function with generative types.
 * It's purpose is to take a set a of field values, validation configuration as well as FieldValues based type in order to return
 * validation information to the user.
 *
 * @param payload.config configuration for the validator based on react-hook-form validation API
 * @param payload.values current form values based on react-hook-form API
 * @returns object containing information whether the whole form isValid and an array of messages for each invalid field
 */
export const getValidationResults = <Values extends FieldValues>({
  config,
  values,
}: Payload<Values>): Result<Values> => {
  const result: Result<Values> = {isValid: true, messages: {}};
  const fieldKeys = Object.keys(values);

  for (const _key of fieldKeys) {
    const key = _key as keyof Values;
    const configNode = config[key];

    if (typeof configNode === 'undefined') continue;

    const currentValue = values[key];
    const ruleKeys = Object.keys(configNode) as Array<
      keyof BaseValidationRules
    >;

    for (const _rule of ruleKeys) {
      const rule = _rule as keyof BaseValidationRules;
      const configRule = configNode?.[rule];
      const currentRule = isConfigNodeAnObject(configRule)
        ? configRule.value
        : configRule;

      if (!currentRule) continue;

      if (rule === 'required' && (!currentValue || currentValue === '')) {
        result.isValid = false;
        result.messages[key] = `Value for ${key} is required`;
        break;
      }
      if (rule === 'max' && currentValue.length > currentRule) {
        result.isValid = false;
        result.messages[
          key
        ] = `Value for ${key} must be shorter than ${currentRule}`;
        break;
      }
      if (rule === 'min' && currentValue.length < currentRule) {
        result.isValid = false;
        result.messages[
          key
        ] = `Value for ${key} must be at least ${currentRule} characters`;
        break;
      }
      if (rule === 'pattern' && !currentValue.match(currentRule)) {
        result.isValid = false;
        result.messages[
          key
        ] = `Value for ${key} doesn't match the format of the field [ foo@bar.baz ]`;
        break;
      }
      if (rule === 'validate' && typeof currentRule === 'function') {
        const validatorResult = currentRule(currentValue);

        if (validatorResult === false || typeof validatorResult === 'string') {
          result.isValid = false;
          result.messages[key] =
            typeof validatorResult === 'string'
              ? validatorResult
              : `Value for ${key} cannot be validated`;
          break;
        }
      }
    }
  }

  return result;
};

/**
 * Type guard function - allows resolving conditions based on typechecks and logic
 *
 * @param data any kind of data can be passed to the type guard function
 * @returns boolean confirming whether a type if valid
 */
export const isConfigNodeAnObject = (
  data: any,
): data is Record<'value' | 'message', any> => !!data.message && !!data.value;

/**
 * Example of a simple logger util function matched type-wise with its counterpart
 * - getValidationResults function
 *
 * @param data result from getValidationResults function to be printed to console
 */
export const exampleResultsLogger = <Values extends FieldValues>(
  data: Result<Values>,
) => {
  const fieldKeys = Object.keys(data.messages);
  if (fieldKeys.length) {
    console.log();
    for (const key of fieldKeys) {
      console.log('| ---------------------------------------------');
      console.log('| ', `🔥  Field: ${key}`);
      console.log('| ', `📄  Message: ${data.messages[key]}`);
      console.log('| ---------------------------------------------');
    }
  }
};
