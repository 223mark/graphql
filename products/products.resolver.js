const productsModel = require('./products.model');

module.exports = {
    // Query we want to support
    Query: {
        products: () => {
            return productsModel.getAllProducts();
        },
        // _ is for argu that we are not using
        productsByPrice: (_, args) => {
            return productsModel.getProductsByPrice(args.min, args.max)
        },
        product: (_, args) => {
            
            return productsModel.getProductById(args.id)
        }
    },

    // Mutation we want to do operation with data
    Mutation: {
        addNewProduct: (_, args) => {
            productsModel.addNewProduct(args.id, args.description, args.price);
        },
        addNewProductReview: (_, args)=> {
           productsModel.addNewProductReview(args.id, args.rating, args.comment)
        }
    }
}


// In GRAPHQL , best practice is to keep our resolver function as small or thin as possible