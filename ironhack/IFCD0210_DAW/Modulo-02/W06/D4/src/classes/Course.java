package classes;

import java.util.UUID;

public class Course {

    private static int idCounter = 1;

    private final String uuid;      // UUID for internal use
    private final String courseId;  // Readable ID type C001
    private String name;
    private double price;
    private double moneyEarned;
    private Teacher teacher;

    public Course(String name, double price) {
        this.uuid = UUID.randomUUID().toString();                // Internal use
        this.courseId = String.format("C%03d", idCounter++);     // Visible ID
        this.name = name;
        this.price = price;
        this.moneyEarned = 0.0;
        this.teacher = null;
    }

    // Getters
    public String getCourseId() {
        return courseId;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public double getMoneyEarned() {
        return moneyEarned;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    //  Setters
    //  They allow you to modify course attributes such as name, price and assigned teacher.
    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    // Method to add money earned by the course
    // Only accepts positive value
    public void addMoneyEarned(double amount) {
        if (amount > 0) {
            this.moneyEarned += amount;
        }
    }

    @Override
    public String toString() {
        return "Course ID: " + courseId
                + ", Name: " + name
                + ", Price: $" + price
                + ", Money Earned: $" + moneyEarned
                + ", Teacher: " + (teacher != null ? teacher.getName() : "Not Assigned");
    }
}
