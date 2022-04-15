const { Product } = require('../model');

module.exports = {
    update: async (req, res) => {

        const body = req.body;
        let productObj = {};
        body.forEach(element => {
            productObj[element.productId] = {
                quantity: element.quantity,
                operation: element.operation
            }
        });
        let ops = [];
        try {
            for (let id in productObj) {
                if (productObj[id].operation === 'add') {
                    ops.push({
                        updateOne: {
                            "filter": { productId: id },
                            "update": { $inc: { quantity: productObj[id].quantity } }
                        }
                    });
                } else if (productObj[id].operation === 'subtract'){
                    ops.push({
                        updateOne: {
                            "filter": { productId: id },
                            "update": { $inc: { quantity: -Math.abs(productObj[id].quantity) } }
                        }
                    });
                }

            }
            await Product.bulkWrite(ops, { ordered: false });
            return res.status(200).json()
        } catch (error) {
            console.log(error);
            return res.status(500).json()
        }

    }
}