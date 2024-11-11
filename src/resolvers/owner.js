const { generateToken } = require('../utils/auth');

const ownerResolver = {
    Query: {
       
        ownerProfile: async (_, { email, ownerNumber }, { db }) => {
            const [rows] = await db.query(
              "SELECT * FROM Owner WHERE Email = ? AND Number = ?",
              [email, ownerNumber]
            );
            console.log("profie", rows);
            const owner = rows[0];
            if (!owner) throw new Error('Owner not found');
            
            return {
              number: owner.number,  
              fullName: `${owner.givenName} ${owner.surname}`,  
              email: owner.email,  
            };
          },
          

      
        allOwners: async (_, __, { db }) => {
            const [rows] = await db.query("SELECT * FROM Owner");
            console.log("users", rows);
            return rows.map(owner => ({
                number: owner.number, 
                fullName: `${owner.givenName} ${owner.surname}`,
                email: owner.email, 
            }));
        },

    },

    Mutation: {
        generateAccessToken: async (_, { email, ownerNumber }, { db }) => {
            const [rows] = await db.query(
                "SELECT * FROM Owner WHERE Email = ? AND Number = ?",
                [email, ownerNumber]
            );
            const owner = rows[0];
            if (!owner) throw new Error('Invalid owner credentials');

            const token = generateToken({
                ownerId: owner.id,
                email: owner.Email,
            });
            return token;
        },
    },
};

module.exports = ownerResolver;
