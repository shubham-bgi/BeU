const { Product } = require('../model');

module.exports = {
    update: async (req, res) => {

        const body = req.body;
        const ids = body.map(item => item.productId);
        let productObj = {};
        body.forEach(element => {
            productObj[element.productId] = {
                quantity: element.quantity,
                operation: element.operation
            }
        });
        try {
            for (let id in productObj) {
                if (productObj[id].operation === 'add') {
                    await Product.updateOne({
                        productId: id
                    },
                        {
                            $inc: {
                                quantity: productObj[id].quantity
                            }
                        })
                } else {
                    await Product.updateOne({
                        productId: id
                    },
                        {
                            $inc: {
                                quantity: -Math.abs(productObj[id].quantity)
                            }
                        })
                }

            }
            return res.status(200).json()
        } catch (error) {
            console.log(error);
            return res.status(500).json()
        }

    }
}