package com.forohub.api.forohub.domain.curso;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CursoRepository extends JpaRepository<Curso, UUID> {
    Curso findByNombre(String nombre);
}
