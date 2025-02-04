// Valida si un correo electrónico es válido
export const isValidEmail = (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        validateEmail(email);
        resolve();
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  };
  
  // Valida el formato del correo electrónico
  const validateEmail = (email: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El correo no tiene el formato correcto");
    }
  };

// Valida campos específicos y omite claves no deseadas
 export const validateFields =(
    fields: any, // Objeto con claves y valores
    notNullKeys: string[], // Claves que no pueden ser nulas
    omitKeys: string[] // Claves que deben omitirse
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // Omitir claves especificadas
        omitSpecifiedKeys(fields, omitKeys);
  
        // Validar campos restantes
        validateRemainingFields(fields);
        validateNotNullKeys(fields, notNullKeys);
  
        resolve();
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  };

const omitSpecifiedKeys = (fields: any, omitKeys: string[]) => {
    for (const key of omitKeys) {
      delete fields[key];
    }
};
  
// Valida que los campos restantes no sean vacíos o inválidos
const validateRemainingFields = (fields: Record<string, any>): void => {
    for (const key in fields) {
      if (
        fields[key] === undefined ||
        fields[key] === null ||
        fields[key] === ""
      ) {
        throw new Error("Algunos campos no pueden ser vacíos o nulos");
      }
      if (typeof fields[key] === "number" && fields[key] <= 0 && !/latitude|longitude/i.test(key)) {
        throw new Error(`The field ${key} must be greater than 0`);
      }
    }
  };
  
// Valida que las claves no nulas tengan valores válidos
const validateNotNullKeys = (
    fields:any, 
    notNullKeys: string[]): void => {
    for (const key of notNullKeys) {
      if (
        fields[key] === undefined ||
        fields[key] === null ||
        fields[key] === ""
      ) {
        throw new Error(`El campo ${key} no puede ser vacío`);
      }
      if (typeof fields[key] === "number" && fields[key] <= 0 && !/latitude|longitude/i.test(key)) {
        throw new Error(`The field ${key} must be greater than 0`);
      }
    }
  };

