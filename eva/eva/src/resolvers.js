const bcrypt = require('bcryptjs')
const resolvers = {
    Query: {
        async user (root, { id }, { models }) {
              return models.User.findByPk(id)
        },
        async allRecipes (root, args, { models }) {
              return models.Recipe.findAll()
        },
        async recipe (root, { id }, { models }) {
              return models.Recipe.findByPk(id)
        }
      },
    
    Mutation: {
        async createUser (root, { name, email, password }, { models }) {
            return models.User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            })
        },
        async createRecipe (root, { userId, title, ingredients, direction }, { models }) {
            return models.Recipe.create({ userId, title, ingredients, direction })
        },
        async updateRecipe (root, { userId, title, ingredients, direction }, { models }) { 
            const recipe = find(recipes, { id: userId }); 
            models.Recipe.title = title; 
            models.Recipe.ingredients= ingredients;
            models.Recipe.direction= direction;
            return models.Recipe;
        },
        async deleteUser (root, { userId, title, ingredients, direction }, { models }){
            return delete(User);
        },
        
    },
        
    User: {
        async recipes (user) {
            return user.getRecipes()
        }
    },
    
    Recipe: {
        async user (recipe) {
            return recipe.getUser()
        }
    }
}

module.exports = resolvers