
public class main {

    public static void main(String[] args) {

        Computer computer1 = new Computer("HP", "Pavilion", 16, 512, 899.99);
        Computer computer2 = new Computer("Lenovo", "ThinkPad", 32, 1024, 1299.99);
        Computer computer3 = new Computer("Dell", "XPS", 64, 2048, 1999.99);

        System.out.println("1. Mostrando todas las características de los ordenadores:");
        System.out.println("\nOrdenador 1:");
        System.out.println(computer1.toString());
        System.out.println("\nOrdenador 2:");
        System.out.println(computer2.toString());
        System.out.println("\nOrdenador 3:");
        System.out.println(computer3.toString());

        System.out.println("\n2. Mostrando características específicas del Ordenador 2:");
        System.out.println("Marca: " + computer2.getMarca());
        System.out.println("Precio: " + computer2.getPrecio() + "€");

        System.out.println("\n3. Cambiando el precio del Ordenador 1 y mostrando el cambio:");
        System.out.println("Precio anterior: " + computer1.getPrecio() + "€");
        computer1.setPrecio(849.99);
        System.out.println("Precio nuevo: " + computer1.getPrecio() + "€");
    }
}

class Computer {

    private String marca;
    private String modelo;
    private int ram;
    private int disco;
    private double precio;

    public Computer(String marca, String modelo, int ram, int disco, double precio) {
        this.marca = marca;
        this.modelo = modelo;
        this.ram = ram;
        this.disco = disco;
        this.precio = precio;
    }

    public String getMarca() {
        return marca;
    }

    public String getModelo() {
        return modelo;
    }

    public int getRam() {
        return ram;
    }

    public int getDisco() {
        return disco;
    }

    public double getPrecio() {
        return precio;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public void setRam(int ram) {
        this.ram = ram;
    }

    public void setDisco(int disco) {
        this.disco = disco;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    @Override
    public String toString() {
        return "Ordenador:"
                + "\n- Marca: " + marca
                + "\n- Modelo: " + modelo
                + "\n- Memoria RAM: " + ram + "GB"
                + "\n- Disco Duro: " + disco + "GB"
                + "\n- Precio: " + precio + "€";
    }
}
