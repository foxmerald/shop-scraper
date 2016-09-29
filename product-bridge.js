function getDataSchema(products) {
  var tilesSchemata = [];
  var productSchema = {};

  for (let i = 0; i < products.length; i++) {
    let schema = traverse(products[i]);
    tilesSchemata.push(schema);
  }

  for (let i = 0; i < tilesSchemata.length; i++) {
    productSchema = Object.assign(productSchema, tilesSchemata[i]);
  }

  console.log(productSchema);
}

function traverse(object) {
  for (let prop in object) {
    if (isNotEmptyObject(object[prop])) {
      traverse(object[prop]);
    } else {
      object[prop] = getTypeOf(object[prop]);
    }
  }

  return object;
}

function isNotEmptyObject(operand) {
  return operand && typeof(operand) === "object" && Object.keys(operand).length
}

function getTypeOf(operand) {
  let type = typeof(operand);

  if (!operand && operand !== 0) {
    return null;
  }

  if (type === "object") {
    return {};
  }

  return type;
}
