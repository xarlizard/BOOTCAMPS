
public class Task2 {

    public static void main(String[] args) {

        Sedan sedan = new Sedan("VIN123", "Toyota", "Camry", 50000);
        UtilityVehicle suv = new UtilityVehicle("VIN456", "Jeep", "Cherokee", 35000, true);
        Truck truck = new Truck("VIN789", "Ford", "F-150", 75000, 10000.0);

        System.out.println("Testing Car Inventory System:\n");
        System.out.println(sedan.getInfo());
        System.out.println(suv.getInfo());
        System.out.println(truck.getInfo());
    }
}

abstract class Car {

    protected String vinNumber;
    protected String make;
    protected String model;
    protected int mileage;

    public Car(String vinNumber, String make, String model, int mileage) {
        this.vinNumber = vinNumber;
        this.make = make;
        this.model = model;
        this.mileage = mileage;
    }

    public abstract String getInfo();
}

class Sedan extends Car {

    public Sedan(String vinNumber, String make, String model, int mileage) {
        super(vinNumber, make, model, mileage);
    }

    @Override
    public String getInfo() {
        return String.format("Sedan - VIN: %s, Make: %s, Model: %s, Mileage: %d",
                vinNumber, make, model, mileage);
    }
}

class UtilityVehicle extends Car {

    private final boolean fourWheelDrive;

    public UtilityVehicle(String vinNumber, String make, String model, int mileage, boolean fourWheelDrive) {
        super(vinNumber, make, model, mileage);
        this.fourWheelDrive = fourWheelDrive;
    }

    @Override
    public String getInfo() {
        return String.format("Utility Vehicle - VIN: %s, Make: %s, Model: %s, Mileage: %d, Four Wheel Drive: %s",
                vinNumber, make, model, mileage, fourWheelDrive ? "Yes" : "No");
    }
}

class Truck extends Car {

    private final double towingCapacity;

    public Truck(String vinNumber, String make, String model, int mileage, double towingCapacity) {
        super(vinNumber, make, model, mileage);
        this.towingCapacity = towingCapacity;
    }

    @Override
    public String getInfo() {
        return String.format("Truck - VIN: %s, Make: %s, Model: %s, Mileage: %d, Towing Capacity: %.1f lbs",
                vinNumber, make, model, mileage, towingCapacity);
    }
}
