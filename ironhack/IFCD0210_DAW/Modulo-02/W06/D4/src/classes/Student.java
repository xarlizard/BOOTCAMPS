package classes;

import java.util.UUID;

public class Student {

    private static int idCounter = 1;

    private final String uuid;      // UUID for internal use
    private final String studentId; // Readable ID type S001
    private String name;
    private String address;
    private String email;
    private Course course; // Nullable

    // Constructor
    public Student(String name, String address, String email) {
        this.uuid = UUID.randomUUID().toString(); // Automatic generation of studentId
        this.studentId = String.format("S%03d", idCounter++); // Visible ID
        this.name = name;
        this.address = address;
        this.email = email;
        this.course = null; // Initially the student isn't enrolled in any course
    }

    // Getters
    public String getStudentId() {
        return studentId;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public Course getCourse() {
        return course;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    // Method to enroll a student in a course
    public void enroll(Course course) {
        this.course = course;
        // We update the money earned for the course
        if (course != null) {
            course.addMoneyEarned(course.getPrice());
        }
    }

    @Override
    public String toString() {
        return "Student ID: " + studentId
                + ", Name: " + name
                + ", Address: " + address
                + ", Email: " + email
                + ", Course: " + (course != null ? course.getName() : "Not Enrolled");
    }
}