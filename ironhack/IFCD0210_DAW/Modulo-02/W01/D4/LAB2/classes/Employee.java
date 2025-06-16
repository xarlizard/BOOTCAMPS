package classes;

public class Employee {

    private String name;
    private String email;
    private int age;
    private double salary;

    public Employee(String name, String email, int age, double salary) {
        this.name = name;
        this.email = email;
        setAge(age);
        setSalary(salary);
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public int getAge() {
        return age;
    }

    public double getSalary() {
        return salary;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = name;
    }

    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.email = email;
    }

    public void setAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Employee must be at least 18 years old");
        }
        this.age = age;
    }

    public void setSalary(double salary) {
        if (salary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        this.salary = salary;
    }
}
