
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class Task3 {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {

            List<String> names = new ArrayList<>(List.of(
                    "Juan", "María", "Carlos", "Ana", "Pedro",
                    "Laura", "Miguel", "Sofia", "David", "Elena"
            ));

            Random random = new Random();
            boolean continueDrawing = true;

            while (continueDrawing && !names.isEmpty()) {

                int winnerIndex = random.nextInt(names.size());
                String winner = names.get(winnerIndex);

                System.out.println("\n¡Felicidades! El ganador del viaje a Ibiza es: " + winner);

                names.remove(winnerIndex);

                if (names.isEmpty()) {
                    System.out.println("\nNo quedan más participantes en el sorteo.");
                    break;
                }

                System.out.print("\n¿Otra vez? (S/N): ");
                String response = scanner.nextLine().trim().toUpperCase();
                continueDrawing = response.equals("S");
            }

            if (!names.isEmpty()) {
                System.out.println("\nParticipantes restantes: " + names);
            }
        }
    }
}
