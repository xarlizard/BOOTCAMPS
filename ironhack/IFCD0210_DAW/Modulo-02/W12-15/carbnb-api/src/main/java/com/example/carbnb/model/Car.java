package com.example.carbnb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;
    private String model;
    private String type;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    // Constructors
    public Car() {}
    public Car(Long carId, String model, String type, User owner) {
        this.carId = carId;
        this.model = model;
        this.type = type;
        this.owner = owner;
    }
    // Getters and setters
    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
}
