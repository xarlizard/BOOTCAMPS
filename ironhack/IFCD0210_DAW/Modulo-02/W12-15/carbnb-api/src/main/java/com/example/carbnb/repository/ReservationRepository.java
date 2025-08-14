package com.example.carbnb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carbnb.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser_UserId(Long userId);

    List<Reservation> findByCar_CarId(Long carId);

    List<Reservation> findByCar_Owner_UserId(Long ownerId);
}
