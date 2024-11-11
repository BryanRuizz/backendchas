const contractResolver = {
    Query: {
      availablePoints: async (_, { ownerId }, { db }) => {
       
        const [contracts] = await db.query(
          "SELECT * FROM Contracts WHERE ownerId = ?",
          [ownerId]
        );
  
       
        return contracts
          .filter(contract => !contract.isDelinquent && contract.isActive && contract.type !== "Relase")
          .map(contract => ({
            usageType: contract.usageType,
            totalPoints: contract.points,
          }));
      },
    },
  };
  
  module.exports = contractResolver;
  