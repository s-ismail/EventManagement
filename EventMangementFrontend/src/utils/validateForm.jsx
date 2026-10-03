export const validateForm = (formData, fields) => {
  const errors = {};

  fields.forEach(field => {
    if (field.required && !formData[field.name]) {
      errors[field.name] = `${field.label} is required`;
    }
  });

  return errors;
};

