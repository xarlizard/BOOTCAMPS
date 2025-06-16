
public class Task2 {

    public static void main(String[] args) {
        System.out.println("--- Cuenta Regresiva y Cuadrados ---");
        System.out.println("Contando del 20 al 10 con sus cuadrados:\n");

        for (int i = 20; i >= 10; i--) {
            int square = i * i;
            System.out.printf("Número: %d, Cuadrado: %d%n", i, square);
        }
    }
}
