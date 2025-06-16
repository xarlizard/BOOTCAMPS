
import java.util.Scanner;

public class Task3 {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("--- Media de Edad de tus Padres ---");

            System.out.print("¿Cómo se llama tu madre? ");
            String motherName = scanner.nextLine();

            System.out.print("¿Qué edad tiene tu madre? ");
            double motherAge = scanner.nextDouble();

            // Clear the newline character
            scanner.nextLine();

            System.out.print("¿Cómo se llama tu padre? ");
            String fatherName = scanner.nextLine();

            System.out.print("¿Qué edad tiene tu padre? ");
            double fatherAge = scanner.nextDouble();

            // Calculate average age
            double averageAge = (motherAge + fatherAge) / 2.0;

            // Print result with one decimal place
            System.out.printf("Tu madre se llama %s y tiene %.0f años, y tu padre se llama %s y tiene %.0f años, y la media de sus edades es %.1f%n",
                    motherName, motherAge, fatherName, fatherAge, averageAge);
        }
    }
}
