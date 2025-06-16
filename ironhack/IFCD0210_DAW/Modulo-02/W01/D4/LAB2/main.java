
import classes.Employee;
import classes.Intern;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class main {

    public static void main(String[] args) {
        try {
            Employee[] employees = new Employee[10];

            employees[0] = new Employee("John Doe", "john@company.com", 30, 50000);
            employees[1] = new Employee("Jane Smith", "jane@company.com", 28, 55000);
            employees[2] = new Employee("Mike Johnson", "mike@company.com", 35, 60000);
            employees[3] = new Employee("Sarah Williams", "sarah@company.com", 32, 52000);
            employees[4] = new Employee("Tom Brown", "tom@company.com", 40, 65000);
            employees[5] = new Employee("Lisa Davis", "lisa@company.com", 27, 48000);
            employees[6] = new Employee("Robert Wilson", "robert@company.com", 38, 58000);
            employees[7] = new Employee("Emily Taylor", "emily@company.com", 29, 51000);

            try {
                employees[8] = new Intern("Alex Martinez", "alex@company.com", 22, 19000);
                employees[9] = new Intern("Emma White", "emma@company.com", 21, 18500);
            } catch (IllegalArgumentException e) {
                System.out.println("Error creating intern: " + e.getMessage());
            }

            writeEmployeesToFile(employees, "employees.txt");

            try {
                ((Intern) employees[8]).setSalary(25000);
            } catch (IllegalArgumentException e) {
                System.out.println("Error updating intern salary: " + e.getMessage());
            }

        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }

    private static void writeEmployeesToFile(Employee[] employees, String filename) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
            for (Employee emp : employees) {
                if (emp != null) {
                    writer.println("Employee Information:");
                    writer.println("Name: " + emp.getName());
                    writer.println("Email: " + emp.getEmail());
                    writer.println("Age: " + emp.getAge());
                    writer.println("Salary: $" + emp.getSalary());
                    writer.println("Type: " + (emp instanceof Intern ? "Intern" : "Employee"));
                    writer.println("------------------------");
                }
            }
            System.out.println("Employee information has been written to " + filename);
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }
}
