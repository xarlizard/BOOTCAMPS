package com.example.carbnb.repository;

import com.example.carbnb.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByType(String type);

    List<Car> findByOwner_Name(String name);

    List<Car> findByOwner_UserId(Long userId);
}
