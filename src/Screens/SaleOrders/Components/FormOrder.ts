const FormCreateEditOrder = [
  {
    code: 'Style',
    name: 'Style',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Style',
      },
      maxLength: {
        value: 20,
        message: 'Style must be at most 20 characters',
      },
    },
    message: 'Please enter a valid Style',
    inputProps: {
      placeholder: 'Please enter your Style',
    },
  },
  {
    code: 'Color',
    name: 'Color',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Style',
      },
      maxLength: {
        value: 50,
        message: 'Style must be at most 50 characters',
      },
    },
    message: 'Please enter a valid Color',
    inputProps: {
      placeholder: 'Please enter your Color',
    },
  },
  {
    code: 'Description',
    name: 'Description',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Description',
      },
      maxLength: {
        value: 100,
        message: 'Description must be at most 100 characters',
      },
    },
    message: 'Please enter a valid Description',
    inputProps: {
      placeholder: 'Please enter your Description',
    },
  },
  {
    code: 'Season',
    name: 'Season',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Season',
      },
      maxLength: {
        value: 50,
        message: 'Season must be at most 50 characters',
      },
    },
    message: 'Please enter a valid Season',
    inputProps: {
      placeholder: 'Please enter your Season',
    },
  },
  {
    code: 'ETA',
    name: 'ETA',
    rules: {
      required: {
        value: true,
        message: 'Please enter your ETA',
      },
      maxLength: {
        value: 20,
        message: 'ETA must be at most 20 characters',
      },
    },
    message: 'Please enter a valid ETA',
    inputProps: {
      placeholder: 'Please enter your ETA',
    },
  },
  {
    code: 'Bundle',
    name: 'Bundle',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Bundle',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
      validate: (value: number) => value > 0 || 'Bundle must be greater than 0',
    },
    message: 'Please enter a valid Bundle',
    inputProps: {
      placeholder: 'Please enter your Bundle',
    },
  },
  {
    code: 'Price1',
    name: 'Price1',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Price1',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
    },
    message: 'Please enter a valid Price1',
    inputProps: {
      placeholder: 'Please enter your Price1',
    },
  },
  {
    code: 'Price2',
    name: 'Price2',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Price2',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
    },
    message: 'Please enter a valid Price2',
    inputProps: {
      placeholder: 'Please enter your Price2',
    },
  },
  {
    code: 'Price3',
    name: 'Price3',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Price3',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
    },
    message: 'Please enter a valid Price3',
    inputProps: {
      placeholder: 'Please enter your Price3',
    },
  },
  {
    code: 'Price4',
    name: 'Price4',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Price4',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
    },
    message: 'Please enter a valid Price4',
    inputProps: {
      placeholder: 'Please enter your Price4',
    },
  },
  {
    code: 'Price5',
    name: 'Price5',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Price5',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
    },
    message: 'Please enter a valid Price5',
    inputProps: {
      placeholder: 'Please enter your Price5',
    },
  },
  {
    code: 'MSRP',
    name: 'MSRP',
    rules: {
      required: {
        value: true,
        message: 'Please enter your MSRP',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
    },
    message: 'Please enter a valid MSRP',
    inputProps: {
      placeholder: 'Please enter your MSRP',
    },
  },
  {
    code: 'Coo',
    name: 'Coo',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Coo',
      },
      maxLength: {
        value: 20,
        message: 'Coo must be at most 20 characters',
      },
    },
    inputProps: {
      placeholder: 'Please enter your Coo',
    },
  },
  {
    code: 'AvailDate',
    name: 'AvailDate',
    rules: {
      required: {
        value: true,
        message: 'Please enter your AvailDate',
      },
    },
    inputProps: {
      placeholder: 'Please enter your AvailDate',
    },
  },
  {
    code: 'Unit_Qty',
    name: 'Unit Qty',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Unit Qty',
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Please enter a number',
      },
      valueAsNumber: true,
      validate: (value: number) =>
        value > 0 || 'Unit Qty must be greater than 0',
    },
    inputProps: {
      placeholder: 'Please enter your Unit Qty',
    },
  },
  {
    code: 'Bin',
    name: 'Bin',
    rules: {
      required: {
        value: true,
        message: 'Please enter your Bin',
      },
    },
    inputProps: {
      placeholder: 'Please enter your Bin',
    },
  },
];
export default FormCreateEditOrder;
