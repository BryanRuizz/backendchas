const { gql } = require('apollo-server');

const reservationSchema = gql`
  type Reservation {
    id: Int
    siteName: String
    checkInDate: String
    checkOutDate: String
    status: Boolean
  }

  type Query {
    upcomingReservations(ownerId: Int!): [Reservation]
    nearestUpcomingReservation(ownerId: Int!): Reservation
    reservationHistory(ownerId: Int!): ReservationHistory
  }

  type ReservationHistory {
    upcoming: [Reservation]
    past: [Reservation]
  }
`;

module.exports = reservationSchema;
