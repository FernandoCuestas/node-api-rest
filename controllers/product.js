import Product from '../models/product';

function getProduct({params}, res) {
  let productId = params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!product) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ product })
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!products) return res.status(404).send({message: 'No existen productos'})

    res.send(200, { products })
  })
}

function saveProduct({body}, res) {
  console.log('POST /api/product')
  console.log(body)

  let product = new Product()
  product.name = body.name
  product.picture = body.picture
  product.price = body.price
  product.category = body.category
  product.description = body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ product: productStored })
  })
}

function updateProduct({params, body}, res) {
  let productId = params.productId
  let update = body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

    res.status(200).send({ product: productUpdated })
  })
}

function deleteProduct({params}, res) {
  let productId = params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({message: 'El producto ha sido eliminado'})
    })
  })
}

export default {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
};
