import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';

export const StartsWidth = (
  prefix: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'startsWidth',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [prefix],
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(args);
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must start with ${prefix}`;
        },
      },
    });
  };
};
