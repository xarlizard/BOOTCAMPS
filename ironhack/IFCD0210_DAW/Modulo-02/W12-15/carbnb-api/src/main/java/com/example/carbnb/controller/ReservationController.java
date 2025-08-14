package com.example.carbnb.controller;

import com.example.carbnb.model.Reservation;
import com.example.carbnb.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationRepository reservationRepo;

    public ReservationController(ReservationRepository reservationRepo) {
        this.reservationRepo = reservationRepo;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservationById(@PathVariable Long id) {
        return reservationRepo.findById(id);
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationRepo.save(reservation);
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        reservation.setReservationId(id);
        return reservationRepo.save(reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationRepo.deleteById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUser(@PathVariable Long userId) {
        return reservationRepo.findByUser_UserId(userId);
    }

    @GetMapping("/car/{carId}")
    public List<Reservation> getReservationsByCar(@PathVariable Long carId) {
        return reservationRepo.findByCar_CarId(carId);
    }

    @GetMapping("/owner/{ownerId}")
    public List<Reservation> getReservationsByOwner(@PathVariable Long ownerId) {
        return reservationRepo.findByCar_Owner_UserId(ownerId);
    }

    @GetMapping("/renter/{renterId}")
    public List<Reservation> getReservationsByRenter(@PathVariable Long renterId) {
        // Implement logic to get reservations where user is renter
        return reservationRepo.findByUser_UserId(renterId);
    }

    @GetMapping("/rentee/{renteeId}")
    public List<Reservation> getReservationsByRentee(@PathVariable Long renteeId) {
        // Implement logic to get reservations where car owner is rentee
        return reservationRepo.findByCar_Owner_UserId(renteeId);
    }
    // For renter/rentee differentiation, add endpoints and queries as needed

    // GET /reservations/user/{userId} - Reservations made by user
    // GET /reservations/car/{carId} - Reservations for a car
    // GET /reservations/owner/{ownerId} - Reservations received by owner (if
    // supported)
}
