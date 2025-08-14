package com.ironhack.hospital.repository;

import com.ironhack.hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    List<Patient> findByDateOfBirthBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT p FROM Patient p WHERE p.admittedBy.department = :department")
    List<Patient> findByDoctorDepartment(String department);
    
    @Query("SELECT p FROM Patient p WHERE p.admittedBy.status = 'OFF'")
    List<Patient> findByDoctorStatusOff();
}
