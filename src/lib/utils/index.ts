interface IOption {
  label: string;
  validation: string;
}

export const difference = (arr1: any[], arr2: any[]) => arr1.filter(item => !arr2.includes(item));

export const convertQueryOptions = (options: {[keyof: string]: IOption}) =>  {
  const convertedOptions = Object.keys(options).map(value => ({value, label: options[value].label}));
  return convertedOptions;
}