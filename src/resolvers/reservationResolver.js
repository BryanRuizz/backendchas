const reservationResolver = {
    Query: {
      upcomingReservations: async (_, { ownerId }, { db }) => {
        const [rows] = await db.query(
          "SELECT * FROM Reservations WHERE ownerId = ? AND status = 'p' AND checkOutDate <= NOW() ORDER BY checkInDate ASC",
          [ownerId]
        );
        return rows.map(row => ({
          id: row.id,
          siteName: row.siteName,
          checkInDate: row.checkInDate,
          checkOutDate: row.checkOutDate,
          status: true,
        }));
      },
      nearestUpcomingReservation: async (_, { ownerId }, { db }) => {
        const [rows] = await db.query(
          "SELECT * FROM Reservations WHERE ownerId = ? AND status = 'p' AND checkOutDate <= NOW() ORDER BY checkInDate ASC LIMIT 1",
          [ownerId]
        );
        const reservation = rows[0];
        return reservation ? {
          id: reservation.id,
          siteName: reservation.siteName,
          checkInDate: reservation.checkInDate,
          checkOutDate: reservation.checkOutDate,
          status: true,
        } : null;
      },
      reservationHistory: async (_, { ownerId }, { db }) => {
        const [upcomingRows] = await db.query(
          "SELECT * FROM Reservations WHERE ownerId = ? AND status = 'p' AND checkOutDate <= NOW()",
          [ownerId]
        );
        const [pastRows] = await db.query(
          "SELECT * FROM Reservations WHERE ownerId = ? AND (status != 'p' OR checkInDate < NOW())",
          [ownerId]
        );
        return {
          upcoming: upcomingRows.map(row => ({
            id: row.id,
            siteName: row.siteName,
            checkInDate: row.checkInDate,
            checkOutDate: row.checkOutDate,
            status: true,
          })),
          past: pastRows.map(row => ({
            id: row.id,
            siteName: row.siteName,
            checkInDate: row.checkInDate,
            checkOutDate: row.checkOutDate,
            status: false,
          })),
        };
      },
    },
  };
  
  module.exports = reservationResolver;
  