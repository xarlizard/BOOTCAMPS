package com.ironhack.hospital.controller;

import com.ironhack.hospital.model.Employee;
import com.ironhack.hospital.model.Patient;
import com.ironhack.hospital.repository.EmployeeRepository;
import com.ironhack.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HospitalController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PatientRepository patientRepository;

    // 1. Get all doctors
    @GetMapping("/doctors")
    public List<Employee> getAllDoctors() {
        return employeeRepository.findAll();
    }

    // 2. Get doctor by ID
    @GetMapping("/doctors/{id}")
    public ResponseEntity<Employee> getDoctorById(@PathVariable Integer id) {
        return employeeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Get doctors by status
    @GetMapping("/doctors/status/{status}")
    public List<Employee> getDoctorsByStatus(@PathVariable Employee.Status status) {
        return employeeRepository.findByStatus(status);
    }

    // 4. Get doctors by department
    @GetMapping("/doctors/department/{department}")
    public List<Employee> getDoctorsByDepartment(@PathVariable String department) {
        return employeeRepository.findByDepartment(department);
    }

    // 5. Get all patients
    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // 6. Get patient by ID
    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Integer id) {
        return patientRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 7. Get patients by date of birth range
    @GetMapping("/patients/dob")
    public List<Patient> getPatientsByDateOfBirthRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return patientRepository.findByDateOfBirthBetween(start, end);
    }

    // 8. Get patients by admitting doctor's department
    @GetMapping("/patients/doctor-department/{department}")
    public List<Patient> getPatientsByDoctorDepartment(@PathVariable String department) {
        return patientRepository.findByDoctorDepartment(department);
    }

    // 9. Get all patients with a doctor whose status is OFF
    @GetMapping("/patients/doctor-status/off")
    public List<Patient> getPatientsWithOffDoctors() {
        return patientRepository.findByDoctorStatusOff();
    }
}
