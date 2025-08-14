package com.example.carbnb.model;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;

class ReservationTest {
    @Test
    void testInstantiation() {
        assertNotNull(new Reservation());
    }
}
