import JoiCore from "joi";
import { validator } from '@/middlewares'
import { sequelize } from "@/db/models";
import _ from "lodash";

let custom = JoiCore.extend(require('joi-phone-number'));

custom = custom.extend(require('@joi/date'));

const dbExistsExternal = ({ tablename, fieldName, path, errorMessage }) => async (value, helpers) => {
  if (_.isEmpty(value)) return value;

  var query = `SELECT count(*) FROM ${tablename} WHERE ${fieldName} = :value AND deleted_at IS NULL;`;

  let data = await sequelize.query(query, {
    replacements: { value },
    type: sequelize.QueryTypes.SELECT,
    raw: true,
    // logging: console.log,
  })

  // console.log("dataCount", data, metaData, this);

  if (!_.isEmpty(data) && data[0].count == 0) {

    errorMessage ??= `${path} does not exists`;

    throw new JoiCore.ValidationError(
      'any.invalid',
      [
        {
          message: errorMessage,
          path: [path],
          type: 'external',
          context: {
            key: path,
            label: path,
            value,
          },
        },
      ],
      value
    );
  }

  return value;
}

let defaultPaginateFieldsConfig = {
  orderBy: "createdAt",
  orderDir: "ASC"
};

let paginateFields = (config = defaultPaginateFieldsConfig) => {
  config = Object.assign({}, defaultPaginateFieldsConfig, config);

  return {
    query: custom
      .string()
      .empty(["", null])
      .default(null),
    page: custom
      .number()
      .positive()
      .default(1),
    perPage: custom
      .number()
      .positive()
      .default(10),
    orderBy: custom
      .string()
      .valid(config.orderBy)
      .optional()
      .default(config.orderBy),
    orderDir: custom
      .string()
      .valid("ASC", "DESC")
      .optional()
      .default(config.orderDir),
  }
};

let uuidFieldConfig = {
  required: false
};

let uuidField = (config = uuidFieldConfig) => {
  config = Object.assign({}, uuidFieldConfig, config);

  let fieldConfig = custom
    .string()
    .guid({
      version: ["uuidv1", "uuidv2", "uuidv3", 'uuidv4', 'uuidv5']
    });

  if (config.required) {
    fieldConfig = fieldConfig
      .required();
  } else {
    fieldConfig = fieldConfig
      .optional()
      .empty(["", null])
      .default(null);
  }

  return fieldConfig;
};

export {
  custom as Joi,
  validator,
  paginateFields,
  uuidField,
  dbExistsExternal
};