package com.ironhack.hospital.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironhack.hospital.model.Employee;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
class HospitalControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void getAllDoctors_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/doctors"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getDoctorById_ValidId_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/doctors/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getDoctorById_InvalidId_ReturnsNotFound() throws Exception {
        mockMvc.perform(get("/api/doctors/-1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getDoctorsByStatus_ValidStatus_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/doctors/status/ON"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getDoctorsByDepartment_ValidDepartment_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/doctors/department/Cardiology"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getAllPatients_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/patients"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getPatientById_ValidId_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/patients/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getPatientById_InvalidId_ReturnsNotFound() throws Exception {
        mockMvc.perform(get("/api/patients/-1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getPatientsByDateOfBirthRange_ValidDates_ReturnsOk() throws Exception {
        String startDate = "2000-01-01";
        String endDate = "2023-12-31";
        
        mockMvc.perform(get("/api/patients/dob")
                .param("start", startDate)
                .param("end", endDate))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getPatientsByDoctorDepartment_ValidDepartment_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/patients/doctor-department/Cardiology"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void getPatientsWithOffDoctors_ReturnsOk() throws Exception {
        mockMvc.perform(get("/api/patients/doctor-status/off"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}
