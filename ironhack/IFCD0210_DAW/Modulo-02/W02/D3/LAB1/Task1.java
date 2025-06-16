
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Task1 {

    public static double roundToHundredth(BigDecimal number) {
        return number.setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    public static BigDecimal reverseSignAndRound(BigDecimal number) {
        return number.negate().setScale(1, RoundingMode.HALF_UP);
    }

    public static void main(String[] args) {

        BigDecimal test1 = new BigDecimal("4.2545");
        System.out.println("Original: " + test1);
        System.out.println("Rounded to hundredth: " + roundToHundredth(test1));

        BigDecimal test2 = new BigDecimal("1.2345");
        BigDecimal test3 = new BigDecimal("-45.67");

        System.out.println("\nOriginal: " + test2);
        System.out.println("Reversed sign and rounded: " + reverseSignAndRound(test2));

        System.out.println("\nOriginal: " + test3);
        System.out.println("Reversed sign and rounded: " + reverseSignAndRound(test3));
    }
}
