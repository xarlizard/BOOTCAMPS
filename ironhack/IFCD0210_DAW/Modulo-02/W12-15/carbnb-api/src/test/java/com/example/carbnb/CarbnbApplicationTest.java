package com.example.carbnb;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import org.junit.jupiter.api.Test;

class CarbnbApplicationTest {
    @Test
    void contextLoads() {
        assertDoesNotThrow(() -> CarbnbApplication.main(new String[]{}));
    }
}
