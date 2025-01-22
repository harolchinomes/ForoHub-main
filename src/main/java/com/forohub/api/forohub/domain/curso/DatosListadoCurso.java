package com.forohub.api.forohub.domain.curso;

import java.util.UUID;

public record DatosListadoCurso(
        UUID id,
        String nombre,
        String categoria
) {
    public DatosListadoCurso(Curso curso) {
        this(curso.getId(),curso.getNombre(), curso.getCategoria());
    }
}
