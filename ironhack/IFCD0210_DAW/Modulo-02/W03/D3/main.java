
import java.util.ArrayList;
import java.util.Scanner;

public class main {

    public static void main(String[] args) {
        // 1. Crear bicicletas individuales
        Bicicleta bici1 = new Bicicleta("Trek", "Mountain 200", 45, true);
        Bicicleta bici2 = new Bicicleta("Specialized", "Road 500", 60, true);

        // Probar métodos
        System.out.println("--- Probando métodos con bicicletas individuales ---");
        System.out.println("\nBicicleta 1:");
        System.out.println(bici1);
        bici1.tocarClaxon();
        bici1.pedalear();
        bici1.girar("derecha");
        bici1.cambiarMarchas(3);
        bici1.parar();

        // 2. Crear ArrayList de bicicletas
        ArrayList<Bicicleta> bicicletas = new ArrayList<>();
        bicicletas.add(bici1);
        bicicletas.add(bici2);
        bicicletas.add(new Bicicleta("Orbea", "City Bike", 30, false));
        bicicletas.add(new Bicicleta("Cannondale", "Sport Elite", 55, true));

        // 3. Mostrar todas las bicicletas con for tradicional
        System.out.println("\n--- Mostrando bicicletas con for tradicional ---");
        for (int i = 0; i < bicicletas.size(); i++) {
            System.out.println("\nBicicleta " + (i + 1) + ":");
            System.out.println(bicicletas.get(i));
        }

        // 4. Mostrar todas las bicicletas con for-each
        System.out.println("\n--- Mostrando bicicletas con for-each ---");
        for (Bicicleta bici : bicicletas) {
            System.out.println("\n" + bici);
        }

        // 5. Mostrar solo marca y velocidad máxima
        System.out.println("\n--- Mostrando solo marca y velocidad máxima ---");
        for (Bicicleta bici : bicicletas) {
            System.out.printf("Marca: %s, Velocidad Máxima: %d km/h%n",
                    bici.getMarca(), bici.getVelocidadMaxima());
        }

        // 6. Modificar una bicicleta con setters
        System.out.println("\n--- Modificando una bicicleta ---");
        System.out.println("Antes de la modificación:");
        System.out.println(bici1);

        bici1.setModelo("Mountain 300");
        bici1.setVelocidadMaxima(50);

        System.out.println("\nDespués de la modificación:");
        System.out.println(bici1);

        // 7. EXTRA: Crear bicicleta desde input de usuario
        crearBicicletaDesdeUsuario(bicicletas);

        // Mostrar la lista actualizada
        System.out.println("\n--- Lista final de bicicletas ---");
        for (Bicicleta bici : bicicletas) {
            System.out.println("\n" + bici);
        }
    }

    private static void crearBicicletaDesdeUsuario(ArrayList<Bicicleta> bicicletas) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("\n--- Crear nueva bicicleta ---");

        System.out.print("Introduce la marca: ");
        String marca = scanner.nextLine();

        System.out.print("Introduce el modelo: ");
        String modelo = scanner.nextLine();

        System.out.print("Introduce la velocidad máxima (km/h): ");
        int velocidadMaxima = scanner.nextInt();

        System.out.print("¿Tiene marchas? (true/false): ");
        boolean tieneMarchas = scanner.nextBoolean();

        Bicicleta nuevaBici = new Bicicleta(marca, modelo, velocidadMaxima, tieneMarchas);
        bicicletas.add(nuevaBici);

        System.out.println("\nBicicleta añadida con éxito:");
        System.out.println(nuevaBici);
    }
}

class Bicicleta {

    private String marca;
    private String modelo;
    private int velocidadMaxima;
    private boolean tieneMarchas;
    private int marchaActual;

    // Constructor
    public Bicicleta(String marca, String modelo, int velocidadMaxima, boolean tieneMarchas) {
        this.marca = marca;
        this.modelo = modelo;
        this.velocidadMaxima = velocidadMaxima;
        this.tieneMarchas = tieneMarchas;
        this.marchaActual = tieneMarchas ? 1 : 0;
    }

    // Métodos de acción
    public void tocarClaxon() {
        System.out.println("¡Ring! ¡Ring!");
    }

    public void pedalear() {
        System.out.println("La bicicleta está en movimiento");
    }

    public void parar() {
        System.out.println("La bicicleta se ha detenido");
    }

    public void girar(String direccion) {
        System.out.println("Girando hacia la " + direccion);
    }

    public void cambiarMarchas(int marcha) {
        if (!tieneMarchas) {
            System.out.println("Esta bicicleta no tiene marchas");
            return;
        }
        if (marcha >= 1 && marcha <= 6) {
            marchaActual = marcha;
            System.out.println("Cambiando a marcha " + marcha);
        } else {
            System.out.println("Marcha inválida");
        }
    }

    // Getters
    public String getMarca() {
        return marca;
    }

    public String getModelo() {
        return modelo;
    }

    public int getVelocidadMaxima() {
        return velocidadMaxima;
    }

    public boolean getTieneMarchas() {
        return tieneMarchas;
    }

    // Setters
    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public void setVelocidadMaxima(int velocidadMaxima) {
        this.velocidadMaxima = velocidadMaxima;
    }

    public void setTieneMarchas(boolean tieneMarchas) {
        this.tieneMarchas = tieneMarchas;
    }

    // toString
    @Override
    public String toString() {
        return "Bicicleta:"
                + "\n- Marca: " + marca
                + "\n- Modelo: " + modelo
                + "\n- Velocidad Máxima: " + velocidadMaxima + " km/h"
                + "\n- Marchas: " + (tieneMarchas ? "Sí incluye cambio de marchas" : "No incluye cambio de marchas")
                + (tieneMarchas ? "\n- Marcha actual: " + marchaActual : "");
    }
}
