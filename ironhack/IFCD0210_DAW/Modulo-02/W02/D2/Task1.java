
import java.util.Scanner;

public class Task1 {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {

            System.out.print("¿Cuál es el tamaño del array que deseas crear? ");
            int size = scanner.nextInt();

            String[] userArray = new String[size];

            scanner.nextLine();

            System.out.println("\nAhora ingresa " + size + " elementos:");
            for (int i = 0; i < size; i++) {
                System.out.print("Elemento " + (i + 1) + ": ");
                userArray[i] = scanner.nextLine();
            }

            System.out.println("\nLos elementos del array son:");
            for (int i = 0; i < userArray.length; i++) {
                System.out.println((i + 1) + ". " + userArray[i]);
            }
        }
    }
}
