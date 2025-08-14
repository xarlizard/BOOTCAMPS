package com.example.carbnb.controller;

import com.example.carbnb.model.Car;
import com.example.carbnb.repository.CarRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarRepository carRepo;

    @Autowired
    public CarController(CarRepository carRepo) {
        this.carRepo = carRepo;
    }

    // Get all cars
    @GetMapping
    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    // Get car by ID
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepo.findById(id).orElse(null);
    }

    // Create a new car
    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carRepo.save(car);
    }

    // Update an existing car
    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car) {
        car.setCarId(id);
        return carRepo.save(car);
    }

    // Delete a car
    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carRepo.deleteById(id);
    }

    // Get cars by user ID
    @GetMapping("/user/{userId}")
    public List<Car> getCarsByUserId(@PathVariable Long userId) {
        return carRepo.findByOwner_UserId(userId);
    }
}
