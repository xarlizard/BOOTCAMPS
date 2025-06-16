
import java.util.Arrays;
import java.util.Random;

public class Task2 {

    public static void main(String[] args) {

        int[] numbers = new int[20];
        Random random = new Random();

        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = random.nextInt(100) + 1;
        }

        int evenCount = 0;
        int oddCount = 0;

        for (int number : numbers) {
            if (number % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

        int[] evenNumbers = new int[evenCount];
        int[] oddNumbers = new int[oddCount];

        int evenIndex = 0;
        int oddIndex = 0;

        for (int number : numbers) {
            if (number % 2 == 0) {
                evenNumbers[evenIndex++] = number;
            } else {
                oddNumbers[oddIndex++] = number;
            }
        }

        System.out.println("Array original: " + Arrays.toString(numbers));
        System.out.println("Cantidad de números pares: " + evenCount);
        System.out.println("Cantidad de números impares: " + oddCount);
        System.out.println("\nNúmeros pares: " + Arrays.toString(evenNumbers));
        System.out.println("Números impares: " + Arrays.toString(oddNumbers));
    }
}
