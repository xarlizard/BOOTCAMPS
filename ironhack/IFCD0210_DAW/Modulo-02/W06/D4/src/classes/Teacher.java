package classes;

import java.util.UUID;

public class Teacher {
    private static int idCounter = 1;

    private final String uuid;
    private final String teacherId; // Readable ID type T001
    private String name;
    private double salary;

    // Constructor
    public Teacher(String name, double salary) {
        this.uuid = UUID.randomUUID().toString(); // Automatic generation of teacherId
        this.teacherId = String.format("T%03d", idCounter++); // Visible ID
        this.name = name;
        this.salary = salary;
    }

    // Getters
    public String getTeacherId() {
        return teacherId;
    }

    public String getName() {
        return name;
    }

    public double getSalary() {
        return salary;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    // toString
    @Override
    public String toString() {
        return "Teacher ID: " + teacherId + ", Name: " + name + ", Salary: $" + salary;
    }
}