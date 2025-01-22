package com.forohub.api.forohub.domain.topico;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record DatosActualizarTopico(
        @NotNull
        UUID id,
        String titulo,
        String mensaje,
        UUID cursoId
) {
}
