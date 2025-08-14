package com.example.carbnb.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.carbnb.model.Car;
import com.example.carbnb.model.Reservation;
import com.example.carbnb.model.User;
import com.example.carbnb.repository.CarRepository;
import com.example.carbnb.repository.ReservationRepository;
import com.example.carbnb.repository.UserRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepo, CarRepository carRepo, ReservationRepository reservationRepo) {
        return args -> {
            // Users
            User u1 = new User(null, "Alice", "alice@email.com");
            User u2 = new User(null, "Bob", "bob@email.com");
            u1 = userRepo.save(u1);
            u2 = userRepo.save(u2);

            // Cars (with inheritance)
            Car c1 = new Car(null, "Tesla Model S", "Electric", u1);
            Car c2 = new Car(null, "Toyota Corolla", "Sedan", u2);
            c1 = carRepo.save(c1);
            c2 = carRepo.save(c2);

            // Reservations
            reservationRepo.save(new Reservation(null, LocalDate.now(), LocalDate.now().plusDays(3), u2, c1));
        };
    }
}
