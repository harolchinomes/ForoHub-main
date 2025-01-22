package com.forohub.api.forohub.domain.curso;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record DatosActualizarCurso(
        @NotNull
        UUID id,
        String nombre,
        String categoria
) {
}
