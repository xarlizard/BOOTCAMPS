
import java.util.Scanner;

public class Task1 {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("--- Nivel Educativo por Edad ---");
            System.out.print("Por favor, ingresa tu edad: ");

            int age = scanner.nextInt();

            if (age < 6 || age > 120) {
                System.out.println("Error: La edad debe estar entre 6 y 120 años");
                return;
            }

            String level;
            if (age <= 12) {
                level = "primaria";
            } else if (age <= 16) {
                level = "secundaria";
            } else if (age <= 22) {
                level = "universidad";
            } else {
                level = "trabajando";
            }

            System.out.println("Estás en " + level);
        }
    }
}
