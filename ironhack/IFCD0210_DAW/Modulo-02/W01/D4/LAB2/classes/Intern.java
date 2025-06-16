package classes;

public class Intern extends Employee {

    private static final double SALARY_LIMIT = 20000;

    public Intern(String name, String email, int age, double salary) {
        super(name, email, age, validateInternSalary(salary));
    }

    @Override
    public void setSalary(double salary) {
        validateInternSalary(salary);
        super.setSalary(salary);
    }

    private static double validateInternSalary(double salary) {
        if (salary > SALARY_LIMIT) {
            throw new IllegalArgumentException(
                    "Intern salary cannot exceed $" + SALARY_LIMIT
            );
        }
        return salary;
    }
}
