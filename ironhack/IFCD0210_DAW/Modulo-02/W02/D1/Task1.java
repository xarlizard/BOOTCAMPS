
import java.util.Scanner;

public class Task1 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("--- Nivel Educativo por Edad ---");
        System.out.print("Por favor, ingresa tu edad: ");
        int age = scanner.nextInt();

        if (age < 6 || age > 120) {
            System.out.println("Error: La edad debe estar entre 6 y 120 años");
        } else if (age <= 12) {
            System.out.println("Estás en primaria");
        } else if (age <= 16) {
            System.out.println("Estás en secundaria");
        } else if (age <= 22) {
            System.out.println("Estás en universidad");
        } else {
            System.out.println("Estás trabajando");
        }

        scanner.close();
    }
}
