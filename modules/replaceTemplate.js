module.exports = (temp, asset) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, asset.productName);
  output = output.replace(/{%IMAGE%}/g, asset.image);
  output = output.replace(/{%LOCATION%}/g, asset.location);
  output = output.replace(/{%AREA%}/g, asset.area);
  output = output.replace(/{%MODEL%}/g, asset.model);
  output = output.replace(/{%PRICE%}/g, asset.price);
  output = output.replace(/{%BARCODE%}/g, asset.barcode);
  output = output.replace(/{%CATEGORY%}/g, asset.category);
  output = output.replace(/{%DESCRIPTION%}/g, asset.description);
  output = output.replace(/{%ID%}/g, asset.id);

  return output;
};
